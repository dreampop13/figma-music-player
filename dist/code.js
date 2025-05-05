/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services/themeManager.ts":
/*!**************************************!*\
  !*** ./src/services/themeManager.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeManager: () => (/* binding */ ThemeManager)
/* harmony export */ });
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../themes */ "./src/themes/index.ts");

class ThemeManager {
    constructor() {
        console.log('ThemeManager 초기화 시작');
        try {
            // 테마 데이터 확인
            if (!_themes__WEBPACK_IMPORTED_MODULE_0__.themes || _themes__WEBPACK_IMPORTED_MODULE_0__.themes.length === 0) {
                console.error('테마 데이터가 비어 있습니다');
                throw new Error('테마 데이터가 비어 있습니다');
            }
            // 기본 테마는 TE OP-1
            const defaultTheme = _themes__WEBPACK_IMPORTED_MODULE_0__.themes.find(t => t.id === 'te-op1');
            if (defaultTheme) {
                this.currentTheme = defaultTheme;
                console.log(`기본 테마 설정됨: ${defaultTheme.name}`);
            }
            else {
                this.currentTheme = _themes__WEBPACK_IMPORTED_MODULE_0__.themes[0];
                console.log(`기본 테마를 찾을 수 없어 첫 번째 테마로 설정: ${_themes__WEBPACK_IMPORTED_MODULE_0__.themes[0].name}`);
            }
        }
        catch (error) {
            console.error('ThemeManager 초기화 중 오류:', error);
            // 비상용 기본 테마 생성
            this.currentTheme = {
                id: "default",
                name: "Default Theme",
                styles: {
                    backgroundColor: "#FFFFFF",
                    textColor: "#000000",
                    buttonColor: "#0099FF",
                    displayColor: "#F5F5F5",
                    displayTextColor: "#000000",
                    accentColor: "#0099FF",
                    borderRadius: "4px"
                }
            };
        }
    }
    static getInstance() {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }
    getCurrentTheme() {
        return this.currentTheme;
    }
    setCurrentTheme(theme) {
        if (!theme) {
            console.error('유효하지 않은 테마가 설정되었습니다');
            return;
        }
        console.log(`테마 변경: ${theme.name} (${theme.id})`);
        this.currentTheme = theme;
    }
    getThemeById(id) {
        if (!id) {
            console.error('유효하지 않은 테마 ID입니다');
            return undefined;
        }
        try {
            const theme = _themes__WEBPACK_IMPORTED_MODULE_0__.themes.find(theme => theme.id === id);
            if (!theme) {
                console.warn(`테마를 찾을 수 없음: ${id}`);
            }
            return theme;
        }
        catch (error) {
            console.error(`테마 검색 중 오류 (ID: ${id}):`, error);
            return undefined;
        }
    }
    getAllThemes() {
        // 테마 배열의 복사본 반환
        return [..._themes__WEBPACK_IMPORTED_MODULE_0__.themes];
    }
    // CSS 스타일 변수 생성
    generateCSSVariables(theme) {
        try {
            if (!theme || !theme.styles) {
                console.error('유효하지 않은 테마 데이터');
                throw new Error('유효하지 않은 테마 데이터');
            }
            const { styles } = theme;
            console.log('CSS 변수 생성:', theme.id);
            return `
        :root {
          --theme-background: ${styles.backgroundColor};
          --theme-text: ${styles.textColor};
          --theme-button: ${styles.buttonColor};
          --theme-display: ${styles.displayColor};
          --theme-display-text: ${styles.displayTextColor};
          --theme-accent: ${styles.accentColor};
          --theme-radius: ${styles.borderRadius};
        }
      `;
        }
        catch (error) {
            console.error('CSS 변수 생성 중 오류:', error);
            // 오류 발생 시 기본 CSS 변수 반환
            return `
        :root {
          --theme-background: #FFFFFF;
          --theme-text: #000000;
          --theme-button: #0099FF;
          --theme-display: #F5F5F5;
          --theme-display-text: #000000;
          --theme-accent: #0099FF;
          --theme-radius: 4px;
        }
      `;
        }
    }
    // Figma 노드에 테마 스타일 적용
    applyThemeToFigmaNode(node, theme) {
        try {
            if (!node) {
                console.error('유효하지 않은 Figma 노드');
                return;
            }
            if (!theme || !theme.styles) {
                console.error('유효하지 않은 테마 데이터');
                return;
            }
            const { styles } = theme;
            // 배경색 적용
            node.fills = [{
                    type: 'SOLID',
                    color: this.hexToRGB(styles.backgroundColor)
                }];
            // 테두리 적용
            node.strokes = [{
                    type: 'SOLID',
                    color: this.hexToRGB(styles.textColor)
                }];
            // 라운드 코너 적용
            node.cornerRadius = parseInt(styles.borderRadius) || 4;
            // 테마 정보 저장
            node.setPluginData('themeId', theme.id);
            console.log(`테마 ${theme.id}가 Figma 노드에 적용됨`);
        }
        catch (error) {
            console.error('Figma 노드에 테마 적용 중 오류:', error);
        }
    }
    // 헬퍼 함수: HEX 색상을 RGB 객체로 변환
    hexToRGB(hex) {
        try {
            if (!hex || typeof hex !== 'string') {
                throw new Error('유효하지 않은 HEX 색상 값');
            }
            // # 기호 제거
            hex = hex.replace('#', '');
            if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
                throw new Error('유효하지 않은 HEX 형식');
            }
            // RGB 값 추출
            const r = parseInt(hex.substring(0, 2), 16) / 255;
            const g = parseInt(hex.substring(2, 4), 16) / 255;
            const b = parseInt(hex.substring(4, 6), 16) / 255;
            return { r, g, b };
        }
        catch (error) {
            console.error('HEX to RGB 변환 중 오류:', error);
            // 오류 시 검은색 반환
            return { r: 0, g: 0, b: 0 };
        }
    }
}


