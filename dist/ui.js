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

/***/ "./src/services/trackService.ts":
/*!**************************************!*\
  !*** ./src/services/trackService.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrackService: () => (/* binding */ TrackService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class TrackService {
    // 싱글톤 패턴으로 구현
    constructor() {
        this.trackCache = new Map();
        console.log('TrackService 초기화');
    }
    static getInstance() {
        if (!TrackService.instance) {
            TrackService.instance = new TrackService();
        }
        return TrackService.instance;
    }
    // 미리 정의된 트랙 목록
    getPredefinedTracks() {
        try {
            console.log('미리 정의된 트랙 목록 가져오기');
            const tracks = [
                {
                    title: "OP-1 Field Ambient Session",
                    artist: "Red Means Recording",
                    url: "https://soundcloud.com/soundsgood_store/monday-mix-sgmm119-lovefool?in_system_playlist=artist-stations%3A516644622",
                },
                {
                    title: "TX-6 + OP-1 Field Jam",
                    artist: "HAINBACH",
                    url: "https://soundcloud.com/euna34everywhere/sunshower?in_system_playlist=your-moods%3A3311134%3A2",
                },
                {
                    title: "EP-133 First Impressions",
                    artist: "Red Means Recording",
                    url: "https://soundcloud.com/user-190687460/sunday?in_system_playlist=your-moods%3A3311134%3A2",
                },
            ];
            console.log(`트랙 목록 반환: ${tracks.length}개 트랙`);
            return tracks;
        }
        catch (error) {
            console.error('트랙 목록 가져오기 오류:', error);
            return []; // 오류 시 빈 배열 반환
        }
    }
    // 트랙 메타데이터 가져오기
    getTrackMetadata(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!url) {
                    throw new Error('유효하지 않은 URL');
                }
                console.log(`트랙 메타데이터 요청: ${url}`);
                // 캐시에 있으면 캐시에서 가져오기
                if (this.trackCache.has(url)) {
                    console.log('캐시에서 트랙 정보 가져옴');
                    return this.trackCache.get(url);
                }
                // SoundCloud oEmbed API로 정보 가져오기
                console.log('SoundCloud API 요청 시작');
                const response = yield fetch(`https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`);
                if (!response.ok) {
                    throw new Error(`API 응답 오류: ${response.status}`);
                }
                const data = yield response.json();
                console.log('API 응답 받음:', data);
                const track = {
                    title: data.title.split(" by ")[0] || data.title,
                    artist: data.title.includes(" by ") ? data.title.split(" by ")[1] : "Unknown Artist",
                    url: url,
                    artwork: data.thumbnail_url
                };
                // 캐시에 저장
                this.trackCache.set(url, track);
                console.log('트랙 정보 캐시에 저장됨');
                return track;
            }
            catch (error) {
                console.error('트랙 메타데이터 가져오기 실패:', error);
                // 에러 상황에서 기본 정보 반환
                return {
                    title: "Unknown Track",
                    artist: "Unknown Artist",
                    url: url || "https://soundcloud.com/"
                };
            }
        });
    }
    // 캐시 비우기
    clearCache() {
        try {
            this.trackCache.clear();
            console.log('트랙 캐시 비움');
        }
        catch (error) {
            console.error('캐시 비우기 오류:', error);
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
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_themeManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/themeManager */ "./src/services/themeManager.ts");
/* harmony import */ var _services_trackService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/trackService */ "./src/services/trackService.ts");


