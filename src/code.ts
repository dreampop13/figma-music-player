/// <reference types="@figma/plugin-typings" />
import { ThemeManager } from './services/themeManager';
import { Track, Theme, PluginMessage } from './types';

// 플러그인 초기화
figma.showUI(__html__, {
  width: 320,
  height: 460,
  themeColors: true
});

// 테마 매니저 인스턴스
const themeManager = ThemeManager.getInstance();

// 사용 가능한 폰트 로드
async function loadAvailableFonts() {
  // 기본 폰트 목록 (우선순위 순)
  const boldFontOptions = [
    { family: "Inter", style: "Bold" },
    { family: "Roboto", style: "Bold" },
    { family: "SF Pro", style: "Bold" },
    { family: "Arial", style: "Bold" }
  ];
  
  const regularFontOptions = [
    { family: "Inter", style: "Regular" },
    { family: "Roboto", style: "Regular" },
    { family: "SF Pro", style: "Regular" },
    { family: "Arial", style: "Regular" }
  ];
  
  // 사용할 볼드 폰트와 일반 폰트
  let usableBoldFont = null;
  let usableRegularFont = null;
  
  // 사용 가능한 첫 번째 볼드 폰트 찾기
  for (const fontOption of boldFontOptions) {
    try {
      await figma.loadFontAsync(fontOption);
      usableBoldFont = fontOption;
      console.log(`사용할 볼드 폰트: ${fontOption.family} ${fontOption.style}`);
      break;
    } catch (e) {
      console.log(`폰트 사용 불가: ${fontOption.family} ${fontOption.style}`);
    }
  }
  
  // 사용 가능한 첫 번째 일반 폰트 찾기
  for (const fontOption of regularFontOptions) {
    try {
      await figma.loadFontAsync(fontOption);
      usableRegularFont = fontOption;
      console.log(`사용할 일반 폰트: ${fontOption.family} ${fontOption.style}`);
      break;
    } catch (e) {
      console.log(`폰트 사용 불가: ${fontOption.family} ${fontOption.style}`);
    }
  }
  
  return {
    bold: usableBoldFont || { family: "Arial", style: "Bold" },
    regular: usableRegularFont || { family: "Arial", style: "Regular" }
  };
}

// 플러그인 메시지 처리
figma.ui.onmessage = async (msg: PluginMessage) => {
  console.log('메시지 수신:', msg.type);
  
  switch (msg.type) {
    case 'insert-player':
      try {
        // 트랙 삽입 처리
        await handleInsertPlayer(msg.track, msg.theme);
      } catch (error) {
        console.error('플레이어 삽입 오류:', error);
        figma.notify(`오류가 발생했습니다: ${error.message}`, { error: true });
      }
      break;
      
    case 'change-theme':
      try {
        // 테마 변경 처리
        themeManager.setCurrentTheme(msg.theme);
        updateExistingPlayers(msg.theme);
        figma.notify(`테마가 변경되었습니다: ${msg.theme.name}`);
      } catch (error) {
        console.error('테마 변경 오류:', error);
        figma.notify(`테마 변경 중 오류가 발생했습니다`, { error: true });
      }
      break;
      
    case 'close':
      figma.closePlugin();
      break;
  }
};