/***/ }),

/***/ "./src/themes/index.ts":
/*!*****************************!*\
  !*** ./src/themes/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   themes: () => (/* binding */ themes)
/* harmony export */ });
const themes = [
    {
        id: "framer-minimal",
        name: "Framer Minimal",
        styles: {
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
            buttonColor: "#0099FF",
            displayColor: "#F5F5F5",
            displayTextColor: "#000000",
            accentColor: "#0099FF",
            borderRadius: "12px"
        }
    },
    {
        id: "framer-dark",
        name: "Framer Dark",
        styles: {
            backgroundColor: "#1E1E1E",
            textColor: "#FFFFFF",
            buttonColor: "#0099FF",
            displayColor: "#2D2D2D",
            displayTextColor: "#FFFFFF",
            accentColor: "#0099FF",
            borderRadius: "12px"
        }
    },
    {
        id: "te-op1",
        name: "TE OP-1",
        styles: {
            backgroundColor: "#FFCC00",
            textColor: "#000000",
            buttonColor: "#000000",
            displayColor: "#111111",
            displayTextColor: "#FFFFFF",
            accentColor: "#FF0000",
            borderRadius: "4px"
        }
    },
    {
        id: "te-op1-dark",
        name: "TE OP-1 Dark",
        styles: {
            backgroundColor: "#222222",
            textColor: "#FFFFFF",
            buttonColor: "#FFCC00",
            displayColor: "#000000",
            displayTextColor: "#FFCC00",
            accentColor: "#FFCC00",
            borderRadius: "4px"
        }
    },
    {
        id: "neo-mint",
        name: "Neo Mint",
        styles: {
            backgroundColor: "#BDEED0",
            textColor: "#2A3B47",
            buttonColor: "#0CC0DF",
            displayColor: "#FFFFFF",
            displayTextColor: "#2A3B47",
            accentColor: "#FF6B95",
            borderRadius: "16px"
        }
    },
    {
        id: "vapor-wave",
        name: "Vapor Wave",
        styles: {
            backgroundColor: "#131377",
            textColor: "#FFFFFF",
            buttonColor: "#FF00FF",
            displayColor: "#000000",
            displayTextColor: "#00FFFF",
            accentColor: "#FF00FF",
            borderRadius: "0px" // Sharp corners
        }
    },
    {
        id: "ipod-classic",
        name: "iPod Classic",
        styles: {
            backgroundColor: "#ECECEC",
            textColor: "#000000",
            buttonColor: "#6A6A6A",
            displayColor: "#D6DCE4",
            displayTextColor: "#000000",
            accentColor: "#007AFF",
            borderRadius: "8px"
        }
    },
    {
        id: "minimal-player",
        name: "미니멀 플레이어 (앨범아트 없음)",
        styles: {
            backgroundColor: "#F8F8F8",
            textColor: "#333333",
            buttonColor: "#555555",
            displayColor: "#FFFFFF",
            displayTextColor: "#333333",
            accentColor: "#555555",
            borderRadius: "4px" // 최소한의 둥근 모서리
        }
    }
];


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_themeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/themeManager */ "./src/services/themeManager.ts");
/// <reference types="@figma/plugin-typings" />