// 디버그 정보 로깅
console.log('%c FIXED VERSION 1.1.8: UI 개선 및 테마 추가', 'background: #FF0000; color: white; font-size: 20px');
// 전역 객체에 클래스 할당
window.ThemeManager = _services_themeManager__WEBPACK_IMPORTED_MODULE_0__.ThemeManager;
window.TrackService = _services_trackService__WEBPACK_IMPORTED_MODULE_1__.TrackService;
// 하드코딩된 트랙 목록 (문제가 있을 경우 직접 사용)
const FALLBACK_TRACKS = [
    {
        title: "OP-1 Field Ambient Session",
        artist: "Red Means Recording",
        url: "https://soundcloud.com/soundsgood_store/monday-mix-sgmm119-lovefool",
    },
    {
        title: "TX-6 + OP-1 Field Jam",
        artist: "HAINBACH",
        url: "https://soundcloud.com/euna34everywhere/sunshower",
    },
    {
        title: "EP-133 First Impressions",
        artist: "Red Means Recording",
        url: "https://soundcloud.com/user-190687460/sunday",
    },
];
// 하드코딩된 테마 목록 (문제가 있을 경우 직접 사용)
const FALLBACK_THEMES = [
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
    }
];
class PlayerUI {
    constructor() {
        // DOM 요소
        this.trackList = null;
        this.scIframe = null;
        this.previewContainer = null;
        this.previewTitle = null;
        this.previewArtist = null;
        this.statusDot = null;
        this.playIcon = null;
        this.pauseIcon = null;
        this.playPauseBtn = null;
        this.themeSelect = null;
        this.insertButton = null;
        // 상태
        this.selectedTrack = null;
        this.scPlayer = null;
        this.isPlaying = false;
        // 미리 정의된 트랙과 테마 목록
        this.predefinedTracks = [];
        this.availableThemes = [];
        console.log('PlayerUI 초기화 시작');
        try {
            // 서비스 인스턴스 초기화
            this.themeManager = _services_themeManager__WEBPACK_IMPORTED_MODULE_0__.ThemeManager.getInstance();
            this.trackService = _services_trackService__WEBPACK_IMPORTED_MODULE_1__.TrackService.getInstance();
            // 트랙 및 테마 데이터 초기화
            this.initData();
            // 기본 테마 설정
            this.currentTheme = this.availableThemes[0];
            // DOM 로드 확인
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', this.onDomLoaded.bind(this));
                console.log('DOM 로딩 중, DOMContentLoaded 이벤트 리스너 등록');
            }
            else {
                this.onDomLoaded();
                console.log('DOM 이미 로드됨, 초기화 진행');
            }
        }
        catch (error) {
            console.error('PlayerUI 초기화 중 오류 발생:', error);
            this.logError('초기화 오류', error);
        }
    }
    logError(context, error) {
        console.error(`[${context}]:`, error);
        try {
            alert(`${context}: ${error.message || '알 수 없는 오류'}`);
        }
        catch (e) {
            // 알림 표시 중 오류 발생 시 무시
        }
    }
    initData() {
        try {
            // 트랙 목록 가져오기
            const serviceTracks = this.trackService.getPredefinedTracks();
            // 트랙 목록이 비어있거나 오류가 있으면 fallback 사용
            this.predefinedTracks = serviceTracks && serviceTracks.length > 0
                ? serviceTracks
                : FALLBACK_TRACKS;
            console.log(`트랙 목록 초기화: ${this.predefinedTracks.length}개 트랙`);
            // 테마 목록 가져오기
            const serviceThemes = this.themeManager.getAllThemes();
            // 테마 목록이 비어있거나 오류가 있으면 fallback 사용
            this.availableThemes = serviceThemes && serviceThemes.length > 0
                ? serviceThemes
                : FALLBACK_THEMES;
            console.log(`테마 목록 초기화: ${this.availableThemes.length}개 테마`);
            // 첫 번째 테마를 기본값으로 설정
            if (this.availableThemes.length > 0) {
                this.currentTheme = this.availableThemes[0];
                console.log(`기본 테마 설정: ${this.currentTheme.name}`);
            }
            else {
                console.error('테마 목록이 비어 있음. 기본 테마를 설정할 수 없음');
            }
        }
        catch (error) {
            console.error('데이터 초기화 중 오류 발생:', error);
            // Fallback 데이터 사용
            this.predefinedTracks = FALLBACK_TRACKS;
            this.availableThemes = FALLBACK_THEMES;
            this.currentTheme = FALLBACK_THEMES[0];
        }
    }
    onDomLoaded() {
        console.log('DOM 로드 완료, UI 초기화 시작');
        // DOM 요소 초기화 전에 짧은 지연 추가
        setTimeout(() => {
            this.initialize();
        }, 200);
    }
    initialize() {
        try {
            console.log('UI 초기화 시작');
            // DOM 요소 가져오기
            this.initDomElements();
            // UI 구성요소 초기화
            this.applyThemeToUI(this.currentTheme);
            this.initThemeSelectDropdown();
            this.setupEventListeners();
            this.displayTracks();
            // SoundCloud Widget API 로드
            this.loadSoundCloudAPI();
            console.log('UI 초기화 완료');
        }
        catch (error) {
            console.error('UI 초기화 중 오류 발생:', error);
            this.logError('UI 초기화 오류', error);
        }
    }
    initDomElements() {
        console.log('DOM 요소 가져오기');
        try {
            // 기본 요소 가져오기
            this.trackList = document.getElementById('track-list');
            this.themeSelect = document.getElementById('theme-select');
            this.insertButton = document.getElementById('insert-button');
            // 기본 요소 확인
            if (!this.trackList || !this.themeSelect || !this.insertButton) {
                const missing = [];
                if (!this.trackList)
                    missing.push('track-list');
                if (!this.themeSelect)
                    missing.push('theme-select');
                if (!this.insertButton)
                    missing.push('insert-button');
                const missingStr = missing.join(', ');
                console.error(`필수 DOM 요소를 찾을 수 없음: ${missingStr}`);
                // 요소가 없는 경우 직접 생성 시도
                this.createMissingElements(missing);
            }
            // 기타 요소 가져오기
            this.scIframe = document.getElementById('sc-iframe');
            this.previewContainer = document.getElementById('preview-container');
            this.previewTitle = document.getElementById('preview-title');
            this.previewArtist = document.getElementById('preview-artist');
            this.statusDot = document.getElementById('status-dot');
            this.playIcon = document.getElementById('play-icon');
            this.pauseIcon = document.getElementById('pause-icon');
            this.playPauseBtn = document.getElementById('play-pause-btn');
            console.log('DOM 요소 가져오기 완료');
        }
        catch (error) {
            console.error('DOM 요소 가져오기 실패:', error);
            throw new Error(`DOM 요소 초기화 오류: ${error.message}`);
        }
    }
    // 누락된 필수 요소를 직접 생성
    createMissingElements(missing) {
        console.log('누락된 DOM 요소 생성 시도:', missing);
        const container = document.querySelector('.container') || document.body;
        if (missing.includes('theme-select') && !this.themeSelect) {
            console.log('theme-select 요소 생성');
            const themeSection = document.createElement('div');
            themeSection.className = 'theme-selector';
            themeSection.innerHTML = `
        <label for="theme-select" class="playlist-title">Select Theme</label>
        <select id="theme-select"></select>
      `;
            container.appendChild(themeSection);
            this.themeSelect = document.getElementById('theme-select');
        }
        if (missing.includes('track-list') && !this.trackList) {
            console.log('track-list 요소 생성');
            const trackSection = document.createElement('div');
            trackSection.className = 'playlist-container';
            trackSection.innerHTML = `
        <div class="playlist-title">Select Track</div>
        <div class="track-list" id="track-list"></div>
      `;
            container.appendChild(trackSection);
            this.trackList = document.getElementById('track-list');
        }
        if (missing.includes('insert-button') && !this.insertButton) {
            console.log('insert-button 요소 생성');
            const button = document.createElement('button');
            button.id = 'insert-button';
            button.className = 'insert-button';
            button.textContent = 'Insert Player';
            container.appendChild(button);
            this.insertButton = button;
        }
    }
    loadSoundCloudAPI() {
        console.log('SoundCloud API 로드 시작');
        try {
            // 이미 로드된 경우 스킵
            if (window.SC && window.SC.Widget) {
                console.log('SoundCloud API 이미 로드됨');
                return;
            }
            const scWidgetScript = document.createElement('script');
            scWidgetScript.src = 'https://w.soundcloud.com/player/api.js';
            // API 로드 완료 이벤트
            scWidgetScript.onload = () => {
                console.log('SoundCloud API 로드 완료');
            };
            scWidgetScript.onerror = (e) => {
                console.error('SoundCloud API 로드 실패:', e);
            };
            document.head.appendChild(scWidgetScript);
        }
        catch (error) {
            console.error('SoundCloud API 로드 중 오류 발생:', error);
        }
    }
    initThemeSelectDropdown() {
        console.log('테마 선택 드롭다운 초기화');
        if (!this.themeSelect) {
            console.error('테마 선택 요소가 없어 드롭다운을 초기화할 수 없음');
            return;
        }
        try {
            // 기존 옵션 모두 제거
            this.themeSelect.innerHTML = '';
            // 테마 옵션 추가
            this.availableThemes.forEach(theme => {
                const option = document.createElement('option');
                option.value = theme.id;
                option.textContent = theme.name;
                this.themeSelect.appendChild(option);
                console.log(`테마 옵션 추가: ${theme.name}`);
            });
            // 현재 테마 선택
            if (this.currentTheme && this.currentTheme.id) {
                this.themeSelect.value = this.currentTheme.id;
                console.log(`현재 선택된 테마: ${this.currentTheme.name}`);
            }
            console.log('테마 선택 드롭다운 초기화 완료');
        }
        catch (error) {
            console.error('테마 드롭다운 초기화 중 오류:', error);
        }
    }
    setupEventListeners() {
        console.log('이벤트 리스너 설정');
        // 테마 선택 이벤트
        if (this.themeSelect) {
            // 이벤트 리스너 중복 방지
            const themeChangeHandler = this.onThemeChange.bind(this);
            this.themeSelect.removeEventListener('change', themeChangeHandler);
            this.themeSelect.addEventListener('change', themeChangeHandler);
            console.log('테마 선택 이벤트 리스너 등록됨');
        }
        // 삽입 버튼 이벤트
        if (this.insertButton) {
            const insertHandler = this.insertPlayer.bind(this);
            this.insertButton.removeEventListener('click', insertHandler);
            this.insertButton.addEventListener('click', insertHandler);
            console.log('삽입 버튼 이벤트 리스너 등록됨');
        }
        // 재생/일시정지 버튼 이벤트
        if (this.playPauseBtn) {
            const toggleHandler = this.togglePlayback.bind(this);
            this.playPauseBtn.removeEventListener('click', toggleHandler);
            this.playPauseBtn.addEventListener('click', toggleHandler);
            console.log('재생/일시정지 버튼 이벤트 리스너 등록됨');
        }
        console.log('모든 이벤트 리스너 설정 완료');
    }
    displayTracks() {
        if (!this.trackList) {
            console.error('track-list 요소를 찾을 수 없어 트랙을 표시할 수 없음');
            return;
        }
        if (!this.predefinedTracks || this.predefinedTracks.length === 0) {
            this.trackList.innerHTML = '<div style="padding: 10px; color: red;">No tracks available</div>';
            console.error('트랙 목록이 비어 있음');
            return;
        }
        console.log(`${this.predefinedTracks.length}개 트랙 표시 시작`);
        try {
            // 기존 트랙 목록 비우기
            this.trackList.innerHTML = '';
            // 트랙 목록 생성
            this.predefinedTracks.forEach((track, index) => {
                const trackItem = document.createElement('div');
                trackItem.className = 'track-item';
                trackItem.id = `track-${index}`;
                // 트랙 항목 내용 설정
                trackItem.innerHTML = `
          <div class="track-info">
            <div class="track-title">${track.title}</div>
            <div class="track-artist">${track.artist}</div>
          </div>
        `;
                // 클릭 이벤트 추가
                const trackClickHandler = () => {
                    console.log(`트랙 선택: ${track.title}`);
                    this.selectTrack(track, trackItem);
                };
                trackItem.removeEventListener('click', trackClickHandler);
                trackItem.addEventListener('click', trackClickHandler);
                // 목록에 추가
                this.trackList.appendChild(trackItem);
                console.log(`트랙 항목 추가: ${track.title}`);
            });
            console.log('트랙 목록 표시 완료');
        }
        catch (error) {
            console.error('트랙 표시 중 오류 발생:', error);
            this.trackList.innerHTML = `<div style="padding: 10px; color: red;">Error: ${error.message}</div>`;
        }
    }
    selectTrack(track, element) {
        console.log(`트랙 선택: ${track.title}`);
        // Store original HTML outside try/catch for error handling
        const originalHTML = element.innerHTML;
        try {
            this.selectedTrack = track;
            // 로딩 상태 표시
            element.classList.add('loading');
            element.innerHTML = `
        <div class="track-info">
          <div class="track-title">로딩 중...</div>
          <div class="track-artist">${track.artist}</div>
        </div>
      `;
            // 트랙 항목 스타일 업데이트
            document.querySelectorAll('.track-item').forEach(item => {
                item.classList.remove('selected');
            });
            element.classList.add('selected');
            // 미리보기 표시
            if (this.previewContainer && this.previewTitle && this.previewArtist) {
                this.previewContainer.style.display = 'block';
                this.previewTitle.textContent = track.title;
                this.previewArtist.textContent = track.artist;
                // iframe URL 설정
                if (this.scIframe && this.currentTheme) {
                    const color = this.currentTheme.styles.accentColor.replace('#', '');
                    this.scIframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=${color}&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
                    console.log('iframe URL 설정 완료');
                    // 플레이어 초기화
                    setTimeout(() => {
                        this.initSoundCloudPlayer();
                        // 로딩 상태 제거 및 원래 내용 복원
                        element.classList.remove('loading');
                        element.innerHTML = originalHTML;
                        // 성공 알림
                        this.showToast(`재생 중: ${track.title}`);
                    }, 1000);
                }
            }
            // 삽입 버튼 활성화
            if (this.insertButton) {
                this.insertButton.disabled = false;
            }
        }
        catch (error) {
            console.error('트랙 선택 중 오류:', error);
            // 오류 발생 시 원래 내용 복원
            if (element) {
                element.classList.remove('loading');
                element.innerHTML = originalHTML || `
          <div class="track-info">
            <div class="track-title">${track.title}</div>
            <div class="track-artist">${track.artist}</div>
          </div>
        `;
            }
            // 오류 알림
            this.showToast(`오류 발생: ${error.message}`, 3000);
        }
    }
    initSoundCloudPlayer() {
        if (!this.scIframe || !window.SC || !window.SC.Widget) {
            console.warn('SoundCloud Widget API 또는 iframe이 준비되지 않음');
            return;
        }
        try {
            // 이전 플레이어 제거
            this.scPlayer = null;
            // 플레이어 초기화 대기
            setTimeout(() => {
                try {
                    // 새 플레이어 생성
                    this.scPlayer = window.SC.Widget(this.scIframe);
                    console.log('SoundCloud 플레이어 생성됨');
                    // 플레이어 이벤트 리스너 설정
                    this.scPlayer.bind(window.SC.Widget.Events.READY, () => {
                        var _a, _b, _c, _d;
                        console.log('플레이어 준비 완료');
                        // 플레이 시작
                        (_a = this.scPlayer) === null || _a === void 0 ? void 0 : _a.play();
                        this.isPlaying = true;
                        this.updatePlayPauseUI();
                        // 재생 상태 이벤트
                        (_b = this.scPlayer) === null || _b === void 0 ? void 0 : _b.bind(window.SC.Widget.Events.PLAY, () => {
                            this.isPlaying = true;
                            this.updatePlayPauseUI();
                        });
                        (_c = this.scPlayer) === null || _c === void 0 ? void 0 : _c.bind(window.SC.Widget.Events.PAUSE, () => {
                            this.isPlaying = false;
                            this.updatePlayPauseUI();
                        });
                        (_d = this.scPlayer) === null || _d === void 0 ? void 0 : _d.bind(window.SC.Widget.Events.FINISH, () => {
                            this.isPlaying = false;
                            this.updatePlayPauseUI();
                        });
                    });
                }
                catch (error) {
                    console.error('SoundCloud 플레이어 초기화 오류:', error);
                }
            }, 1000);
        }
        catch (error) {
            console.error('플레이어 초기화 중 오류:', error);
        }
    }
    togglePlayback() {
        if (!this.scPlayer) {
            console.warn('플레이어가 없어서 재생/일시정지를 할 수 없음');
            return;
        }
        try {
            if (this.isPlaying) {
                this.scPlayer.pause();
            }
            else {
                this.scPlayer.play();
            }
            console.log(`재생 상태 토글: ${!this.isPlaying ? '재생' : '일시정지'}`);
        }
        catch (error) {
            console.error('재생/일시정지 중 오류:', error);
        }
    }
    updatePlayPauseUI() {
        if (!this.playIcon || !this.pauseIcon || !this.statusDot) {
            return;
        }
        try {
            // 재생/일시정지 아이콘 전환
            this.playIcon.style.display = this.isPlaying ? 'none' : 'flex';
            this.pauseIcon.style.display = this.isPlaying ? 'flex' : 'none';
            // 상태 표시 업데이트
            if (this.isPlaying) {
                this.statusDot.classList.add('playing');
            }
            else {
                this.statusDot.classList.remove('playing');
            }
            console.log(`재생 UI 업데이트: ${this.isPlaying ? '재생 중' : '일시정지'}`);
        }
        catch (error) {
            console.error('재생/일시정지 UI 업데이트 중 오류:', error);
        }
    }
    onThemeChange(event) {
        try {
            const select = event.target;
            const themeId = select.value;
            console.log(`테마 선택: ${themeId}`);
            // 선택된 테마 찾기
            const selectedTheme = this.availableThemes.find(theme => theme.id === themeId);
            if (selectedTheme) {
                // 테마 변경
                this.currentTheme = selectedTheme;
                // ThemeManager 업데이트
                this.themeManager.setCurrentTheme(selectedTheme);
                // UI에 테마 적용
                this.applyThemeToUI(selectedTheme);
                // 피그마에 테마 변경 메시지 전송
                parent.postMessage({
                    pluginMessage: {
                        type: 'change-theme',
                        theme: selectedTheme
                    }
                }, '*');
                console.log(`테마 변경 완료: ${selectedTheme.name}`);
            }
            else {
                console.warn(`테마를 찾을 수 없음: ${themeId}`);
            }
        }
        catch (error) {
            console.error('테마 변경 중 오류:', error);
        }
    }
    applyThemeToUI(theme) {
        console.log(`UI에 테마 적용: ${theme.name}`);
        try {
            // 테마 전환 애니메이션
            document.body.classList.add('theme-transition');
            const root = document.documentElement;
            const { styles } = theme;
            // CSS 변수 설정
            root.style.setProperty('--theme-background', styles.backgroundColor);
            root.style.setProperty('--theme-text', styles.textColor);
            root.style.setProperty('--theme-button', styles.buttonColor);
            root.style.setProperty('--theme-display', styles.displayColor);
            root.style.setProperty('--theme-display-text', styles.displayTextColor);
            root.style.setProperty('--theme-accent', styles.accentColor);
            root.style.setProperty('--theme-radius', styles.borderRadius);
            // 테마 변경 알림 표시
            this.showToast(`테마 변경: ${theme.name}`);
            // 테마 전환 클래스 제거
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 300);
            console.log('테마 적용 완료');
        }
        catch (error) {
            console.error('테마 적용 중 오류:', error);
        }
    }
    // 토스트 메시지 표시 유틸리티 메서드
    showToast(message, duration = 2000) {
        try {
            // 기존 토스트 제거
            const existingToast = document.getElementById('plugin-toast');
            if (existingToast) {
                existingToast.remove();
            }
            // 새 토스트 생성
            const toast = document.createElement('div');
            toast.id = 'plugin-toast';
            toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--theme-button);
        color: white;
        padding: 8px 16px;
        border-radius: var(--theme-radius);
        font-size: 12px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.2);
        z-index: 100;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
            toast.textContent = message;
            document.body.appendChild(toast);
            // 토스트 표시
            setTimeout(() => {
                toast.style.opacity = '1';
            }, 10);
            // 자동 제거
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }
        catch (error) {
            console.error('토스트 표시 중 오류:', error);
        }
    }
    insertPlayer() {
        console.log('플레이어 삽입 시도');
        if (!this.selectedTrack) {
            this.showToast('플레이어를 삽입하기 전에 트랙을 선택해주세요.', 3000);
            console.warn('선택된 트랙 없음');
            return;
        }
        try {
            // 로딩 상태 표시
            if (this.insertButton) {
                const insertBtn = this.insertButton;
                const originalText = insertBtn.textContent || 'Insert Player';
                insertBtn.disabled = true;
                insertBtn.textContent = '삽입 중...';
                // 피그마에 메시지 전송
                parent.postMessage({
                    pluginMessage: {
                        type: 'insert-player',
                        track: this.selectedTrack,
                        theme: this.currentTheme
                    }
                }, '*');
                console.log(`플레이어 삽입 메시지 전송: ${this.selectedTrack.title}`);
                // 성공 알림 표시
                this.showToast(`${this.selectedTrack.title} 플레이어가 Figma에 삽입되었습니다`, 3000);
                // 버튼 상태 복원
                setTimeout(() => {
                    if (insertBtn) {
                        insertBtn.disabled = false;
                        insertBtn.textContent = originalText;
                    }
                }, 2000);
            }
            else {
                // 버튼이 없는 경우 - 피그마에 메시지만 전송
                parent.postMessage({
                    pluginMessage: {
                        type: 'insert-player',
                        track: this.selectedTrack,
                        theme: this.currentTheme
                    }
                }, '*');
                console.log(`플레이어 삽입 메시지 전송 (버튼 없음): ${this.selectedTrack.title}`);
            }
        }
        catch (error) {
            console.error('플레이어 삽입 중 오류:', error);
            this.showToast(`플레이어 삽입 오류: ${error.message}`, 3000);
            // 버튼 상태 복원
            if (this.insertButton) {
                const insertBtn = this.insertButton;
                insertBtn.disabled = false;
                insertBtn.textContent = 'Insert Player';
            }
        }
    }
}
// 전역 객체에 PlayerUI 클래스 할당
window.PlayerUI = PlayerUI;
// UI 초기화
console.log('PlayerUI 인스턴스 생성');
const playerUI = new PlayerUI();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZHTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDekdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVEO0FBQ0E7QUFDdkQ7QUFDQSwyRUFBMkUsY0FBYztBQUN6RjtBQUNBLHNCQUFzQixnRUFBWTtBQUNsQyxzQkFBc0IsZ0VBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZ0VBQVk7QUFDNUMsZ0NBQWdDLGdFQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBLHFCQUFxQixRQUFRLElBQUksNkJBQTZCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDZCQUE2QjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsNEJBQTRCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qyx1QkFBdUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELFdBQVc7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxXQUFXO0FBQ3BELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsdUJBQXVCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxXQUFXO0FBQzlFO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw2QkFBNkI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsTUFBTTtBQUM5QztBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsWUFBWTtBQUNuRCx3Q0FBd0MsYUFBYTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxZQUFZO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxZQUFZO0FBQ3JELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRSxXQUFXLFdBQVcsY0FBYztBQUN2RztBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsWUFBWTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsYUFBYTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdGQUFnRiw4QkFBOEIsU0FBUyxNQUFNO0FBQzdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsWUFBWTtBQUM1RCxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxZQUFZO0FBQ25ELHdDQUF3QyxhQUFhO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQ0FBZ0M7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxpQ0FBaUM7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFFBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLHlDQUF5QyxtQkFBbUI7QUFDNUQ7QUFDQTtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFdBQVc7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsV0FBVztBQUNoRDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQiwrQ0FBK0MseUJBQXlCO0FBQ3hFO0FBQ0Esa0NBQWtDLDBCQUEwQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLHVEQUF1RCx5QkFBeUI7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlnbWEtc291bmRjbG91ZC1wbGF5ZXIvLi9zcmMvc2VydmljZXMvdGhlbWVNYW5hZ2VyLnRzIiwid2VicGFjazovL2ZpZ21hLXNvdW5kY2xvdWQtcGxheWVyLy4vc3JjL3NlcnZpY2VzL3RyYWNrU2VydmljZS50cyIsIndlYnBhY2s6Ly9maWdtYS1zb3VuZGNsb3VkLXBsYXllci8uL3NyYy90aGVtZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtc291bmRjbG91ZC1wbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtc291bmRjbG91ZC1wbGF5ZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpZ21hLXNvdW5kY2xvdWQtcGxheWVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtc291bmRjbG91ZC1wbGF5ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9maWdtYS1zb3VuZGNsb3VkLXBsYXllci8uL3NyYy91aS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aGVtZXMgfSBmcm9tICcuLi90aGVtZXMnO1xuZXhwb3J0IGNsYXNzIFRoZW1lTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGVtZU1hbmFnZXIg7LSI6riw7ZmUIOyLnOyekScpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8g7YWM66eIIOuNsOydtO2EsCDtmZXsnbhcbiAgICAgICAgICAgIGlmICghdGhlbWVzIHx8IHRoZW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfthYzrp4gg642w7J207YSw6rCAIOu5hOyWtCDsnojsirXri4jri6QnKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+2FjOuniCDrjbDsnbTthLDqsIAg67mE7Ja0IOyeiOyKteuLiOuLpCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g6riw67O4IO2FjOuniOuKlCBURSBPUC0xXG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VGhlbWUgPSB0aGVtZXMuZmluZCh0ID0+IHQuaWQgPT09ICd0ZS1vcDEnKTtcbiAgICAgICAgICAgIGlmIChkZWZhdWx0VGhlbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZSA9IGRlZmF1bHRUaGVtZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg6riw67O4IO2FjOuniCDshKTsoJXrkKg6ICR7ZGVmYXVsdFRoZW1lLm5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZSA9IHRoZW1lc1swXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg6riw67O4IO2FjOuniOulvCDssL7snYQg7IiYIOyXhuyWtCDssqsg67KI7Ke4IO2FjOuniOuhnCDshKTsoJU6ICR7dGhlbWVzWzBdLm5hbWV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGVtZU1hbmFnZXIg7LSI6riw7ZmUIOykkSDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8g67mE7IOB7JqpIOq4sOuzuCDthYzrp4gg7IOd7ISxXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZSA9IHtcbiAgICAgICAgICAgICAgICBpZDogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJEZWZhdWx0IFRoZW1lXCIsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiBcIiMwMDk5RkZcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiNGNUY1RjVcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICAgICAgICAgIGFjY2VudENvbG9yOiBcIiMwMDk5RkZcIixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICghVGhlbWVNYW5hZ2VyLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBUaGVtZU1hbmFnZXIuaW5zdGFuY2UgPSBuZXcgVGhlbWVNYW5hZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFRoZW1lTWFuYWdlci5pbnN0YW5jZTtcbiAgICB9XG4gICAgZ2V0Q3VycmVudFRoZW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VGhlbWU7XG4gICAgfVxuICAgIHNldEN1cnJlbnRUaGVtZSh0aGVtZSkge1xuICAgICAgICBpZiAoIXRoZW1lKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfsnKDtmqjtlZjsp4Ag7JWK7J2AIO2FjOuniOqwgCDshKTsoJXrkJjsl4jsirXri4jri6QnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhg7YWM66eIIOuzgOqyvTogJHt0aGVtZS5uYW1lfSAoJHt0aGVtZS5pZH0pYCk7XG4gICAgICAgIHRoaXMuY3VycmVudFRoZW1lID0gdGhlbWU7XG4gICAgfVxuICAgIGdldFRoZW1lQnlJZChpZCkge1xuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfsnKDtmqjtlZjsp4Ag7JWK7J2AIO2FjOuniCBJROyeheuLiOuLpCcpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdGhlbWUgPSB0aGVtZXMuZmluZCh0aGVtZSA9PiB0aGVtZS5pZCA9PT0gaWQpO1xuICAgICAgICAgICAgaWYgKCF0aGVtZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihg7YWM66eI66W8IOywvuydhCDsiJgg7JeG7J2MOiAke2lkfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoZW1lO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihg7YWM66eIIOqygOyDiSDspJEg7Jik66WYIChJRDogJHtpZH0pOmAsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0QWxsVGhlbWVzKCkge1xuICAgICAgICAvLyDthYzrp4gg67Cw7Je07J2YIOuzteyCrOuzuCDrsJjtmZhcbiAgICAgICAgcmV0dXJuIFsuLi50aGVtZXNdO1xuICAgIH1cbiAgICAvLyBDU1Mg7Iqk7YOA7J28IOuzgOyImCDsg53shLFcbiAgICBnZW5lcmF0ZUNTU1ZhcmlhYmxlcyh0aGVtZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF0aGVtZSB8fCAhdGhlbWUuc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign7Jyg7Zqo7ZWY7KeAIOyViuydgCDthYzrp4gg642w7J207YSwJyk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfsnKDtmqjtlZjsp4Ag7JWK7J2AIO2FjOuniCDrjbDsnbTthLAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgc3R5bGVzIH0gPSB0aGVtZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDU1Mg67OA7IiYIOyDneyEsTonLCB0aGVtZS5pZCk7XG4gICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICA6cm9vdCB7XG4gICAgICAgICAgLS10aGVtZS1iYWNrZ3JvdW5kOiAke3N0eWxlcy5iYWNrZ3JvdW5kQ29sb3J9O1xuICAgICAgICAgIC0tdGhlbWUtdGV4dDogJHtzdHlsZXMudGV4dENvbG9yfTtcbiAgICAgICAgICAtLXRoZW1lLWJ1dHRvbjogJHtzdHlsZXMuYnV0dG9uQ29sb3J9O1xuICAgICAgICAgIC0tdGhlbWUtZGlzcGxheTogJHtzdHlsZXMuZGlzcGxheUNvbG9yfTtcbiAgICAgICAgICAtLXRoZW1lLWRpc3BsYXktdGV4dDogJHtzdHlsZXMuZGlzcGxheVRleHRDb2xvcn07XG4gICAgICAgICAgLS10aGVtZS1hY2NlbnQ6ICR7c3R5bGVzLmFjY2VudENvbG9yfTtcbiAgICAgICAgICAtLXRoZW1lLXJhZGl1czogJHtzdHlsZXMuYm9yZGVyUmFkaXVzfTtcbiAgICAgICAgfVxuICAgICAgYDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NTUyDrs4DsiJgg7IOd7ISxIOykkSDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8g7Jik66WYIOuwnOyDnSDsi5wg6riw67O4IENTUyDrs4DsiJgg67CY7ZmYXG4gICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICA6cm9vdCB7XG4gICAgICAgICAgLS10aGVtZS1iYWNrZ3JvdW5kOiAjRkZGRkZGO1xuICAgICAgICAgIC0tdGhlbWUtdGV4dDogIzAwMDAwMDtcbiAgICAgICAgICAtLXRoZW1lLWJ1dHRvbjogIzAwOTlGRjtcbiAgICAgICAgICAtLXRoZW1lLWRpc3BsYXk6ICNGNUY1RjU7XG4gICAgICAgICAgLS10aGVtZS1kaXNwbGF5LXRleHQ6ICMwMDAwMDA7XG4gICAgICAgICAgLS10aGVtZS1hY2NlbnQ6ICMwMDk5RkY7XG4gICAgICAgICAgLS10aGVtZS1yYWRpdXM6IDRweDtcbiAgICAgICAgfVxuICAgICAgYDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBGaWdtYSDrhbjrk5zsl5Ag7YWM66eIIOyKpO2DgOydvCDsoIHsmqlcbiAgICBhcHBseVRoZW1lVG9GaWdtYU5vZGUobm9kZSwgdGhlbWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+ycoO2aqO2VmOyngCDslYrsnYAgRmlnbWEg64W465OcJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGVtZSB8fCAhdGhlbWUuc3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign7Jyg7Zqo7ZWY7KeAIOyViuydgCDthYzrp4gg642w7J207YSwJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeyBzdHlsZXMgfSA9IHRoZW1lO1xuICAgICAgICAgICAgLy8g67Cw6rK97IOJIOyggeyaqVxuICAgICAgICAgICAgbm9kZS5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdTT0xJRCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGlzLmhleFRvUkdCKHN0eWxlcy5iYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAvLyDthYzrkZDrpqwg7KCB7JqpXG4gICAgICAgICAgICBub2RlLnN0cm9rZXMgPSBbe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnU09MSUQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhpcy5oZXhUb1JHQihzdHlsZXMudGV4dENvbG9yKVxuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgLy8g65287Jq065OcIOy9lOuEiCDsoIHsmqlcbiAgICAgICAgICAgIG5vZGUuY29ybmVyUmFkaXVzID0gcGFyc2VJbnQoc3R5bGVzLmJvcmRlclJhZGl1cykgfHwgNDtcbiAgICAgICAgICAgIC8vIO2FjOuniCDsoJXrs7Qg7KCA7J6lXG4gICAgICAgICAgICBub2RlLnNldFBsdWdpbkRhdGEoJ3RoZW1lSWQnLCB0aGVtZS5pZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg7YWM66eIICR7dGhlbWUuaWR96rCAIEZpZ21hIOuFuOuTnOyXkCDsoIHsmqnrkKhgKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZpZ21hIOuFuOuTnOyXkCDthYzrp4gg7KCB7JqpIOykkSDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIO2XrO2NvCDtlajsiJg6IEhFWCDsg4nsg4HsnYQgUkdCIOqwneyytOuhnCDrs4DtmZhcbiAgICBoZXhUb1JHQihoZXgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICghaGV4IHx8IHR5cGVvZiBoZXggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfsnKDtmqjtlZjsp4Ag7JWK7J2AIEhFWCDsg4nsg4Eg6rCSJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAjIOq4sO2YuCDsoJzqsbBcbiAgICAgICAgICAgIGhleCA9IGhleC5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICAgICAgaWYgKCEvXlswLTlBLUZhLWZdezZ9JC8udGVzdChoZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfsnKDtmqjtlZjsp4Ag7JWK7J2AIEhFWCDtmJXsi50nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJHQiDqsJIg7LaU7LacXG4gICAgICAgICAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpIC8gMjU1O1xuICAgICAgICAgICAgY29uc3QgZyA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KSAvIDI1NTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNikgLyAyNTU7XG4gICAgICAgICAgICByZXR1cm4geyByLCBnLCBiIH07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdIRVggdG8gUkdCIOuzgO2ZmCDspJEg7Jik66WYOicsIGVycm9yKTtcbiAgICAgICAgICAgIC8vIOyYpOulmCDsi5wg6rKA7J2A7IOJIOuwmO2ZmFxuICAgICAgICAgICAgcmV0dXJuIHsgcjogMCwgZzogMCwgYjogMCB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5leHBvcnQgY2xhc3MgVHJhY2tTZXJ2aWNlIHtcbiAgICAvLyDsi7HquIDthqQg7Yyo7YS07Jy866GcIOq1rO2YhFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnRyYWNrQ2FjaGUgPSBuZXcgTWFwKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUcmFja1NlcnZpY2Ug7LSI6riw7ZmUJyk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKCFUcmFja1NlcnZpY2UuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIFRyYWNrU2VydmljZS5pbnN0YW5jZSA9IG5ldyBUcmFja1NlcnZpY2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVHJhY2tTZXJ2aWNlLmluc3RhbmNlO1xuICAgIH1cbiAgICAvLyDrr7jrpqwg7KCV7J2Y65CcIO2KuOuemSDrqqnroZ1cbiAgICBnZXRQcmVkZWZpbmVkVHJhY2tzKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+uvuOumrCDsoJXsnZjrkJwg7Yq4656ZIOuqqeuhnSDqsIDsoLjsmKTquLAnKTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrcyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk9QLTEgRmllbGQgQW1iaWVudCBTZXNzaW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGFydGlzdDogXCJSZWQgTWVhbnMgUmVjb3JkaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCJodHRwczovL3NvdW5kY2xvdWQuY29tL3NvdW5kc2dvb2Rfc3RvcmUvbW9uZGF5LW1peC1zZ21tMTE5LWxvdmVmb29sP2luX3N5c3RlbV9wbGF5bGlzdD1hcnRpc3Qtc3RhdGlvbnMlM0E1MTY2NDQ2MjJcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVFgtNiArIE9QLTEgRmllbGQgSmFtXCIsXG4gICAgICAgICAgICAgICAgICAgIGFydGlzdDogXCJIQUlOQkFDSFwiLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9ldW5hMzRldmVyeXdoZXJlL3N1bnNob3dlcj9pbl9zeXN0ZW1fcGxheWxpc3Q9eW91ci1tb29kcyUzQTMzMTExMzQlM0EyXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVQLTEzMyBGaXJzdCBJbXByZXNzaW9uc1wiLFxuICAgICAgICAgICAgICAgICAgICBhcnRpc3Q6IFwiUmVkIE1lYW5zIFJlY29yZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS91c2VyLTE5MDY4NzQ2MC9zdW5kYXk/aW5fc3lzdGVtX3BsYXlsaXN0PXlvdXItbW9vZHMlM0EzMzExMTM0JTNBMlwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYO2KuOuemSDrqqnroZ0g67CY7ZmYOiAke3RyYWNrcy5sZW5ndGh96rCcIO2KuOuemWApO1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrcztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+2KuOuemSDrqqnroZ0g6rCA7KC47Jik6riwIOyYpOulmDonLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gW107IC8vIOyYpOulmCDsi5wg67mIIOuwsOyXtCDrsJjtmZhcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDtirjrnpkg66mU7YOA642w7J207YSwIOqwgOyguOyYpOq4sFxuICAgIGdldFRyYWNrTWV0YWRhdGEodXJsKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign7Jyg7Zqo7ZWY7KeAIOyViuydgCBVUkwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYO2KuOuemSDrqZTtg4DrjbDsnbTthLAg7JqU7LKtOiAke3VybH1gKTtcbiAgICAgICAgICAgICAgICAvLyDsupDsi5zsl5Ag7J6I7Jy866m0IOy6kOyLnOyXkOyEnCDqsIDsoLjsmKTquLBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFja0NhY2hlLmhhcyh1cmwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfsupDsi5zsl5DshJwg7Yq4656ZIOygleuztCDqsIDsoLjsmLQnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhY2tDYWNoZS5nZXQodXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU291bmRDbG91ZCBvRW1iZWQgQVBJ66GcIOygleuztCDqsIDsoLjsmKTquLBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU291bmRDbG91ZCBBUEkg7JqU7LKtIOyLnOyekScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYGh0dHBzOi8vc291bmRjbG91ZC5jb20vb2VtYmVkP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfSZmb3JtYXQ9anNvbmApO1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBUEkg7J2R64u1IOyYpOulmDogJHtyZXNwb25zZS5zdGF0dXN9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FQSSDsnZHri7Ug67Cb7J2MOicsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZGF0YS50aXRsZS5zcGxpdChcIiBieSBcIilbMF0gfHwgZGF0YS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgYXJ0aXN0OiBkYXRhLnRpdGxlLmluY2x1ZGVzKFwiIGJ5IFwiKSA/IGRhdGEudGl0bGUuc3BsaXQoXCIgYnkgXCIpWzFdIDogXCJVbmtub3duIEFydGlzdFwiLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgYXJ0d29yazogZGF0YS50aHVtYm5haWxfdXJsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyDsupDsi5zsl5Ag7KCA7J6lXG4gICAgICAgICAgICAgICAgdGhpcy50cmFja0NhY2hlLnNldCh1cmwsIHRyYWNrKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn7Yq4656ZIOygleuztCDsupDsi5zsl5Ag7KCA7J6l65CoJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign7Yq4656ZIOuplO2DgOuNsOydtO2EsCDqsIDsoLjsmKTquLAg7Iuk7YyoOicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAvLyDsl5Drn6wg7IOB7Zmp7JeQ7IScIOq4sOuzuCDsoJXrs7Qg67CY7ZmYXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiVW5rbm93biBUcmFja1wiLFxuICAgICAgICAgICAgICAgICAgICBhcnRpc3Q6IFwiVW5rbm93biBBcnRpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwgfHwgXCJodHRwczovL3NvdW5kY2xvdWQuY29tL1wiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIOy6kOyLnCDruYTsmrDquLBcbiAgICBjbGVhckNhY2hlKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy50cmFja0NhY2hlLmNsZWFyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn7Yq4656ZIOy6kOyLnCDruYTsm4AnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+y6kOyLnCDruYTsmrDquLAg7Jik66WYOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCB0aGVtZXMgPSBbXG4gICAge1xuICAgICAgICBpZDogXCJmcmFtZXItbWluaW1hbFwiLFxuICAgICAgICBuYW1lOiBcIkZyYW1lciBNaW5pbWFsXCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjMDA5OUZGXCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiI0Y1RjVGNVwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjMDA5OUZGXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTJweFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IFwiZnJhbWVyLWRhcmtcIixcbiAgICAgICAgbmFtZTogXCJGcmFtZXIgRGFya1wiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMUUxRTFFXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiI0ZGRkZGRlwiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzAwOTlGRlwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiMyRDJEMkRcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiI0ZGRkZGRlwiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiIzAwOTlGRlwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEycHhcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcInRlLW9wMVwiLFxuICAgICAgICBuYW1lOiBcIlRFIE9QLTFcIixcbiAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI0ZGQ0MwMFwiLFxuICAgICAgICAgICAgdGV4dENvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgIGRpc3BsYXlDb2xvcjogXCIjMTExMTExXCIsXG4gICAgICAgICAgICBkaXNwbGF5VGV4dENvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGFjY2VudENvbG9yOiBcIiNGRjAwMDBcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI0cHhcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcInRlLW9wMS1kYXJrXCIsXG4gICAgICAgIG5hbWU6IFwiVEUgT1AtMSBEYXJrXCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMyMjIyMjJcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjRkZDQzAwXCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjRkZDQzAwXCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjRkZDQzAwXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogXCJuZW8tbWludFwiLFxuICAgICAgICBuYW1lOiBcIk5lbyBNaW50XCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNCREVFRDBcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjMkEzQjQ3XCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjMENDMERGXCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiI0ZGRkZGRlwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjMkEzQjQ3XCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjRkY2Qjk1XCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTZweFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IFwidmFwb3Itd2F2ZVwiLFxuICAgICAgICBuYW1lOiBcIlZhcG9yIFdhdmVcIixcbiAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzEzMTM3N1wiLFxuICAgICAgICAgICAgdGV4dENvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiBcIiNGRjAwRkZcIixcbiAgICAgICAgICAgIGRpc3BsYXlDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBkaXNwbGF5VGV4dENvbG9yOiBcIiMwMEZGRkZcIixcbiAgICAgICAgICAgIGFjY2VudENvbG9yOiBcIiNGRjAwRkZcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIwcHhcIiAvLyBTaGFycCBjb3JuZXJzXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IFwiaXBvZC1jbGFzc2ljXCIsXG4gICAgICAgIG5hbWU6IFwiaVBvZCBDbGFzc2ljXCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNFQ0VDRUNcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjNkE2QTZBXCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiI0Q2RENFNFwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjMDA3QUZGXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogXCJtaW5pbWFsLXBsYXllclwiLFxuICAgICAgICBuYW1lOiBcIuuvuOuLiOupgCDtlIzroIjsnbTslrQgKOyVqOuylOyVhO2KuCDsl4bsnYwpXCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGOEY4RjhcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjMzMzMzMzXCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjNTU1NTU1XCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiI0ZGRkZGRlwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjMzMzMzMzXCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjNTU1NTU1XCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIgLy8g7LWc7IaM7ZWc7J2YIOuRpeq3vCDrqqjshJzrpqxcbiAgICAgICAgfVxuICAgIH1cbl07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFRoZW1lTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvdGhlbWVNYW5hZ2VyJztcbmltcG9ydCB7IFRyYWNrU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdHJhY2tTZXJ2aWNlJztcbi8vIOuUlOuyhOq3uCDsoJXrs7Qg66Gc6rmFXG5jb25zb2xlLmxvZygnJWMgRklYRUQgVkVSU0lPTiAxLjEuODogVUkg6rCc7ISgIOuwjyDthYzrp4gg7LaU6rCAJywgJ2JhY2tncm91bmQ6ICNGRjAwMDA7IGNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOiAyMHB4Jyk7XG4vLyDsoITsl60g6rCd7LK07JeQIO2BtOuemOyKpCDtlaDri7lcbndpbmRvdy5UaGVtZU1hbmFnZXIgPSBUaGVtZU1hbmFnZXI7XG53aW5kb3cuVHJhY2tTZXJ2aWNlID0gVHJhY2tTZXJ2aWNlO1xuLy8g7ZWY65Oc7L2U65Sp65CcIO2KuOuemSDrqqnroZ0gKOusuOygnOqwgCDsnojsnYQg6rK97JqwIOyngeygkSDsgqzsmqkpXG5jb25zdCBGQUxMQkFDS19UUkFDS1MgPSBbXG4gICAge1xuICAgICAgICB0aXRsZTogXCJPUC0xIEZpZWxkIEFtYmllbnQgU2Vzc2lvblwiLFxuICAgICAgICBhcnRpc3Q6IFwiUmVkIE1lYW5zIFJlY29yZGluZ1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS9zb3VuZHNnb29kX3N0b3JlL21vbmRheS1taXgtc2dtbTExOS1sb3ZlZm9vbFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0aXRsZTogXCJUWC02ICsgT1AtMSBGaWVsZCBKYW1cIixcbiAgICAgICAgYXJ0aXN0OiBcIkhBSU5CQUNIXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL3NvdW5kY2xvdWQuY29tL2V1bmEzNGV2ZXJ5d2hlcmUvc3Vuc2hvd2VyXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRpdGxlOiBcIkVQLTEzMyBGaXJzdCBJbXByZXNzaW9uc1wiLFxuICAgICAgICBhcnRpc3Q6IFwiUmVkIE1lYW5zIFJlY29yZGluZ1wiLFxuICAgICAgICB1cmw6IFwiaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS91c2VyLTE5MDY4NzQ2MC9zdW5kYXlcIixcbiAgICB9LFxuXTtcbi8vIO2VmOuTnOy9lOuUqeuQnCDthYzrp4gg66qp66GdICjrrLjsoJzqsIAg7J6I7J2EIOqyveyasCDsp4HsoJEg7IKs7JqpKVxuY29uc3QgRkFMTEJBQ0tfVEhFTUVTID0gW1xuICAgIHtcbiAgICAgICAgaWQ6IFwiZnJhbWVyLW1pbmltYWxcIixcbiAgICAgICAgbmFtZTogXCJGcmFtZXIgTWluaW1hbFwiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzAwOTlGRlwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiNGNUY1RjVcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiIzAwOTlGRlwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEycHhcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcImZyYW1lci1kYXJrXCIsXG4gICAgICAgIG5hbWU6IFwiRnJhbWVyIERhcmtcIixcbiAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzFFMUUxRVwiLFxuICAgICAgICAgICAgdGV4dENvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGJ1dHRvbkNvbG9yOiBcIiMwMDk5RkZcIixcbiAgICAgICAgICAgIGRpc3BsYXlDb2xvcjogXCIjMkQyRDJEXCIsXG4gICAgICAgICAgICBkaXNwbGF5VGV4dENvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGFjY2VudENvbG9yOiBcIiMwMDk5RkZcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMnB4XCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogXCJ0ZS1vcDFcIixcbiAgICAgICAgbmFtZTogXCJURSBPUC0xXCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGRkNDMDBcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiIzExMTExMVwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCJcbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogXCJ0ZS1vcDEtZGFya1wiLFxuICAgICAgICBuYW1lOiBcIlRFIE9QLTEgRGFya1wiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMjIyMjIyXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiI0ZGRkZGRlwiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiI0ZGQ0MwMFwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiI0ZGQ0MwMFwiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiI0ZGQ0MwMFwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6IFwibmVvLW1pbnRcIixcbiAgICAgICAgbmFtZTogXCJOZW8gTWludFwiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjQkRFRUQwXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiIzJBM0I0N1wiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzBDQzBERlwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiNGRkZGRkZcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiIzJBM0I0N1wiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiI0ZGNkI5NVwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjE2cHhcIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcInZhcG9yLXdhdmVcIixcbiAgICAgICAgbmFtZTogXCJWYXBvciBXYXZlXCIsXG4gICAgICAgIHN0eWxlczoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMxMzEzNzdcIixcbiAgICAgICAgICAgIHRleHRDb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgICAgICBidXR0b25Db2xvcjogXCIjRkYwMEZGXCIsXG4gICAgICAgICAgICBkaXNwbGF5Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgZGlzcGxheVRleHRDb2xvcjogXCIjMDBGRkZGXCIsXG4gICAgICAgICAgICBhY2NlbnRDb2xvcjogXCIjRkYwMEZGXCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMHB4XCIgLy8gU2hhcnAgY29ybmVyc1xuICAgICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiBcImlwb2QtY2xhc3NpY1wiLFxuICAgICAgICBuYW1lOiBcImlQb2QgQ2xhc3NpY1wiLFxuICAgICAgICBzdHlsZXM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRUNFQ0VDXCIsXG4gICAgICAgICAgICB0ZXh0Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgYnV0dG9uQ29sb3I6IFwiIzZBNkE2QVwiLFxuICAgICAgICAgICAgZGlzcGxheUNvbG9yOiBcIiNENkRDRTRcIixcbiAgICAgICAgICAgIGRpc3BsYXlUZXh0Q29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IFwiIzAwN0FGRlwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiXG4gICAgICAgIH1cbiAgICB9XG5dO1xuY2xhc3MgUGxheWVyVUkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyBET00g7JqU7IaMXG4gICAgICAgIHRoaXMudHJhY2tMaXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY0lmcmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldmlld0NvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldmlld1RpdGxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2aWV3QXJ0aXN0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0dXNEb3QgPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXlJY29uID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXVzZUljb24gPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXlQYXVzZUJ0biA9IG51bGw7XG4gICAgICAgIHRoaXMudGhlbWVTZWxlY3QgPSBudWxsO1xuICAgICAgICB0aGlzLmluc2VydEJ1dHRvbiA9IG51bGw7XG4gICAgICAgIC8vIOyDge2DnFxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJhY2sgPSBudWxsO1xuICAgICAgICB0aGlzLnNjUGxheWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8g66+466asIOygleydmOuQnCDtirjrnpnqs7wg7YWM66eIIOuqqeuhnVxuICAgICAgICB0aGlzLnByZWRlZmluZWRUcmFja3MgPSBbXTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVUaGVtZXMgPSBbXTtcbiAgICAgICAgY29uc29sZS5sb2coJ1BsYXllclVJIOy0iOq4sO2ZlCDsi5zsnpEnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOyEnOu5hOyKpCDsnbjsiqTthLTsiqQg7LSI6riw7ZmUXG4gICAgICAgICAgICB0aGlzLnRoZW1lTWFuYWdlciA9IFRoZW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAgICAgdGhpcy50cmFja1NlcnZpY2UgPSBUcmFja1NlcnZpY2UuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgICAgIC8vIO2KuOuemSDrsI8g7YWM66eIIOuNsOydtO2EsCDstIjquLDtmZRcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgICAgIC8vIOq4sOuzuCDthYzrp4gg7ISk7KCVXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZSA9IHRoaXMuYXZhaWxhYmxlVGhlbWVzWzBdO1xuICAgICAgICAgICAgLy8gRE9NIOuhnOuTnCDtmZXsnbhcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdGhpcy5vbkRvbUxvYWRlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRE9NIOuhnOuUqSDspJEsIERPTUNvbnRlbnRMb2FkZWQg7J2067Kk7Yq4IOumrOyKpOuEiCDrk7HroZ0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25Eb21Mb2FkZWQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRE9NIOydtOuvuCDroZzrk5zrkKgsIOy0iOq4sO2ZlCDsp4TtloknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsYXllclVJIOy0iOq4sO2ZlCDspJEg7Jik66WYIOuwnOyDnTonLCBlcnJvcik7XG4gICAgICAgICAgICB0aGlzLmxvZ0Vycm9yKCfstIjquLDtmZQg7Jik66WYJywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxvZ0Vycm9yKGNvbnRleHQsIGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFske2NvbnRleHR9XTpgLCBlcnJvcik7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhbGVydChgJHtjb250ZXh0fTogJHtlcnJvci5tZXNzYWdlIHx8ICfslYwg7IiYIOyXhuuKlCDsmKTrpZgnfWApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyDslYzrprwg7ZGc7IucIOykkSDsmKTrpZgg67Cc7IOdIOyLnCDrrLTsi5xcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIO2KuOuemSDrqqnroZ0g6rCA7KC47Jik6riwXG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlVHJhY2tzID0gdGhpcy50cmFja1NlcnZpY2UuZ2V0UHJlZGVmaW5lZFRyYWNrcygpO1xuICAgICAgICAgICAgLy8g7Yq4656ZIOuqqeuhneydtCDruYTslrTsnojqsbDrgpgg7Jik66WY6rCAIOyeiOycvOuptCBmYWxsYmFjayDsgqzsmqlcbiAgICAgICAgICAgIHRoaXMucHJlZGVmaW5lZFRyYWNrcyA9IHNlcnZpY2VUcmFja3MgJiYgc2VydmljZVRyYWNrcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyBzZXJ2aWNlVHJhY2tzXG4gICAgICAgICAgICAgICAgOiBGQUxMQkFDS19UUkFDS1M7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg7Yq4656ZIOuqqeuhnSDstIjquLDtmZQ6ICR7dGhpcy5wcmVkZWZpbmVkVHJhY2tzLmxlbmd0aH3qsJwg7Yq4656ZYCk7XG4gICAgICAgICAgICAvLyDthYzrp4gg66qp66GdIOqwgOyguOyYpOq4sFxuICAgICAgICAgICAgY29uc3Qgc2VydmljZVRoZW1lcyA9IHRoaXMudGhlbWVNYW5hZ2VyLmdldEFsbFRoZW1lcygpO1xuICAgICAgICAgICAgLy8g7YWM66eIIOuqqeuhneydtCDruYTslrTsnojqsbDrgpgg7Jik66WY6rCAIOyeiOycvOuptCBmYWxsYmFjayDsgqzsmqlcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlVGhlbWVzID0gc2VydmljZVRoZW1lcyAmJiBzZXJ2aWNlVGhlbWVzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICA/IHNlcnZpY2VUaGVtZXNcbiAgICAgICAgICAgICAgICA6IEZBTExCQUNLX1RIRU1FUztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDthYzrp4gg66qp66GdIOy0iOq4sO2ZlDogJHt0aGlzLmF2YWlsYWJsZVRoZW1lcy5sZW5ndGh96rCcIO2FjOuniGApO1xuICAgICAgICAgICAgLy8g7LKrIOuyiOynuCDthYzrp4jrpbwg6riw67O46rCS7Jy866GcIOyEpOyglVxuICAgICAgICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlVGhlbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUaGVtZSA9IHRoaXMuYXZhaWxhYmxlVGhlbWVzWzBdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDquLDrs7gg7YWM66eIIOyEpOyglTogJHt0aGlzLmN1cnJlbnRUaGVtZS5uYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign7YWM66eIIOuqqeuhneydtCDruYTslrQg7J6I7J2MLiDquLDrs7gg7YWM66eI66W8IOyEpOygle2VoCDsiJgg7JeG7J2MJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfrjbDsnbTthLAg7LSI6riw7ZmUIOykkSDsmKTrpZgg67Cc7IOdOicsIGVycm9yKTtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrIOuNsOydtO2EsCDsgqzsmqlcbiAgICAgICAgICAgIHRoaXMucHJlZGVmaW5lZFRyYWNrcyA9IEZBTExCQUNLX1RSQUNLUztcbiAgICAgICAgICAgIHRoaXMuYXZhaWxhYmxlVGhlbWVzID0gRkFMTEJBQ0tfVEhFTUVTO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGhlbWUgPSBGQUxMQkFDS19USEVNRVNbMF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Eb21Mb2FkZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdET00g66Gc65OcIOyZhOujjCwgVUkg7LSI6riw7ZmUIOyLnOyekScpO1xuICAgICAgICAvLyBET00g7JqU7IaMIOy0iOq4sO2ZlCDsoITsl5Ag7Ken7J2AIOyngOyXsCDstpTqsIBcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVSSDstIjquLDtmZQg7Iuc7J6RJyk7XG4gICAgICAgICAgICAvLyBET00g7JqU7IaMIOqwgOyguOyYpOq4sFxuICAgICAgICAgICAgdGhpcy5pbml0RG9tRWxlbWVudHMoKTtcbiAgICAgICAgICAgIC8vIFVJIOq1rOyEseyalOyGjCDstIjquLDtmZRcbiAgICAgICAgICAgIHRoaXMuYXBwbHlUaGVtZVRvVUkodGhpcy5jdXJyZW50VGhlbWUpO1xuICAgICAgICAgICAgdGhpcy5pbml0VGhlbWVTZWxlY3REcm9wZG93bigpO1xuICAgICAgICAgICAgdGhpcy5zZXR1cEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlUcmFja3MoKTtcbiAgICAgICAgICAgIC8vIFNvdW5kQ2xvdWQgV2lkZ2V0IEFQSSDroZzrk5xcbiAgICAgICAgICAgIHRoaXMubG9hZFNvdW5kQ2xvdWRBUEkoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVSSDstIjquLDtmZQg7JmE66OMJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVSSDstIjquLDtmZQg7KSRIOyYpOulmCDrsJzsg506JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5sb2dFcnJvcignVUkg7LSI6riw7ZmUIOyYpOulmCcsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0RG9tRWxlbWVudHMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdET00g7JqU7IaMIOqwgOyguOyYpOq4sCcpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8g6riw67O4IOyalOyGjCDqsIDsoLjsmKTquLBcbiAgICAgICAgICAgIHRoaXMudHJhY2tMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWNrLWxpc3QnKTtcbiAgICAgICAgICAgIHRoaXMudGhlbWVTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWUtc2VsZWN0Jyk7XG4gICAgICAgICAgICB0aGlzLmluc2VydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnNlcnQtYnV0dG9uJyk7XG4gICAgICAgICAgICAvLyDquLDrs7gg7JqU7IaMIO2ZleyduFxuICAgICAgICAgICAgaWYgKCF0aGlzLnRyYWNrTGlzdCB8fCAhdGhpcy50aGVtZVNlbGVjdCB8fCAhdGhpcy5pbnNlcnRCdXR0b24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nID0gW107XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRyYWNrTGlzdClcbiAgICAgICAgICAgICAgICAgICAgbWlzc2luZy5wdXNoKCd0cmFjay1saXN0Jyk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRoZW1lU2VsZWN0KVxuICAgICAgICAgICAgICAgICAgICBtaXNzaW5nLnB1c2goJ3RoZW1lLXNlbGVjdCcpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbnNlcnRCdXR0b24pXG4gICAgICAgICAgICAgICAgICAgIG1pc3NpbmcucHVzaCgnaW5zZXJ0LWJ1dHRvbicpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdTdHIgPSBtaXNzaW5nLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihg7ZWE7IiYIERPTSDsmpTshozrpbwg7LC+7J2EIOyImCDsl4bsnYw6ICR7bWlzc2luZ1N0cn1gKTtcbiAgICAgICAgICAgICAgICAvLyDsmpTshozqsIAg7JeG64qUIOqyveyasCDsp4HsoJEg7IOd7ISxIOyLnOuPhFxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTWlzc2luZ0VsZW1lbnRzKG1pc3NpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g6riw7YOAIOyalOyGjCDqsIDsoLjsmKTquLBcbiAgICAgICAgICAgIHRoaXMuc2NJZnJhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2MtaWZyYW1lJyk7XG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldmlldy1jb250YWluZXInKTtcbiAgICAgICAgICAgIHRoaXMucHJldmlld1RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXctdGl0bGUnKTtcbiAgICAgICAgICAgIHRoaXMucHJldmlld0FydGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aWV3LWFydGlzdCcpO1xuICAgICAgICAgICAgdGhpcy5zdGF0dXNEb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzLWRvdCcpO1xuICAgICAgICAgICAgdGhpcy5wbGF5SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWljb24nKTtcbiAgICAgICAgICAgIHRoaXMucGF1c2VJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhdXNlLWljb24nKTtcbiAgICAgICAgICAgIHRoaXMucGxheVBhdXNlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktcGF1c2UtYnRuJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRE9NIOyalOyGjCDqsIDsoLjsmKTquLAg7JmE66OMJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdET00g7JqU7IaMIOqwgOyguOyYpOq4sCDsi6TtjKg6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBET00g7JqU7IaMIOy0iOq4sO2ZlCDsmKTrpZg6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDriITrnb3rkJwg7ZWE7IiYIOyalOyGjOulvCDsp4HsoJEg7IOd7ISxXG4gICAgY3JlYXRlTWlzc2luZ0VsZW1lbnRzKG1pc3NpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+uIhOudveuQnCBET00g7JqU7IaMIOyDneyEsSDsi5zrj4Q6JywgbWlzc2luZyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXInKSB8fCBkb2N1bWVudC5ib2R5O1xuICAgICAgICBpZiAobWlzc2luZy5pbmNsdWRlcygndGhlbWUtc2VsZWN0JykgJiYgIXRoaXMudGhlbWVTZWxlY3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGVtZS1zZWxlY3Qg7JqU7IaMIOyDneyEsScpO1xuICAgICAgICAgICAgY29uc3QgdGhlbWVTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGVtZVNlY3Rpb24uY2xhc3NOYW1lID0gJ3RoZW1lLXNlbGVjdG9yJztcbiAgICAgICAgICAgIHRoZW1lU2VjdGlvbi5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxsYWJlbCBmb3I9XCJ0aGVtZS1zZWxlY3RcIiBjbGFzcz1cInBsYXlsaXN0LXRpdGxlXCI+U2VsZWN0IFRoZW1lPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBpZD1cInRoZW1lLXNlbGVjdFwiPjwvc2VsZWN0PlxuICAgICAgYDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGVtZVNlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy50aGVtZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZS1zZWxlY3QnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWlzc2luZy5pbmNsdWRlcygndHJhY2stbGlzdCcpICYmICF0aGlzLnRyYWNrTGlzdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyYWNrLWxpc3Qg7JqU7IaMIOyDneyEsScpO1xuICAgICAgICAgICAgY29uc3QgdHJhY2tTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0cmFja1NlY3Rpb24uY2xhc3NOYW1lID0gJ3BsYXlsaXN0LWNvbnRhaW5lcic7XG4gICAgICAgICAgICB0cmFja1NlY3Rpb24uaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicGxheWxpc3QtdGl0bGVcIj5TZWxlY3QgVHJhY2s8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWxpc3RcIiBpZD1cInRyYWNrLWxpc3RcIj48L2Rpdj5cbiAgICAgIGA7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodHJhY2tTZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMudHJhY2tMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWNrLWxpc3QnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWlzc2luZy5pbmNsdWRlcygnaW5zZXJ0LWJ1dHRvbicpICYmICF0aGlzLmluc2VydEJ1dHRvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2luc2VydC1idXR0b24g7JqU7IaMIOyDneyEsScpO1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBidXR0b24uaWQgPSAnaW5zZXJ0LWJ1dHRvbic7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NOYW1lID0gJ2luc2VydC1idXR0b24nO1xuICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gJ0luc2VydCBQbGF5ZXInO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgICAgICB0aGlzLmluc2VydEJ1dHRvbiA9IGJ1dHRvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkU291bmRDbG91ZEFQSSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NvdW5kQ2xvdWQgQVBJIOuhnOuTnCDsi5zsnpEnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOydtOuvuCDroZzrk5zrkJwg6rK97JqwIOyKpO2CtVxuICAgICAgICAgICAgaWYgKHdpbmRvdy5TQyAmJiB3aW5kb3cuU0MuV2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NvdW5kQ2xvdWQgQVBJIOydtOuvuCDroZzrk5zrkKgnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzY1dpZGdldFNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgc2NXaWRnZXRTY3JpcHQuc3JjID0gJ2h0dHBzOi8vdy5zb3VuZGNsb3VkLmNvbS9wbGF5ZXIvYXBpLmpzJztcbiAgICAgICAgICAgIC8vIEFQSSDroZzrk5wg7JmE66OMIOydtOuypO2KuFxuICAgICAgICAgICAgc2NXaWRnZXRTY3JpcHQub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb3VuZENsb3VkIEFQSSDroZzrk5wg7JmE66OMJyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2NXaWRnZXRTY3JpcHQub25lcnJvciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignU291bmRDbG91ZCBBUEkg66Gc65OcIOyLpO2MqDonLCBlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjV2lkZ2V0U2NyaXB0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvdW5kQ2xvdWQgQVBJIOuhnOuTnCDspJEg7Jik66WYIOuwnOyDnTonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdFRoZW1lU2VsZWN0RHJvcGRvd24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfthYzrp4gg7ISg7YOdIOuTnOuhreuLpOyatCDstIjquLDtmZQnKTtcbiAgICAgICAgaWYgKCF0aGlzLnRoZW1lU2VsZWN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfthYzrp4gg7ISg7YOdIOyalOyGjOqwgCDsl4bslrQg65Oc66Gt64uk7Jq07J2EIOy0iOq4sO2ZlO2VoCDsiJgg7JeG7J2MJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOq4sOyhtCDsmLXshZgg66qo65GQIOygnOqxsFxuICAgICAgICAgICAgdGhpcy50aGVtZVNlbGVjdC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIC8vIO2FjOuniCDsmLXshZgg7LaU6rCAXG4gICAgICAgICAgICB0aGlzLmF2YWlsYWJsZVRoZW1lcy5mb3JFYWNoKHRoZW1lID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWUgPSB0aGVtZS5pZDtcbiAgICAgICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSB0aGVtZS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMudGhlbWVTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg7YWM66eIIOyYteyFmCDstpTqsIA6ICR7dGhlbWUubmFtZX1gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8g7ZiE7J6sIO2FjOuniCDshKDtg51cbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRUaGVtZSAmJiB0aGlzLmN1cnJlbnRUaGVtZS5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGhlbWVTZWxlY3QudmFsdWUgPSB0aGlzLmN1cnJlbnRUaGVtZS5pZDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg7ZiE7J6sIOyEoO2DneuQnCDthYzrp4g6ICR7dGhpcy5jdXJyZW50VGhlbWUubmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfthYzrp4gg7ISg7YOdIOuTnOuhreuLpOyatCDstIjquLDtmZQg7JmE66OMJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfthYzrp4gg65Oc66Gt64uk7Jq0IOy0iOq4sO2ZlCDspJEg7Jik66WYOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXR1cEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zb2xlLmxvZygn7J2067Kk7Yq4IOumrOyKpOuEiCDshKTsoJUnKTtcbiAgICAgICAgLy8g7YWM66eIIOyEoO2DnSDsnbTrsqTtirhcbiAgICAgICAgaWYgKHRoaXMudGhlbWVTZWxlY3QpIHtcbiAgICAgICAgICAgIC8vIOydtOuypO2KuCDrpqzsiqTrhIgg7KSR67O1IOuwqeyngFxuICAgICAgICAgICAgY29uc3QgdGhlbWVDaGFuZ2VIYW5kbGVyID0gdGhpcy5vblRoZW1lQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnRoZW1lU2VsZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoZW1lQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLnRoZW1lU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoZW1lQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn7YWM66eIIOyEoO2DnSDsnbTrsqTtirgg66as7Iqk64SIIOuTseuhneuQqCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOyCveyehSDrsoTtirwg7J2067Kk7Yq4XG4gICAgICAgIGlmICh0aGlzLmluc2VydEJ1dHRvbikge1xuICAgICAgICAgICAgY29uc3QgaW5zZXJ0SGFuZGxlciA9IHRoaXMuaW5zZXJ0UGxheWVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmluc2VydEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGluc2VydEhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbnNlcnRIYW5kbGVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfsgr3snoUg67KE7Yq8IOydtOuypO2KuCDrpqzsiqTrhIgg65Ox66Gd65CoJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g7J6s7IOdL+ydvOyLnOygleyngCDrsoTtirwg7J2067Kk7Yq4XG4gICAgICAgIGlmICh0aGlzLnBsYXlQYXVzZUJ0bikge1xuICAgICAgICAgICAgY29uc3QgdG9nZ2xlSGFuZGxlciA9IHRoaXMudG9nZ2xlUGxheWJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGxheVBhdXNlQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlSGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLnBsYXlQYXVzZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUhhbmRsZXIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+yerOyDnS/snbzsi5zsoJXsp4Ag67KE7Yq8IOydtOuypO2KuCDrpqzsiqTrhIgg65Ox66Gd65CoJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ+uqqOuToCDsnbTrsqTtirgg66as7Iqk64SIIOyEpOyglSDsmYTro4wnKTtcbiAgICB9XG4gICAgZGlzcGxheVRyYWNrcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyYWNrTGlzdCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigndHJhY2stbGlzdCDsmpTshozrpbwg7LC+7J2EIOyImCDsl4bslrQg7Yq4656Z7J2EIO2RnOyLnO2VoCDsiJgg7JeG7J2MJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnByZWRlZmluZWRUcmFja3MgfHwgdGhpcy5wcmVkZWZpbmVkVHJhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50cmFja0xpc3QuaW5uZXJIVE1MID0gJzxkaXYgc3R5bGU9XCJwYWRkaW5nOiAxMHB4OyBjb2xvcjogcmVkO1wiPk5vIHRyYWNrcyBhdmFpbGFibGU8L2Rpdj4nO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcign7Yq4656ZIOuqqeuhneydtCDruYTslrQg7J6I7J2MJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5wcmVkZWZpbmVkVHJhY2tzLmxlbmd0aH3qsJwg7Yq4656ZIO2RnOyLnCDsi5zsnpFgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIOq4sOyhtCDtirjrnpkg66qp66GdIOu5hOyasOq4sFxuICAgICAgICAgICAgdGhpcy50cmFja0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAvLyDtirjrnpkg66qp66GdIOyDneyEsVxuICAgICAgICAgICAgdGhpcy5wcmVkZWZpbmVkVHJhY2tzLmZvckVhY2goKHRyYWNrLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRyYWNrSXRlbS5jbGFzc05hbWUgPSAndHJhY2staXRlbSc7XG4gICAgICAgICAgICAgICAgdHJhY2tJdGVtLmlkID0gYHRyYWNrLSR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICAvLyDtirjrnpkg7ZWt66qpIOuCtOyaqSDshKTsoJVcbiAgICAgICAgICAgICAgICB0cmFja0l0ZW0uaW5uZXJIVE1MID0gYFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1pbmZvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stdGl0bGVcIj4ke3RyYWNrLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWFydGlzdFwiPiR7dHJhY2suYXJ0aXN0fTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgICAgICAgICAgICAgIC8vIO2BtOumrSDsnbTrsqTtirgg7LaU6rCAXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2tDbGlja0hhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDtirjrnpkg7ISg7YOdOiAke3RyYWNrLnRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRyYWNrKHRyYWNrLCB0cmFja0l0ZW0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdHJhY2tJdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJhY2tDbGlja0hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHRyYWNrSXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRyYWNrQ2xpY2tIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAvLyDrqqnroZ3sl5Ag7LaU6rCAXG4gICAgICAgICAgICAgICAgdGhpcy50cmFja0xpc3QuYXBwZW5kQ2hpbGQodHJhY2tJdGVtKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg7Yq4656ZIO2VreuqqSDstpTqsIA6ICR7dHJhY2sudGl0bGV9YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCftirjrnpkg66qp66GdIO2RnOyLnCDsmYTro4wnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+2KuOuemSDtkZzsi5wg7KSRIOyYpOulmCDrsJzsg506JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy50cmFja0xpc3QuaW5uZXJIVE1MID0gYDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAxMHB4OyBjb2xvcjogcmVkO1wiPkVycm9yOiAke2Vycm9yLm1lc3NhZ2V9PC9kaXY+YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RUcmFjayh0cmFjaywgZWxlbWVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhg7Yq4656ZIOyEoO2DnTogJHt0cmFjay50aXRsZX1gKTtcbiAgICAgICAgLy8gU3RvcmUgb3JpZ2luYWwgSFRNTCBvdXRzaWRlIHRyeS9jYXRjaCBmb3IgZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxIVE1MID0gZWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVHJhY2sgPSB0cmFjaztcbiAgICAgICAgICAgIC8vIOuhnOuUqSDsg4Htg5wg7ZGc7IucXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2staW5mb1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay10aXRsZVwiPuuhnOuUqSDspJEuLi48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stYXJ0aXN0XCI+JHt0cmFjay5hcnRpc3R9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYDtcbiAgICAgICAgICAgIC8vIO2KuOuemSDtla3rqqkg7Iqk7YOA7J28IOyXheuNsOydtO2KuFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRyYWNrLWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgLy8g66+466as67O06riwIO2RnOyLnFxuICAgICAgICAgICAgaWYgKHRoaXMucHJldmlld0NvbnRhaW5lciAmJiB0aGlzLnByZXZpZXdUaXRsZSAmJiB0aGlzLnByZXZpZXdBcnRpc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3VGl0bGUudGV4dENvbnRlbnQgPSB0cmFjay50aXRsZTtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdBcnRpc3QudGV4dENvbnRlbnQgPSB0cmFjay5hcnRpc3Q7XG4gICAgICAgICAgICAgICAgLy8gaWZyYW1lIFVSTCDshKTsoJVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY0lmcmFtZSAmJiB0aGlzLmN1cnJlbnRUaGVtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IHRoaXMuY3VycmVudFRoZW1lLnN0eWxlcy5hY2NlbnRDb2xvci5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjSWZyYW1lLnNyYyA9IGBodHRwczovL3cuc291bmRjbG91ZC5jb20vcGxheWVyLz91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodHJhY2sudXJsKX0mY29sb3I9JHtjb2xvcn0mYXV0b19wbGF5PXRydWUmaGlkZV9yZWxhdGVkPXRydWUmc2hvd19jb21tZW50cz1mYWxzZSZzaG93X3VzZXI9dHJ1ZSZzaG93X3JlcG9zdHM9ZmFsc2Umc2hvd190ZWFzZXI9ZmFsc2VgO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaWZyYW1lIFVSTCDshKTsoJUg7JmE66OMJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIO2UjOugiOydtOyWtCDstIjquLDtmZRcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRTb3VuZENsb3VkUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDroZzrlKkg7IOB7YOcIOygnOqxsCDrsI8g7JuQ656YIOuCtOyaqSDrs7Xsm5BcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBvcmlnaW5hbEhUTUw7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDshLHqs7Ug7JWM66a8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dUb2FzdChg7J6s7IOdIOykkTogJHt0cmFjay50aXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g7IK97J6FIOuyhO2KvCDtmZzshLHtmZRcbiAgICAgICAgICAgIGlmICh0aGlzLmluc2VydEJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCftirjrnpkg7ISg7YOdIOykkSDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICAgICAgLy8g7Jik66WYIOuwnOyDnSDsi5wg7JuQ656YIOuCtOyaqSDrs7Xsm5BcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBvcmlnaW5hbEhUTUwgfHwgYFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1pbmZvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stdGl0bGVcIj4ke3RyYWNrLnRpdGxlfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYWNrLWFydGlzdFwiPiR7dHJhY2suYXJ0aXN0fTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g7Jik66WYIOyVjOumvFxuICAgICAgICAgICAgdGhpcy5zaG93VG9hc3QoYOyYpOulmCDrsJzsg506ICR7ZXJyb3IubWVzc2FnZX1gLCAzMDAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0U291bmRDbG91ZFBsYXllcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjSWZyYW1lIHx8ICF3aW5kb3cuU0MgfHwgIXdpbmRvdy5TQy5XaWRnZXQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignU291bmRDbG91ZCBXaWRnZXQgQVBJIOuYkOuKlCBpZnJhbWXsnbQg7KSA67mE65CY7KeAIOyViuydjCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyDsnbTsoIQg7ZSM66CI7J207Ja0IOygnOqxsFxuICAgICAgICAgICAgdGhpcy5zY1BsYXllciA9IG51bGw7XG4gICAgICAgICAgICAvLyDtlIzroIjsnbTslrQg7LSI6riw7ZmUIOuMgOq4sFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g7IOIIO2UjOugiOydtOyWtCDsg53shLFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY1BsYXllciA9IHdpbmRvdy5TQy5XaWRnZXQodGhpcy5zY0lmcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTb3VuZENsb3VkIO2UjOugiOydtOyWtCDsg53shLHrkKgnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8g7ZSM66CI7J207Ja0IOydtOuypO2KuCDrpqzsiqTrhIgg7ISk7KCVXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NQbGF5ZXIuYmluZCh3aW5kb3cuU0MuV2lkZ2V0LkV2ZW50cy5SRUFEWSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+2UjOugiOydtOyWtCDspIDruYQg7JmE66OMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDtlIzroIjsnbQg7Iuc7J6RXG4gICAgICAgICAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLnNjUGxheWVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5UGF1c2VVSSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g7J6s7IOdIOyDge2DnCDsnbTrsqTtirhcbiAgICAgICAgICAgICAgICAgICAgICAgIChfYiA9IHRoaXMuc2NQbGF5ZXIpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5iaW5kKHdpbmRvdy5TQy5XaWRnZXQuRXZlbnRzLlBMQVksICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5UGF1c2VVSSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoX2MgPSB0aGlzLnNjUGxheWVyKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuYmluZCh3aW5kb3cuU0MuV2lkZ2V0LkV2ZW50cy5QQVVTRSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5UGF1c2VVSSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAoX2QgPSB0aGlzLnNjUGxheWVyKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuYmluZCh3aW5kb3cuU0MuV2lkZ2V0LkV2ZW50cy5GSU5JU0gsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheVBhdXNlVUkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1NvdW5kQ2xvdWQg7ZSM66CI7J207Ja0IOy0iOq4sO2ZlCDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcign7ZSM66CI7J207Ja0IOy0iOq4sO2ZlCDspJEg7Jik66WYOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2dnbGVQbGF5YmFjaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjUGxheWVyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ+2UjOugiOydtOyWtOqwgCDsl4bslrTshJwg7J6s7IOdL+ydvOyLnOygleyngOulvCDtlaAg7IiYIOyXhuydjCcpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjUGxheWVyLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjUGxheWVyLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDsnqzsg50g7IOB7YOcIO2GoOq4gDogJHshdGhpcy5pc1BsYXlpbmcgPyAn7J6s7IOdJyA6ICfsnbzsi5zsoJXsp4AnfWApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcign7J6s7IOdL+ydvOyLnOygleyngCDspJEg7Jik66WYOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVQbGF5UGF1c2VVSSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlJY29uIHx8ICF0aGlzLnBhdXNlSWNvbiB8fCAhdGhpcy5zdGF0dXNEb3QpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8g7J6s7IOdL+ydvOyLnOygleyngCDslYTsnbTsvZgg7KCE7ZmYXG4gICAgICAgICAgICB0aGlzLnBsYXlJY29uLnN0eWxlLmRpc3BsYXkgPSB0aGlzLmlzUGxheWluZyA/ICdub25lJyA6ICdmbGV4JztcbiAgICAgICAgICAgIHRoaXMucGF1c2VJY29uLnN0eWxlLmRpc3BsYXkgPSB0aGlzLmlzUGxheWluZyA/ICdmbGV4JyA6ICdub25lJztcbiAgICAgICAgICAgIC8vIOyDge2DnCDtkZzsi5wg7JeF642w7J207Yq4XG4gICAgICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0RvdC5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0RvdC5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhg7J6s7IOdIFVJIOyXheuNsOydtO2KuDogJHt0aGlzLmlzUGxheWluZyA/ICfsnqzsg50g7KSRJyA6ICfsnbzsi5zsoJXsp4AnfWApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcign7J6s7IOdL+ydvOyLnOygleyngCBVSSDsl4XrjbDsnbTtirgg7KSRIOyYpOulmDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25UaGVtZUNoYW5nZShldmVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgY29uc3QgdGhlbWVJZCA9IHNlbGVjdC52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGDthYzrp4gg7ISg7YOdOiAke3RoZW1lSWR9YCk7XG4gICAgICAgICAgICAvLyDshKDtg53rkJwg7YWM66eIIOywvuq4sFxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRUaGVtZSA9IHRoaXMuYXZhaWxhYmxlVGhlbWVzLmZpbmQodGhlbWUgPT4gdGhlbWUuaWQgPT09IHRoZW1lSWQpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkVGhlbWUpIHtcbiAgICAgICAgICAgICAgICAvLyDthYzrp4gg67OA6rK9XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGhlbWUgPSBzZWxlY3RlZFRoZW1lO1xuICAgICAgICAgICAgICAgIC8vIFRoZW1lTWFuYWdlciDsl4XrjbDsnbTtirhcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lTWFuYWdlci5zZXRDdXJyZW50VGhlbWUoc2VsZWN0ZWRUaGVtZSk7XG4gICAgICAgICAgICAgICAgLy8gVUnsl5Ag7YWM66eIIOyggeyaqVxuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlUaGVtZVRvVUkoc2VsZWN0ZWRUaGVtZSk7XG4gICAgICAgICAgICAgICAgLy8g7ZS86re466eI7JeQIO2FjOuniCDrs4Dqsr0g66mU7Iuc7KeAIOyghOyGoVxuICAgICAgICAgICAgICAgIHBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpbk1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjaGFuZ2UtdGhlbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHNlbGVjdGVkVGhlbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sICcqJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYO2FjOuniCDrs4Dqsr0g7JmE66OMOiAke3NlbGVjdGVkVGhlbWUubmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihg7YWM66eI66W8IOywvuydhCDsiJgg7JeG7J2MOiAke3RoZW1lSWR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfthYzrp4gg67OA6rK9IOykkSDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGx5VGhlbWVUb1VJKHRoZW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVSeyXkCDthYzrp4gg7KCB7JqpOiAke3RoZW1lLm5hbWV9YCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyDthYzrp4gg7KCE7ZmYIOyVoOuLiOuplOydtOyFmFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCd0aGVtZS10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgeyBzdHlsZXMgfSA9IHRoZW1lO1xuICAgICAgICAgICAgLy8gQ1NTIOuzgOyImCDshKTsoJVcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tdGhlbWUtYmFja2dyb3VuZCcsIHN0eWxlcy5iYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10aGVtZS10ZXh0Jywgc3R5bGVzLnRleHRDb2xvcik7XG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXRoZW1lLWJ1dHRvbicsIHN0eWxlcy5idXR0b25Db2xvcik7XG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXRoZW1lLWRpc3BsYXknLCBzdHlsZXMuZGlzcGxheUNvbG9yKTtcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tdGhlbWUtZGlzcGxheS10ZXh0Jywgc3R5bGVzLmRpc3BsYXlUZXh0Q29sb3IpO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10aGVtZS1hY2NlbnQnLCBzdHlsZXMuYWNjZW50Q29sb3IpO1xuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10aGVtZS1yYWRpdXMnLCBzdHlsZXMuYm9yZGVyUmFkaXVzKTtcbiAgICAgICAgICAgIC8vIO2FjOuniCDrs4Dqsr0g7JWM66a8IO2RnOyLnFxuICAgICAgICAgICAgdGhpcy5zaG93VG9hc3QoYO2FjOuniCDrs4Dqsr06ICR7dGhlbWUubmFtZX1gKTtcbiAgICAgICAgICAgIC8vIO2FjOuniCDsoITtmZgg7YG0656Y7IqkIOygnOqxsFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCd0aGVtZS10cmFuc2l0aW9uJyk7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+2FjOuniCDsoIHsmqkg7JmE66OMJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfthYzrp4gg7KCB7JqpIOykkSDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIO2GoOyKpO2KuCDrqZTsi5zsp4Ag7ZGc7IucIOycoO2LuOumrO2LsCDrqZTshJzrk5xcbiAgICBzaG93VG9hc3QobWVzc2FnZSwgZHVyYXRpb24gPSAyMDAwKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyDquLDsobQg7Yag7Iqk7Yq4IOygnOqxsFxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUb2FzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbHVnaW4tdG9hc3QnKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1RvYXN0KSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdUb2FzdC5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOyDiCDthqDsiqTtirgg7IOd7ISxXG4gICAgICAgICAgICBjb25zdCB0b2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdG9hc3QuaWQgPSAncGx1Z2luLXRvYXN0JztcbiAgICAgICAgICAgIHRvYXN0LnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgYm90dG9tOiAyMHB4O1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGhlbWUtYnV0dG9uKTtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICBwYWRkaW5nOiA4cHggMTZweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGhlbWUtcmFkaXVzKTtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICBib3gtc2hhZG93OiAwIDNweCA2cHggcmdiYSgwLDAsMCwwLjIpO1xuICAgICAgICB6LWluZGV4OiAxMDA7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xuICAgICAgYDtcbiAgICAgICAgICAgIHRvYXN0LnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9hc3QpO1xuICAgICAgICAgICAgLy8g7Yag7Iqk7Yq4IO2RnOyLnFxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdG9hc3Quc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgIC8vIOyekOuPmSDsoJzqsbBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRvYXN0LnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRvYXN0LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfthqDsiqTtirgg7ZGc7IucIOykkSDsmKTrpZg6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluc2VydFBsYXllcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+2UjOugiOydtOyWtCDsgr3snoUg7Iuc64+EJyk7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZFRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dUb2FzdCgn7ZSM66CI7J207Ja066W8IOyCveyehe2VmOq4sCDsoITsl5Ag7Yq4656Z7J2EIOyEoO2Dne2VtOyjvOyEuOyalC4nLCAzMDAwKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybign7ISg7YOd65CcIO2KuOuemSDsl4bsnYwnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8g66Gc65SpIOyDge2DnCDtkZzsi5xcbiAgICAgICAgICAgIGlmICh0aGlzLmluc2VydEJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc2VydEJ0biA9IHRoaXMuaW5zZXJ0QnV0dG9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGluc2VydEJ0bi50ZXh0Q29udGVudCB8fCAnSW5zZXJ0IFBsYXllcic7XG4gICAgICAgICAgICAgICAgaW5zZXJ0QnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpbnNlcnRCdG4udGV4dENvbnRlbnQgPSAn7IK97J6FIOykkS4uLic7XG4gICAgICAgICAgICAgICAgLy8g7ZS86re466eI7JeQIOuplOyLnOyngCDsoITshqFcbiAgICAgICAgICAgICAgICBwYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5NZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5zZXJ0LXBsYXllcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjazogdGhpcy5zZWxlY3RlZFRyYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHRoaXMuY3VycmVudFRoZW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAnKicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDtlIzroIjsnbTslrQg7IK97J6FIOuplOyLnOyngCDsoITshqE6ICR7dGhpcy5zZWxlY3RlZFRyYWNrLnRpdGxlfWApO1xuICAgICAgICAgICAgICAgIC8vIOyEseqztSDslYzrprwg7ZGc7IucXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VG9hc3QoYCR7dGhpcy5zZWxlY3RlZFRyYWNrLnRpdGxlfSDtlIzroIjsnbTslrTqsIAgRmlnbWHsl5Ag7IK97J6F65CY7JeI7Iq164uI64ukYCwgMzAwMCk7XG4gICAgICAgICAgICAgICAgLy8g67KE7Yq8IOyDge2DnCDrs7Xsm5BcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc2VydEJ0bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0QnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRCdG4udGV4dENvbnRlbnQgPSBvcmlnaW5hbFRleHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOuyhO2KvOydtCDsl4bripQg6rK97JqwIC0g7ZS86re466eI7JeQIOuplOyLnOyngOunjCDsoITshqFcbiAgICAgICAgICAgICAgICBwYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5NZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5zZXJ0LXBsYXllcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjazogdGhpcy5zZWxlY3RlZFRyYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbWU6IHRoaXMuY3VycmVudFRoZW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAnKicpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDtlIzroIjsnbTslrQg7IK97J6FIOuplOyLnOyngCDsoITshqEgKOuyhO2KvCDsl4bsnYwpOiAke3RoaXMuc2VsZWN0ZWRUcmFjay50aXRsZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+2UjOugiOydtOyWtCDsgr3snoUg7KSRIOyYpOulmDonLCBlcnJvcik7XG4gICAgICAgICAgICB0aGlzLnNob3dUb2FzdChg7ZSM66CI7J207Ja0IOyCveyehSDsmKTrpZg6ICR7ZXJyb3IubWVzc2FnZX1gLCAzMDAwKTtcbiAgICAgICAgICAgIC8vIOuyhO2KvCDsg4Htg5wg67O17JuQXG4gICAgICAgICAgICBpZiAodGhpcy5pbnNlcnRCdXR0b24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnNlcnRCdG4gPSB0aGlzLmluc2VydEJ1dHRvbjtcbiAgICAgICAgICAgICAgICBpbnNlcnRCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpbnNlcnRCdG4udGV4dENvbnRlbnQgPSAnSW5zZXJ0IFBsYXllcic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyDsoITsl60g6rCd7LK07JeQIFBsYXllclVJIO2BtOuemOyKpCDtlaDri7lcbndpbmRvdy5QbGF5ZXJVSSA9IFBsYXllclVJO1xuLy8gVUkg7LSI6riw7ZmUXG5jb25zb2xlLmxvZygnUGxheWVyVUkg7J247Iqk7YS07IqkIOyDneyEsScpO1xuY29uc3QgcGxheWVyVUkgPSBuZXcgUGxheWVyVUkoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==