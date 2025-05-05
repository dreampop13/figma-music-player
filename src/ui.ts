import { Track, Theme } from './types/index';
import { themes } from './themes/index';
import { ThemeManager } from './services/themeManager';
import { TrackService } from './services/trackService';

// 디버그 정보 로깅
console.log('%c FIXED VERSION 1.1.8: UI 개선 및 테마 추가', 'background: #FF0000; color: white; font-size: 20px');

// 전역 변수로 클래스를 노출
declare global {
  interface Window {
    ThemeManager: typeof ThemeManager;
    TrackService: typeof TrackService;
    PlayerUI: typeof PlayerUI;
    SC: { 
      Widget: {
        (iframe: HTMLIFrameElement): SoundCloudWidget;
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
        }
      }
    };
  }
}

// 전역 객체에 클래스 할당
window.ThemeManager = ThemeManager;
window.TrackService = TrackService;

interface SoundCloudWidget {
  bind(event: string, callback: Function): void;
  play(): void;
  pause(): void;
}

// 하드코딩된 트랙 목록 (문제가 있을 경우 직접 사용)
const FALLBACK_TRACKS: Track[] = [
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
const FALLBACK_THEMES: Theme[] = [
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
      backgroundColor: "#BDEED0", // Soft mint background
      textColor: "#2A3B47",
      buttonColor: "#0CC0DF", // Bright turquoise
      displayColor: "#FFFFFF",
      displayTextColor: "#2A3B47",
      accentColor: "#FF6B95", // Coral pink
      borderRadius: "16px"
    }
  },
  {
    id: "vapor-wave",
    name: "Vapor Wave",
    styles: {
      backgroundColor: "#131377", // Deep blue background
      textColor: "#FFFFFF",
      buttonColor: "#FF00FF", // Magenta
      displayColor: "#000000",
      displayTextColor: "#00FFFF", // Cyan
      accentColor: "#FF00FF", // Magenta
      borderRadius: "0px" // Sharp corners
    }
  },
  {
    id: "ipod-classic",
    name: "iPod Classic",
    styles: {
      backgroundColor: "#ECECEC", // iPod silver body
      textColor: "#000000",
      buttonColor: "#6A6A6A", // Silver button
      displayColor: "#D6DCE4", // Light blue-gray display
      displayTextColor: "#000000",
      accentColor: "#007AFF", // Apple blue
      borderRadius: "8px"
    }
  }
];

class PlayerUI {
  // DOM 요소
  private trackList: HTMLElement | null = null;
  private scIframe: HTMLIFrameElement | null = null;
  private previewContainer: HTMLElement | null = null;
  private previewTitle: HTMLElement | null = null;
  private previewArtist: HTMLElement | null = null;
  private statusDot: HTMLElement | null = null;
  private playIcon: HTMLElement | null = null;
  private pauseIcon: HTMLElement | null = null;
  private playPauseBtn: HTMLElement | null = null;
  private themeSelect: HTMLSelectElement | null = null;
  private insertButton: HTMLElement | null = null;

  // 상태
  private selectedTrack: Track | null = null;
  private currentTheme: Theme;
  private scPlayer: SoundCloudWidget | null = null;
  private isPlaying: boolean = false;
  private themeManager: ThemeManager;
  private trackService: TrackService;

  // 미리 정의된 트랙과 테마 목록
  private predefinedTracks: Track[] = [];
  private availableThemes: Theme[] = [];

