// code.js
figma.showUI(__html__, { width: 320, height: 460, themeColors: true });

// 사용 가능한 폰트 확인 및 로드
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
      console.log(`Using bold font: ${fontOption.family} ${fontOption.style}`);
      break;
    } catch (e) {
      console.log(`Font not available: ${fontOption.family} ${fontOption.style}`);
    }
  }
  
  // 사용 가능한 첫 번째 일반 폰트 찾기
  for (const fontOption of regularFontOptions) {
    try {
      await figma.loadFontAsync(fontOption);
      usableRegularFont = fontOption;
      console.log(`Using regular font: ${fontOption.family} ${fontOption.style}`);
      break;
    } catch (e) {
      console.log(`Font not available: ${fontOption.family} ${fontOption.style}`);
    }
  }
  
  return {
    bold: usableBoldFont || { family: "Arial", style: "Bold" },
    regular: usableRegularFont || { family: "Arial", style: "Regular" }
  };
}

// UI에서 메시지 수신 처리
figma.ui.onmessage = async (msg) => {
  if (msg.type === "create-player-design") {
    try {
      // 사용 가능한 폰트 로드
      const fonts = await loadAvailableFonts();
      
      // 현재 선택된 곡 정보를 받아와서 피그마에 노드 생성
      const { track, isPlaying } = msg;

      // 프레임 생성 (메인 디바이스)
      const frame = figma.createFrame();
      frame.name = `SoundCloud TE Player - ${track.title}`;
      frame.resize(240, 160);

      // 틴에이지 엔지니어링 스타일 적용
      frame.fills = [{ type: "SOLID", color: { r: 1, g: 0.8, b: 0 } }]; // 노란색 배경
      frame.cornerRadius = 4;
      frame.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      frame.strokeWeight = 2;

      // 상단 로고 텍스트
      const logoText = figma.createText();
      logoText.fontName = fonts.bold;
      logoText.characters = "SC-PLAYER";
      logoText.fontSize = 10;
      logoText.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      logoText.letterSpacing = { value: 0.5, unit: "PIXELS" };
      frame.appendChild(logoText);
      logoText.x = 16;
      logoText.y = 16;

      // 모델 텍스트
      const modelText = figma.createText();
      modelText.fontName = fonts.regular;
      modelText.characters = "OP-1";
      modelText.fontSize = 10;
      modelText.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      frame.appendChild(modelText);
      modelText.x = 200;
      modelText.y = 16;

      // 디스플레이 프레임
      const display = figma.createFrame();
      display.name = "LCD Display";
      display.resize(208, 70);
      display.x = 16;
      display.y = 36;
      display.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }]; // 검은색 LCD
      display.strokeAlign = "INSIDE";
      display.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      display.strokeWeight = 1;
      frame.appendChild(display);

      // NOW PLAYING 텍스트
      const nowPlaying = figma.createText();
      nowPlaying.fontName = fonts.bold;
      nowPlaying.characters = "NOW PLAYING";
      nowPlaying.fontSize = 9;
      nowPlaying.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      nowPlaying.textCase = "UPPER";
      display.appendChild(nowPlaying);
      nowPlaying.x = 10;
      nowPlaying.y = 10;

      // 재생 상태 표시등
      const statusDot = figma.createEllipse();
      statusDot.name = "Status LED";
      statusDot.resize(6, 6);
      statusDot.x = 190;
      statusDot.y = 12;
      
      // 재생 상태에 따라 LED 색상 변경
      if (isPlaying) {
        statusDot.fills = [{ type: "SOLID", color: { r: 0, g: 1, b: 0.52 } }]; // 밝은 녹색 (재생 중)
      } else {
        statusDot.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]; // 빨간색 (정지 상태)
      }
      
      display.appendChild(statusDot);

      // 트랙 제목
      const trackTitle = figma.createText();
      trackTitle.fontName = fonts.bold;
      trackTitle.characters = track.title.toUpperCase();
      trackTitle.fontSize = 14;
      trackTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      display.appendChild(trackTitle);
      trackTitle.x = 10;
      trackTitle.y = 30;

      // 아티스트 이름
      const artist = figma.createText();
      artist.fontName = fonts.regular;
      artist.characters = track.artist.toUpperCase();
      artist.fontSize = 10;
      artist.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      display.appendChild(artist);
      artist.x = 10;
      artist.y = 50;

      // 재생/일시정지 버튼을 포함하는 컨트롤 프레임
      const controlFrame = figma.createFrame();
      controlFrame.name = "Control Frame";
      controlFrame.resize(80, 40);
      controlFrame.x = 80;
      controlFrame.y = 116;
      controlFrame.fills = []; // 투명 배경
      frame.appendChild(controlFrame);

      // 재생/일시정지 버튼
      const playPauseButton = figma.createFrame();
      playPauseButton.name = isPlaying ? "Pause Button" : "Play Button";
      playPauseButton.resize(40, 40);
      playPauseButton.x = 20;
      playPauseButton.y = 0;
      playPauseButton.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]; // 검은색 버튼
      playPauseButton.cornerRadius = 20; // 원형 버튼
      controlFrame.appendChild(playPauseButton);

      // 재생/일시정지 아이콘 (현대적인 스타일)
      if (isPlaying) {
        // 일시정지 아이콘 (두 개의 세로 막대)
        const pauseIcon1 = figma.createRectangle();
        pauseIcon1.resize(4, 14);
        pauseIcon1.x = 14;
        pauseIcon1.y = 13;
        pauseIcon1.cornerRadius = 1;
        pauseIcon1.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
        playPauseButton.appendChild(pauseIcon1);

        const pauseIcon2 = figma.createRectangle();
        pauseIcon2.resize(4, 14);
        pauseIcon2.x = 22;
        pauseIcon2.y = 13;
        pauseIcon2.cornerRadius = 1;
        pauseIcon2.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
        playPauseButton.appendChild(pauseIcon2);
      } else {
        // 현대적인 재생 아이콘 (삼각형)
        const playIcon = figma.createPolygon();
        playIcon.pointCount = 3;
        
        // 약간 조정된 크기와 위치로 현대적인 느낌 부여
        playIcon.resize(12, 14);
        playIcon.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
        playPauseButton.appendChild(playIcon);
        playIcon.x = 16;
        playIcon.y = 13;
      }

      // 버전 텍스트
      const version = figma.createText();
      version.fontName = fonts.regular;
      version.characters = "[v1.1]";
      version.fontSize = 8;
      version.fills = [{ type: "SOLID", color: { r: 0.47, g: 0.47, b: 0.47 } }]; // 회색(#777777)
      frame.appendChild(version);
      version.x = 190;
      version.y = 140;

      // SoundCloud URL 저장 (나중에 참조용)
      frame.setPluginData("soundcloudURL", track.url);
      frame.setPluginData("isPlaying", isPlaying ? "true" : "false");

      // 사용자의 현재 뷰포트 중앙에 배치
      const center = figma.viewport.center;
      frame.x = center.x - frame.width / 2;
      frame.y = center.y - frame.height / 2;

      // 생성된 프레임 선택
      figma.currentPage.selection = [frame];
      figma.viewport.scrollAndZoomIntoView([frame]);

      // 작업 완료 알림
      figma.notify(`${track.title} 플레이어가 생성되었습니다`);
    } catch (error) {
      // 오류 발생 시 사용자에게 알림
      console.error("Error creating player design:", error);
      figma.notify(`오류가 발생했습니다: ${error.message}`, { error: true });
    }
  } else if (msg.type === "close") {
    figma.closePlugin();
  }
};