// 플레이어 프레임 생성
async function handleInsertPlayer(track: Track, theme: Theme): Promise<void> {
  // 사용 가능한 폰트 로드
  const fonts = await loadAvailableFonts();
  
  // 메인 프레임 생성
  const frame = figma.createFrame();
  frame.name = `SC MICRO - ${track.title}`;
  frame.resize(160, 40); // 울트라 마이크로 사이즈로 조정
  
  // 테마 스타일 적용
  themeManager.applyThemeToFigmaNode(frame, theme);
  
  // 트랙 정보 저장
  frame.setPluginData('trackUrl', track.url);
  frame.setPluginData('trackTitle', track.title);
  frame.setPluginData('trackArtist', track.artist);
  
  // ==== 콘텐츠 레이아웃 ====
  const content = figma.createFrame();
  content.name = "Content";
  content.resize(150, 30);
  content.x = 5;
  content.y = 5;
  
  // 콘텐츠 스타일
  content.fills = [{
    type: 'SOLID',
    color: themeManager.hexToRGB(theme.styles.displayColor)
  }];
  content.cornerRadius = 4;
  
  frame.appendChild(content);
  
  // ==== 앨범 아트 ====
  const albumArt = figma.createFrame();
  albumArt.name = "Album Art";
  albumArt.resize(20, 20);
  albumArt.x = 5;
  albumArt.y = 5;
  albumArt.fills = [{
    type: 'SOLID',
    color: themeManager.hexToRGB(theme.styles.accentColor)
  }];
  albumArt.cornerRadius = 2;
  content.appendChild(albumArt);
  
  // ==== 트랙 제목 ====
  const titleText = figma.createText();
  titleText.fontName = fonts.bold;
  titleText.characters = track.title;
  titleText.fontSize = 9;
  titleText.fills = [{
    type: 'SOLID',
    color: themeManager.hexToRGB(theme.styles.displayTextColor)
  }];
  content.appendChild(titleText);
  titleText.x = 30;
  titleText.y = 5;
  
  // ==== 아티스트 이름 ====
  const artistText = figma.createText();
  artistText.fontName = fonts.regular;
  artistText.characters = track.artist;
  artistText.fontSize = 7;
  artistText.fills = [{
    type: 'SOLID',
    color: themeManager.hexToRGB(theme.styles.displayTextColor),
    opacity: 0.8
  }];
  content.appendChild(artistText);
  artistText.x = 30;
  artistText.y = 18;
  
  // ==== 상태 표시 점 ====
  const statusDot = figma.createEllipse();
  statusDot.name = "Status";
  statusDot.resize(4, 4);
  statusDot.x = 140;
  statusDot.y = 13;
  statusDot.fills = [{
    type: 'SOLID',
    color: { r: 0, g: 1, b: 0.5 } // 초록색 재생 표시등
  }];
  content.appendChild(statusDot);
  
  // 최종 위치 조정
  const center = figma.viewport.center;
  frame.x = center.x - frame.width / 2;
  frame.y = center.y - frame.height / 2;
  
  // 선택 및 뷰포트 조정
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);
  
  // 완료 알림
  figma.notify(`${track.title} 마이크로 플레이어가 삽입되었습니다`);
}

// 기존 플레이어 업데이트
function updateExistingPlayers(theme: Theme): void {
  // 현재 페이지의 모든 프레임 검색
  const frames = figma.currentPage.findAll(node => 
    node.type === 'FRAME' && 
    node.getPluginData('trackUrl') !== ''
  );
  
  // 각 프레임에 테마 적용
  frames.forEach(frame => {
    if (frame.type === 'FRAME') {
      themeManager.applyThemeToFigmaNode(frame, theme);
      
      // 내부 콘텐츠 프레임 찾기
      const content = frame.findOne(node => node.name === 'Content' && node.type === 'FRAME');
      if (content && content.type === 'FRAME') {
        content.fills = [{
          type: 'SOLID',
          color: themeManager.hexToRGB(theme.styles.displayColor)
        }];
        
        // 텍스트 요소 업데이트
        const texts = content.findAll(node => node.type === 'TEXT');
        texts.forEach(text => {
          if (text.type === 'TEXT') {
            text.fills = [{
              type: 'SOLID',
              color: themeManager.hexToRGB(theme.styles.displayTextColor)
            }];
          }
        });
        
        // 앨범 아트 업데이트
        const albumArt = content.findOne(node => node.name === 'Album Art' && node.type === 'FRAME');
        if (albumArt && albumArt.type === 'FRAME') {
          albumArt.fills = [{
            type: 'SOLID',
            color: themeManager.hexToRGB(theme.styles.accentColor)
          }];
        }
      }
    }
  });
} 