// 플러그인 초기화
figma.showUI(__html__, {
    width: 320,
    height: 420,
    themeColors: true
});
// 테마 매니저 인스턴스 가져오기
const themeManager = _services_themeManager__WEBPACK_IMPORTED_MODULE_0__.ThemeManager.getInstance();
// 플러그인 메시지 처리
figma.ui.onmessage = (msg) => {
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
function handleInsertPlayer(track, theme) {
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
function updateExistingPlayers(theme) {
    // 현재 페이지의 모든 프레임 검색
    const frames = figma.currentPage.findAll(node => node.type === 'FRAME' &&
        node.getPluginData('trackUrl') !== '');
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLXNvdW5kY2xvdWQtcGxheWVyLy4vc3JjL3NlcnZpY2VzL3RoZW1lTWFuYWdlci50cyIsIndlYnBhY2s6Ly9maWdtYS1zb3VuZGNsb3VkLXBsYXllci8uL3NyYy90aGVtZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtc291bmRjbG91ZC1wbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtc291bmRjbG91ZC1wbGF5ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpZ21hLXNvdW5kY2xvdWQtcGxheWVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtc291bmRjbG91ZC1wbGF5ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9maWdtYS1zb3VuZGNsb3VkLXBsYXllci8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRoZW1lcyB9IGZyb20gJy4uL3RoZW1lcyc7XG5leHBvcnQgY2xhc3MgVGhlbWVNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1RoZW1lTWFuYWdlciDstIjquLDtmZQg7Iuc7J6RJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyDthYzrp4gg642w7J207YSwIO2ZleyduFxuICAgICAgICAgICAgaWYgKCF0aGVtZXMgfHwgdGhlbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+2FjOuniCDrjbDsnbTthLDqsIAg67mE7Ja0IOyeiOyKteuLiOuLpCcpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign7YWM66eIIOuNsOydtO2EsOqwgCDruYTslrQg7J6I7Iq164uI64ukJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDquLDrs7gg7YWM66eI64qUIFRFIE9QLTFcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRUaGVtZSA9IHRoZW1lcy5maW5kKHQgPT4gdC5pZCA9PT0gJ3RlLW9wMScpO1xuICAgICAgICAgICAgaWYgKGRlZmF1bHRUaGVtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRoZW1lID0gZGVmYXVsdFRoZW1lO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDquLDrs7gg7YWM66eIIOyEpOygleuQqDogJHtkZWZhdWx0VGhlbWUubmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRoZW1lID0gdGhlbWVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDquLDrs7gg7YWM66eI66W8IOywvuydhCDsiJgg7JeG7Ja0IOyyqyDrsojsp7gg7YWM66eI66GcIOyEpOyglTogJHt0aGVtZXNbMF0ubmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZW1lTWFuYWdlciDstIjquLDtmZQg7KSRIOyYpOulmDonLCBlcnJvcik7XG4gICAgICAgICAgICAvLyDruYTsg4Hsmqkg6riw67O4IO2FjOuniCDsg53shLFcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRoZW1lID0ge1xuICAgICAgICAgICAgICAgIGlkOiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkRlZmF1bHQgVGhlbWVcIixcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzAwOTlGRlwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiI0Y1RjVGNVwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VGV4dENvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiIzAwOTlGRlwiLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKCFUaGVtZU1hbmFnZXIuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIFRoZW1lTWFuYWdlci5pbnN0YW5jZSA9IG5ldyBUaGVtZU1hbmFnZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVGhlbWVNYW5hZ2VyLmluc3RhbmNlO1xuICAgIH1cbiAgICBnZXRDdXJyZW50VGhlbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRUaGVtZTtcbiAgICB9XG4gICAgc2V0Q3VycmVudFRoZW1lKHRoZW1lKSB7XG4gICAgICAgIGlmICghdGhlbWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+ycoO2aqO2VmOyngCDslYrsnYAg7YWM66eI6rCAIOyEpOygleuQmOyXiOyKteuLiOuLpCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGDthYzrp4gg67OA6rK9OiAke3RoZW1lLm5hbWV9ICgke3RoZW1lLmlkfSlgKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGhlbWUgPSB0aGVtZTtcbiAgICB9XG4gICAgZ2V0VGhlbWVCeUlkKGlkKSB7XG4gICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+ycoO2aqO2VmOyngCDslYrsnYAg7YWM66eIIElE7J6F64uI64ukJyk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB0aGVtZSA9IHRoZW1lcy5maW5kKHRoZW1lID0+IHRoZW1lLmlkID09PSBpZCk7XG4gICAgICAgICAgICBpZiAoIXRoZW1lKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGDthYzrp4jrpbwg7LC+7J2EIOyImCDsl4bsnYw6ICR7aWR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhlbWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGDthYzrp4gg6rKA7IOJIOykkSDsmKTrpZggKElEOiAke2lkfSk6YCwgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRBbGxUaGVtZXMoKSB7XG4gICAgICAgIC8vIO2FjOuniCDrsLDsl7TsnZgg67O17IKs67O4IOuwmO2ZmFxuICAgICAgICByZXR1cm4gWy4uLnRoZW1lc107XG4gICAgfVxuICAgIC8vIENTUyDsiqTtg4Dsnbwg67OA7IiYIOyDneyEsVxuICAgIGdlbmVyYXRlQ1NTVmFyaWFibGVzKHRoZW1lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXRoZW1lIHx8ICF0aGVtZS5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfsnKDtmqjtlZjsp4Ag7JWK7J2AIO2FjOuniCDrjbDsnbTthLAnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+ycoO2aqO2VmOyngCDslYrsnYAg7YWM66eIIOuNsOydtO2EsCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBzdHlsZXMgfSA9IHRoZW1lO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NTUyDrs4DsiJgg7IOd7ISxOicsIHRoZW1lLmlkKTtcbiAgICAgICAgICAgIHJldHVybiBgXG4gICAgICAgIDpyb290IHtcbiAgICAgICAgICAtLXRoZW1lLWJhY2tncm91bmQ6ICR7c3R5bGVzLmJhY2tncm91bmRDb2xvcn07XG4gICAgICAgICAgLS10aGVtZS10ZXh0OiAke3N0eWxlcy50ZXh0Q29sb3J9O1xuICAgICAgICAgIC0tdGhlbWUtYnV0dG9uOiAke3N0eWxlcy5idXR0b25Db2xvcn07XG4gICAgICAgICAgLS10aGVtZS1kaXNwbGF5OiAke3N0eWxlcy5kaXNwbGF5Q29sb3J9O1xuICAgICAgICAgIC0tdGhlbWUtZGlzcGxheS10ZXh0OiAke3N0eWxlcy5kaXNwbGF5VGV4dENvbG9yfTtcbiAgICAgICAgICAtLXRoZW1lLWFjY2VudDogJHtzdHlsZXMuYWNjZW50Q29sb3J9O1xuICAgICAgICAgIC0tdGhlbWUtcmFkaXVzOiAke3N0eWxlcy5ib3JkZXJSYWRpdXN9O1xuICAgICAgICB9XG4gICAgICBgO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ1NTIOuzgOyImCDsg53shLEg7KSRIOyYpOulmDonLCBlcnJvcik7XG4gICAgICAgICAgICAvLyDsmKTrpZgg67Cc7IOdIOyLnCDquLDrs7ggQ1NTIOuzgOyImCDrsJjtmZhcbiAgICAgICAgICAgIHJldHVybiBgXG4gICAgICAgIDpyb290IHtcbiAgICAgICAgICAtLXRoZW1lLWJhY2tncm91bmQ6ICNGRkZGRkY7XG4gICAgICAgICAgLS10aGVtZS10ZXh0OiAjMDAwMDAwO1xuICAgICAgICAgIC0tdGhlbWUtYnV0dG9uOiAjMDA5OUZGO1xuICAgICAgICAgIC0tdGhlbWUtZGlzcGxheTogI0Y1RjVGNTtcbiAgICAgICAgICAtLXRoZW1lLWRpc3BsYXktdGV4dDogIzAwMDAwMDtcbiAgICAgICAgICAtLXRoZW1lLWFjY2VudDogIzAwOTlGRjtcbiAgICAgICAgICAtLXRoZW1lLXJhZGl1czogNHB4O1xuICAgICAgICB9XG4gICAgICBgO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEZpZ21hIOuFuOuTnOyXkCDthYzrp4gg7Iqk7YOA7J28IOyggeyaqVxuICAgIGFwcGx5VGhlbWVUb0ZpZ21hTm9kZShub2RlLCB0aGVtZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign7Jyg7Zqo7ZWY7KeAIOyViuydgCBGaWdtYSDrhbjrk5wnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoZW1lIHx8ICF0aGVtZS5zdHlsZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfsnKDtmqjtlZjsp4Ag7JWK7J2AIO2FjOuniCDrjbDsnbTthLAnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IHN0eWxlcyB9ID0gdGhlbWU7XG4gICAgICAgICAgICAvLyDrsLDqsr3sg4kg7KCB7JqpXG4gICAgICAgICAgICBub2RlLmZpbGxzID0gW3tcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoaXMuaGV4VG9SR0Ioc3R5bGVzLmJhY2tncm91bmRDb2xvcilcbiAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgIC8vIO2FjOuRkOumrCDsoIHsmqlcbiAgICAgICAgICAgIG5vZGUuc3Ryb2tlcyA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmhleFRvUkdCKHN0eWxlcy50ZXh0Q29sb3IpXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAvLyDrnbzsmrTrk5wg7L2U64SIIOyggeyaqVxuICAgICAgICAgICAgbm9kZS5jb3JuZXJSYWRpdXMgPSBwYXJzZUludChzdHlsZXMuYm9yZGVyUmFkaXVzKSB8fCA0O1xuICAgICAgICAgICAgLy8g7YWM66eIIOygleuztCDsoIDsnqVcbiAgICAgICAgICAgIG5vZGUuc2V0UGx1Z2luRGF0YSgndGhlbWVJZCcsIHRoZW1lLmlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDthYzrp4ggJHt0aGVtZS5pZH3qsIAgRmlnbWEg64W465Oc7JeQIOyggeyaqeuQqGApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmlnbWEg64W465Oc7JeQIO2FjOuniCDsoIHsmqkg7KSRIOyYpOulmDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g7Zes7Y28IO2VqOyImDogSEVYIOyDieyDgeydhCBSR0Ig6rCd7LK066GcIOuzgO2ZmFxuICAgIGhleFRvUkdCKGhleCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFoZXggfHwgdHlwZW9mIGhleCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+ycoO2aqO2VmOyngCDslYrsnYAgSEVYIOyDieyDgSDqsJInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICMg6riw7Zi4IOygnOqxsFxuICAgICAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICAgICAgICBpZiAoIS9eWzAtOUEtRmEtZl17Nn0kLy50ZXN0KGhleCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+ycoO2aqO2VmOyngCDslYrsnYAgSEVYIO2YleyLnScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUkdCIOqwkiDstpTstpxcbiAgICAgICAgICAgIGNvbnN0IHIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNikgLyAyNTU7XG4gICAgICAgICAgICBjb25zdCBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpIC8gMjU1O1xuICAgICAgICAgICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KSAvIDI1NTtcbiAgICAgICAgICAgIHJldHVybiB7IHIsIGcsIGIgfTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0hFWCB0byBSR0Ig67OA7ZmYIOykkSDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8g7Jik66WYIOyLnCDqsoDsnYDsg4kg67CY7ZmYXG4gICAgICAgICAgICByZXR1cm4geyByOiAwLCBnOiAwLCBiOiAwIH07XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgdGhlbWVzID0gW1xuICAgIHtcbiAgICAgICAgaWQ6IFwiZnJhbWVyLW1pbmltYWxcIixcbiAgICAgICAgbmFtZTogXCJGcmFtZXIgTWluaW1hbFwiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzAwOTlGRlwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiNGNUY1RjVcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiIzAwOTlGRlwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEycHhcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcImZyYW1lci1kYXJrXCIsXG4gICAgICAgIG5hbWU6IFwiRnJhbWVyIERhcmtcIixcbiAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzFFMUUxRVwiLFxuICAgICAgICAgICAgdGV4dENvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiBcIiMwMDk5RkZcIixcbiAgICAgICAgICAgIGRpc3BsYXlDb2xvcjogXCIjMkQyRDJEXCIsXG4gICAgICAgICAgICBkaXNwbGF5VGV4dENvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGFjY2VudENvbG9yOiBcIiMwMDk5RkZcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMnB4XCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogXCJ0ZS1vcDFcIixcbiAgICAgICAgbmFtZTogXCJURSBPUC0xXCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGRkNDMDBcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiIzExMTExMVwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogXCJ0ZS1vcDEtZGFya1wiLFxuICAgICAgICBuYW1lOiBcIlRFIE9QLTEgRGFya1wiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMjIyMjIyXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiI0ZGRkZGRlwiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiI0ZGQ0MwMFwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiI0ZGQ0MwMFwiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiI0ZGQ0MwMFwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IFwibmVvLW1pbnRcIixcbiAgICAgICAgbmFtZTogXCJOZW8gTWludFwiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjQkRFRUQwXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiIzJBM0I0N1wiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzBDQzBERlwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiIzJBM0I0N1wiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiI0ZGNkI5NVwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjE2cHhcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcInZhcG9yLXdhdmVcIixcbiAgICAgICAgbmFtZTogXCJWYXBvciBXYXZlXCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMxMzEzNzdcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjRkYwMEZGXCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjMDBGRkZGXCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjRkYwMEZGXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMHB4XCIgLy8gU2hhcnAgY29ybmVyc1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcImlwb2QtY2xhc3NpY1wiLFxuICAgICAgICBuYW1lOiBcImlQb2QgQ2xhc3NpY1wiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRUNFQ0VDXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzZBNkE2QVwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiNENkRDRTRcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiIzAwN0FGRlwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IFwibWluaW1hbC1wbGF5ZXJcIixcbiAgICAgICAgbmFtZTogXCLrr7jri4jrqYAg7ZSM66CI7J207Ja0ICjslajrspTslYTtirgg7JeG7J2MKVwiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRjhGOEY4XCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiIzMzMzMzM1wiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzU1NTU1NVwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiIzMzMzMzM1wiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiIzU1NTU1NVwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiIC8vIOy1nOyGjO2VnOydmCDrkaXqt7wg66qo7ISc66asXG4gICAgICAgIH1cbiAgICB9XG5dO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cIkBmaWdtYS9wbHVnaW4tdHlwaW5nc1wiIC8+XG5pbXBvcnQgeyBUaGVtZU1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL3RoZW1lTWFuYWdlcic7XG4vLyDtlIzrn6zqt7jsnbgg7LSI6riw7ZmUXG5maWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICB3aWR0aDogMzIwLFxuICAgIGhlaWdodDogNDIwLFxuICAgIHRoZW1lQ29sb3JzOiB0cnVlXG59KTtcbi8vIO2FjOuniCDrp6Tri4jsoIAg7J247Iqk7YS07IqkIOqwgOyguOyYpOq4sFxuY29uc3QgdGhlbWVNYW5hZ2VyID0gVGhlbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4vLyDtlIzrn6zqt7jsnbgg66mU7Iuc7KeAIOyymOumrFxuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnaW5zZXJ0LXBsYXllcic6XG4gICAgICAgICAgICBoYW5kbGVJbnNlcnRQbGF5ZXIobXNnLnRyYWNrLCBtc2cudGhlbWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoYW5nZS10aGVtZSc6XG4gICAgICAgICAgICAvLyDthYzrp4gg67OA6rK9IOyymOumrFxuICAgICAgICAgICAgdGhlbWVNYW5hZ2VyLnNldEN1cnJlbnRUaGVtZShtc2cudGhlbWUpO1xuICAgICAgICAgICAgdXBkYXRlRXhpc3RpbmdQbGF5ZXJzKG1zZy50aGVtZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG4vLyDtlIzroIjsnbTslrQg7ZSE66CI7J6EIOyDneyEsVxuZnVuY3Rpb24gaGFuZGxlSW5zZXJ0UGxheWVyKHRyYWNrLCB0aGVtZSkge1xuICAgIC8vIOuplOyduCDtlITroIjsnoQg7IOd7ISxXG4gICAgY29uc3QgZnJhbWUgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgIGZyYW1lLm5hbWUgPSBgU0MgTUlDUk8gLSAke3RyYWNrLnRpdGxlfWA7XG4gICAgZnJhbWUucmVzaXplKDE2MCwgNDApOyAvLyDsmrjtirjrnbwg66eI7J207YGs66GcIOyCrOydtOymiOuhnCDsobDsoJVcbiAgICAvLyDthYzrp4gg7Iqk7YOA7J28IOyggeyaqVxuICAgIHRoZW1lTWFuYWdlci5hcHBseVRoZW1lVG9GaWdtYU5vZGUoZnJhbWUsIHRoZW1lKTtcbiAgICAvLyDtirjrnpkg7KCV67O0IOyggOyepVxuICAgIGZyYW1lLnNldFBsdWdpbkRhdGEoJ3RyYWNrVXJsJywgdHJhY2sudXJsKTtcbiAgICBmcmFtZS5zZXRQbHVnaW5EYXRhKCd0cmFja1RpdGxlJywgdHJhY2sudGl0bGUpO1xuICAgIGZyYW1lLnNldFBsdWdpbkRhdGEoJ3RyYWNrQXJ0aXN0JywgdHJhY2suYXJ0aXN0KTtcbiAgICAvLyA9PT09IOy9mO2FkOy4oCDroIjsnbTslYTsm4MgPT09PVxuICAgIGNvbnN0IGNvbnRlbnQgPSBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgIGNvbnRlbnQubmFtZSA9IFwiQ29udGVudFwiO1xuICAgIGNvbnRlbnQucmVzaXplKDE1MCwgMzApO1xuICAgIGNvbnRlbnQueCA9IDU7XG4gICAgY29udGVudC55ID0gNTtcbiAgICAvLyDsvZjthZDsuKAg7Iqk7YOA7J28XG4gICAgY29udGVudC5maWxscyA9IFt7XG4gICAgICAgICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgICAgICAgY29sb3I6IHRoZW1lTWFuYWdlci5oZXhUb1JHQih0aGVtZS5zdHlsZXMuZGlzcGxheUNvbG9yKVxuICAgICAgICB9XTtcbiAgICBjb250ZW50LmNvcm5lclJhZGl1cyA9IDQ7XG4gICAgZnJhbWUuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgLy8gPT09PSDslajrspQg7JWE7Yq4ID09PT1cbiAgICBjb25zdCBhbGJ1bUFydCA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgYWxidW1BcnQubmFtZSA9IFwiQWxidW0gQXJ0XCI7XG4gICAgYWxidW1BcnQucmVzaXplKDIwLCAyMCk7XG4gICAgYWxidW1BcnQueCA9IDU7XG4gICAgYWxidW1BcnQueSA9IDU7XG4gICAgYWxidW1BcnQuZmlsbHMgPSBbe1xuICAgICAgICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgICAgICAgIGNvbG9yOiB0aGVtZU1hbmFnZXIuaGV4VG9SR0IodGhlbWUuc3R5bGVzLmFjY2VudENvbG9yKVxuICAgICAgICB9XTtcbiAgICBhbGJ1bUFydC5jb3JuZXJSYWRpdXMgPSAyO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoYWxidW1BcnQpO1xuICAgIC8vID09PT0g7Yq4656ZIOygnOuqqSA9PT09XG4gICAgY29uc3QgdGl0bGVUZXh0ID0gZmlnbWEuY3JlYXRlVGV4dCgpO1xuICAgIHRpdGxlVGV4dC5mb250TmFtZSA9IHsgZmFtaWx5OiBcIkludGVyXCIsIHN0eWxlOiBcIk1lZGl1bVwiIH07XG4gICAgdGl0bGVUZXh0LmNoYXJhY3RlcnMgPSB0cmFjay50aXRsZTtcbiAgICB0aXRsZVRleHQuZm9udFNpemUgPSA5O1xuICAgIHRpdGxlVGV4dC5maWxscyA9IFt7XG4gICAgICAgICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgICAgICAgY29sb3I6IHRoZW1lTWFuYWdlci5oZXhUb1JHQih0aGVtZS5zdHlsZXMuZGlzcGxheVRleHRDb2xvcilcbiAgICAgICAgfV07XG4gICAgY29udGVudC5hcHBlbmRDaGlsZCh0aXRsZVRleHQpO1xuICAgIHRpdGxlVGV4dC54ID0gMzA7XG4gICAgdGl0bGVUZXh0LnkgPSA1O1xuICAgIC8vID09PT0g7JWE7Yuw7Iqk7Yq4IOydtOumhCA9PT09XG4gICAgY29uc3QgYXJ0aXN0VGV4dCA9IGZpZ21hLmNyZWF0ZVRleHQoKTtcbiAgICBhcnRpc3RUZXh0LmZvbnROYW1lID0geyBmYW1pbHk6IFwiSW50ZXJcIiwgc3R5bGU6IFwiUmVndWxhclwiIH07XG4gICAgYXJ0aXN0VGV4dC5jaGFyYWN0ZXJzID0gdHJhY2suYXJ0aXN0O1xuICAgIGFydGlzdFRleHQuZm9udFNpemUgPSA3O1xuICAgIGFydGlzdFRleHQuZmlsbHMgPSBbe1xuICAgICAgICAgICAgdHlwZTogJ1NPTElEJyxcbiAgICAgICAgICAgIGNvbG9yOiB0aGVtZU1hbmFnZXIuaGV4VG9SR0IodGhlbWUuc3R5bGVzLmRpc3BsYXlUZXh0Q29sb3IpLFxuICAgICAgICAgICAgb3BhY2l0eTogMC44XG4gICAgICAgIH1dO1xuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoYXJ0aXN0VGV4dCk7XG4gICAgYXJ0aXN0VGV4dC54ID0gMzA7XG4gICAgYXJ0aXN0VGV4dC55ID0gMTg7XG4gICAgLy8gPT09PSDsg4Htg5wg7ZGc7IucIOygkCA9PT09XG4gICAgY29uc3Qgc3RhdHVzRG90ID0gZmlnbWEuY3JlYXRlRWxsaXBzZSgpO1xuICAgIHN0YXR1c0RvdC5uYW1lID0gXCJTdGF0dXNcIjtcbiAgICBzdGF0dXNEb3QucmVzaXplKDQsIDQpO1xuICAgIHN0YXR1c0RvdC54ID0gMTQwO1xuICAgIHN0YXR1c0RvdC55ID0gMTM7XG4gICAgc3RhdHVzRG90LmZpbGxzID0gW3tcbiAgICAgICAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICAgICAgICBjb2xvcjogeyByOiAwLCBnOiAxLCBiOiAwLjUgfSAvLyDstIjroZ3sg4kg7J6s7IOdIO2RnOyLnOuTsVxuICAgICAgICB9XTtcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKHN0YXR1c0RvdCk7XG4gICAgLy8g7LWc7KKFIOychOy5mCDsobDsoJVcbiAgICBjb25zdCBjZW50ZXIgPSBmaWdtYS52aWV3cG9ydC5jZW50ZXI7XG4gICAgZnJhbWUueCA9IGNlbnRlci54IC0gZnJhbWUud2lkdGggLyAyO1xuICAgIGZyYW1lLnkgPSBjZW50ZXIueSAtIGZyYW1lLmhlaWdodCAvIDI7XG4gICAgLy8g7ISg7YOdIOuwjyDrt7Dtj6ztirgg7KGw7KCVXG4gICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gW2ZyYW1lXTtcbiAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcoW2ZyYW1lXSk7XG4gICAgLy8g7JmE66OMIOyVjOumvFxuICAgIGZpZ21hLm5vdGlmeShgJHt0cmFjay50aXRsZX0g66eI7J207YGs66GcIO2UjOugiOydtOyWtOqwgCDsgr3snoXrkJjsl4jsirXri4jri6RgKTtcbn1cbi8vIOq4sOyhtCDtlIzroIjsnbTslrQg7JeF642w7J207Yq4XG5mdW5jdGlvbiB1cGRhdGVFeGlzdGluZ1BsYXllcnModGhlbWUpIHtcbiAgICAvLyDtmITsnqwg7Y6Y7J207KeA7J2YIOuqqOuToCDtlITroIjsnoQg6rKA7IOJXG4gICAgY29uc3QgZnJhbWVzID0gZmlnbWEuY3VycmVudFBhZ2UuZmluZEFsbChub2RlID0+IG5vZGUudHlwZSA9PT0gJ0ZSQU1FJyAmJlxuICAgICAgICBub2RlLmdldFBsdWdpbkRhdGEoJ3RyYWNrVXJsJykgIT09ICcnKTtcbiAgICAvLyDqsIEg7ZSE66CI7J6E7JeQIO2FjOuniCDsoIHsmqlcbiAgICBmcmFtZXMuZm9yRWFjaChmcmFtZSA9PiB7XG4gICAgICAgIGlmIChmcmFtZS50eXBlID09PSAnRlJBTUUnKSB7XG4gICAgICAgICAgICB0aGVtZU1hbmFnZXIuYXBwbHlUaGVtZVRvRmlnbWFOb2RlKGZyYW1lLCB0aGVtZSk7XG4gICAgICAgICAgICAvLyDrgrTrtoAg7JqU7IaM64+EIOyXheuNsOydtO2KuCAo65SU7Iqk7ZSM66CI7J20LCDrsoTtirwg65OxKVxuICAgICAgICAgICAgY29uc3QgZGlzcGxheSA9IGZyYW1lLmZpbmRPbmUobm9kZSA9PiBub2RlLm5hbWUgPT09ICdEaXNwbGF5JyAmJiBub2RlLnR5cGUgPT09ICdGUkFNRScpO1xuICAgICAgICAgICAgaWYgKGRpc3BsYXkgJiYgZGlzcGxheS50eXBlID09PSAnRlJBTUUnKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheS5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lTWFuYWdlci5oZXhUb1JHQih0aGVtZS5zdHlsZXMuZGlzcGxheUNvbG9yKVxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAvLyDthY3siqTtirgg7JqU7IaMIOyXheuNsOydtO2KuFxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRzID0gZGlzcGxheS5maW5kQWxsKG5vZGUgPT4gbm9kZS50eXBlID09PSAnVEVYVCcpO1xuICAgICAgICAgICAgICAgIHRleHRzLmZvckVhY2godGV4dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0LnR5cGUgPT09ICdURVhUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZU1hbmFnZXIuaGV4VG9SR0IodGhlbWUuc3R5bGVzLmRpc3BsYXlUZXh0Q29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOyerOyDnSDrsoTtirwg7JeF642w7J207Yq4XG4gICAgICAgICAgICBjb25zdCBwbGF5QnV0dG9uID0gZnJhbWUuZmluZE9uZShub2RlID0+IG5vZGUubmFtZSA9PT0gJ1BsYXkgQnV0dG9uJyAmJiBub2RlLnR5cGUgPT09ICdGUkFNRScpO1xuICAgICAgICAgICAgaWYgKHBsYXlCdXR0b24gJiYgcGxheUJ1dHRvbi50eXBlID09PSAnRlJBTUUnKSB7XG4gICAgICAgICAgICAgICAgcGxheUJ1dHRvbi5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lTWFuYWdlci5oZXhUb1JHQih0aGVtZS5zdHlsZXMuYnV0dG9uQ29sb3IpXG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=