  constructor() {
    console.log('PlayerUI 초기화 시작');
    
    try {
      // 서비스 인스턴스 초기화
      this.themeManager = ThemeManager.getInstance();
      this.trackService = TrackService.getInstance();
      
      // 트랙 및 테마 데이터 초기화
      this.initData();
      
      // 기본 테마 설정
      this.currentTheme = this.availableThemes[0];
      
      // DOM 로드 확인
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', this.onDomLoaded.bind(this));
        console.log('DOM 로딩 중, DOMContentLoaded 이벤트 리스너 등록');
      } else {
        this.onDomLoaded();
        console.log('DOM 이미 로드됨, 초기화 진행');
      }
    } catch (error) {
      console.error('PlayerUI 초기화 중 오류 발생:', error);
      this.logError('초기화 오류', error);
    }
  }
  
  private logError(context: string, error: any): void {
    console.error(`[${context}]:`, error);
    try {
      alert(`${context}: ${error.message || '알 수 없는 오류'}`);
    } catch (e) {
      // 알림 표시 중 오류 발생 시 무시
    }
  }
  
  private initData(): void {
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
      } else {
        console.error('테마 목록이 비어 있음. 기본 테마를 설정할 수 없음');
      }
    } catch (error) {
      console.error('데이터 초기화 중 오류 발생:', error);
      // Fallback 데이터 사용
      this.predefinedTracks = FALLBACK_TRACKS;
      this.availableThemes = FALLBACK_THEMES;
      this.currentTheme = FALLBACK_THEMES[0];
    }
  }
  
  private onDomLoaded(): void {
    console.log('DOM 로드 완료, UI 초기화 시작');
    
    // DOM 요소 초기화 전에 짧은 지연 추가
    setTimeout(() => {
      this.initialize();
    }, 200);
  }
  
  private initialize(): void {
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
    } catch (error) {
      console.error('UI 초기화 중 오류 발생:', error);
      this.logError('UI 초기화 오류', error);
    }
  }
  
  private initDomElements(): void {
    console.log('DOM 요소 가져오기');
    
    try {
      // 기본 요소 가져오기
      this.trackList = document.getElementById('track-list');
      this.themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
      this.insertButton = document.getElementById('insert-button');
      
      // 기본 요소 확인
      if (!this.trackList || !this.themeSelect || !this.insertButton) {
        const missing = [];
        if (!this.trackList) missing.push('track-list');
        if (!this.themeSelect) missing.push('theme-select');
        if (!this.insertButton) missing.push('insert-button');
        
        const missingStr = missing.join(', ');
        console.error(`필수 DOM 요소를 찾을 수 없음: ${missingStr}`);
        
        // 요소가 없는 경우 직접 생성 시도
        this.createMissingElements(missing);
      }
      
      // 기타 요소 가져오기
      this.scIframe = document.getElementById('sc-iframe') as HTMLIFrameElement;
      this.previewContainer = document.getElementById('preview-container');
      this.previewTitle = document.getElementById('preview-title');
      this.previewArtist = document.getElementById('preview-artist');
      this.statusDot = document.getElementById('status-dot');
      this.playIcon = document.getElementById('play-icon');
      this.pauseIcon = document.getElementById('pause-icon');
      this.playPauseBtn = document.getElementById('play-pause-btn');
      
      console.log('DOM 요소 가져오기 완료');
    } catch (error) {
      console.error('DOM 요소 가져오기 실패:', error);
      throw new Error(`DOM 요소 초기화 오류: ${error.message}`);
    }
  }
  
  // 누락된 필수 요소를 직접 생성
  private createMissingElements(missing: string[]): void {
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
      this.themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
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

  private loadSoundCloudAPI(): void {
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
    } catch (error) {
      console.error('SoundCloud API 로드 중 오류 발생:', error);
    }
  }

  private initThemeSelectDropdown(): void {
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
    } catch (error) {
      console.error('테마 드롭다운 초기화 중 오류:', error);
    }
  }

  private setupEventListeners(): void {
    console.log('이벤트 리스너 설정');
    
    // 테마 선택 이벤트
    if (this.themeSelect) {
      // 이벤트 리스너 중복 방지
      const themeChangeHandler = this.onThemeChange.bind(this);
      this.themeSelect.removeEventListener('change', themeChangeHandler as any);
      this.themeSelect.addEventListener('change', themeChangeHandler);
      console.log('테마 선택 이벤트 리스너 등록됨');
    }
    
    // 삽입 버튼 이벤트
    if (this.insertButton) {
      const insertHandler = this.insertPlayer.bind(this);
      this.insertButton.removeEventListener('click', insertHandler as any);
      this.insertButton.addEventListener('click', insertHandler);
      console.log('삽입 버튼 이벤트 리스너 등록됨');
    }
    
    // 재생/일시정지 버튼 이벤트
    if (this.playPauseBtn) {
      const toggleHandler = this.togglePlayback.bind(this);
      this.playPauseBtn.removeEventListener('click', toggleHandler as any);
      this.playPauseBtn.addEventListener('click', toggleHandler);
      console.log('재생/일시정지 버튼 이벤트 리스너 등록됨');
    }
    
    console.log('모든 이벤트 리스너 설정 완료');
  }

  private displayTracks(): void {
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
    } catch (error) {
      console.error('트랙 표시 중 오류 발생:', error);
      this.trackList.innerHTML = `<div style="padding: 10px; color: red;">Error: ${error.message}</div>`;
    }
  }

  private selectTrack(track: Track, element: HTMLElement): void {
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
        (this.insertButton as HTMLButtonElement).disabled = false;
      }
    } catch (error) {
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
  
  private initSoundCloudPlayer(): void {
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
            console.log('플레이어 준비 완료');
            
            // 플레이 시작
            this.scPlayer?.play();
            this.isPlaying = true;
            this.updatePlayPauseUI();
            
            // 재생 상태 이벤트
            this.scPlayer?.bind(window.SC.Widget.Events.PLAY, () => {
              this.isPlaying = true;
              this.updatePlayPauseUI();
            });
            
            this.scPlayer?.bind(window.SC.Widget.Events.PAUSE, () => {
              this.isPlaying = false;
              this.updatePlayPauseUI();
            });
            
            this.scPlayer?.bind(window.SC.Widget.Events.FINISH, () => {
              this.isPlaying = false;
              this.updatePlayPauseUI();
            });
          });
        } catch (error) {
          console.error('SoundCloud 플레이어 초기화 오류:', error);
        }
      }, 1000);
    } catch (error) {
      console.error('플레이어 초기화 중 오류:', error);
    }
  }

  private togglePlayback(): void {
    if (!this.scPlayer) {
      console.warn('플레이어가 없어서 재생/일시정지를 할 수 없음');
      return;
    }
    
    try {
      if (this.isPlaying) {
        this.scPlayer.pause();
      } else {
        this.scPlayer.play();
      }
      console.log(`재생 상태 토글: ${!this.isPlaying ? '재생' : '일시정지'}`);
    } catch (error) {
      console.error('재생/일시정지 중 오류:', error);
    }
  }

  private updatePlayPauseUI(): void {
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
      } else {
        this.statusDot.classList.remove('playing');
      }
      
      console.log(`재생 UI 업데이트: ${this.isPlaying ? '재생 중' : '일시정지'}`);
    } catch (error) {
      console.error('재생/일시정지 UI 업데이트 중 오류:', error);
    }
  }

  private onThemeChange(event: Event): void {
    try {
      const select = event.target as HTMLSelectElement;
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
      } else {
        console.warn(`테마를 찾을 수 없음: ${themeId}`);
      }
    } catch (error) {
      console.error('테마 변경 중 오류:', error);
    }
  }

  private applyThemeToUI(theme: Theme): void {
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
    } catch (error) {
      console.error('테마 적용 중 오류:', error);
    }
  }

  // 토스트 메시지 표시 유틸리티 메서드
  private showToast(message: string, duration: number = 2000): void {
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
    } catch (error) {
      console.error('토스트 표시 중 오류:', error);
    }
  }

  public insertPlayer(): void {
    console.log('플레이어 삽입 시도');
    
    if (!this.selectedTrack) {
      this.showToast('플레이어를 삽입하기 전에 트랙을 선택해주세요.', 3000);
      console.warn('선택된 트랙 없음');
      return;
    }
    
    try {
      // 로딩 상태 표시
      if (this.insertButton) {
        const insertBtn = this.insertButton as HTMLButtonElement;
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
      } else {
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
    } catch (error) {
      console.error('플레이어 삽입 중 오류:', error);
      this.showToast(`플레이어 삽입 오류: ${error.message}`, 3000);
      
      // 버튼 상태 복원
      if (this.insertButton) {
        const insertBtn = this.insertButton as HTMLButtonElement;
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