/// <reference types="@figma/plugin-typings" />
import { ThemeManager } from './services/themeManager';
import { Track, Theme, PluginMessage } from './types';

// 플러그인 초기화
figma.showUI(__html__, {
  width: 320,
  height: 420,
  themeColors: true
});

// 테마 매니저 인스턴스 가져오기
const themeManager = ThemeManager.getInstance();

// 플러그인 메시지 처리
figma.ui.onmessage = (msg: PluginMessage) => {
  switch (msg.type) {
    case 'insert-player':
      handleInsertPlayer(msg.track, msg.theme);
      break;
    case 'change-theme':
      // 테마 변경 처리
      themeManager.setCurrentTheme(msg.theme);
      updateExistingPlayers(msg.theme);
      break;
    case 'close':
      figma.closePlugin();
      break;
  }
};

// 플레이어 프레임 생성
function handleInsertPlayer(track: Track, theme: Theme): void {
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
  titleText.fontName = { family: "Inter", style: "Medium" };
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
  artistText.fontName = { family: "Inter", style: "Regular" };
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
      
      // 내부 요소도 업데이트 (디스플레이, 버튼 등)
      const display = frame.findOne(node => node.name === 'Display' && node.type === 'FRAME');
      if (display && display.type === 'FRAME') {
        display.fills = [{
          type: 'SOLID',
          color: themeManager.hexToRGB(theme.styles.displayColor)
        }];
        
        // 텍스트 요소 업데이트
        const texts = display.findAll(node => node.type === 'TEXT');
        texts.forEach(text => {
          if (text.type === 'TEXT') {
            text.fills = [{
              type: 'SOLID',
              color: themeManager.hexToRGB(theme.styles.displayTextColor)
            }];
          }
        });
      }
      
      // 재생 버튼 업데이트
      const playButton = frame.findOne(node => node.name === 'Play Button' && node.type === 'FRAME');
      if (playButton && playButton.type === 'FRAME') {
        playButton.fills = [{
          type: 'SOLID',
          color: themeManager.hexToRGB(theme.styles.buttonColor)
        }];
      }
    }
  });
} 