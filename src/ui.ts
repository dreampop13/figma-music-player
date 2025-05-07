import { Track, Theme } from './types/index';
import { themes } from './themes/index';
import { ThemeManager } from './services/themeManager';
import { TrackService } from './services/trackService';

// SoundCloud API 타입 정의
declare global {
  interface Window {
    SC: {
      Widget: {
        (iframe: HTMLIFrameElement): any;
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
          PLAY_PROGRESS: string;
        };
      };
    };
  }
}

/**
 * Figma Music Player UI 클래스
 * 트랙과 테마 관리, 재생 기능을 담당합니다.
 */
class PlayerUI {
  // DOM 요소
  private trackList: HTMLElement | null = null;
  private scIframe: HTMLIFrameElement | null = null;
  private previewContainer: HTMLElement | null = null;
  private previewTitle: HTMLElement | null = null;
  private previewArtist: HTMLElement | null = null;
  private statusDot: HTMLElement | null = null;
  private playPauseBtn: HTMLElement | null = null;
  private themeSelect: HTMLSelectElement | null = null;
  private progressBar: HTMLElement | null = null;
  private timeDisplay: HTMLElement | null = null;

  // 상태
  private selectedTrack: Track | null = null;
  private currentTheme: Theme;
  private scPlayer: any = null;
  private isPlaying: boolean = false;
  private themeManager: ThemeManager;
  private trackService: TrackService;

  // 트랙과 테마 목록
  private tracks: Track[] = [];
  private availableThemes: Theme[] = [];

  /**
   * 생성자
   */
  constructor() {
    console.log('PlayerUI 초기화 - v4.0.0');
    
    // 서비스 인스턴스 초기화
    this.themeManager = ThemeManager.getInstance();
    this.trackService = TrackService.getInstance();
    
    // 기본 테마 설정
    this.currentTheme = this.themeManager.getCurrentTheme();
    
    // DOM 로드 확인
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.onDomLoaded.bind(this));
    } else {
      this.onDomLoaded();
    }
  }

  /**
   * DOM 로드 완료 시 호출되는 함수
   */
  private onDomLoaded(): void {
    // DOM 요소 초기화
    this.initializeDOM();
    
    // 데이터 로드
    this.loadData();
    
    // 이벤트 리스너 등록
    this.setupEventListeners();
    
    // SoundCloud API 초기화
    this.initSoundCloudAPI();
  }

  /**
   * DOM 요소 초기화
   */
  private initializeDOM(): void {
    this.trackList = document.getElementById('track-list');
    this.scIframe = document.getElementById('sc-iframe') as HTMLIFrameElement;
    this.previewContainer = document.getElementById('preview-container');
    this.previewTitle = document.getElementById('preview-title');
    this.previewArtist = document.getElementById('preview-artist');
    this.statusDot = document.getElementById('status-dot');
    this.playPauseBtn = document.getElementById('player-play-btn');
    this.themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
    this.progressBar = document.getElementById('progress-bar');
    this.timeDisplay = document.getElementById('time-display');
    
    // DOM 요소 확인
    if (!this.trackList || !this.scIframe || !this.previewContainer || 
        !this.previewTitle || !this.previewArtist || !this.statusDot || 
        !this.playPauseBtn || !this.themeSelect || 
        !this.progressBar || !this.timeDisplay) {
      console.error('필요한 DOM 요소를 찾을 수 없습니다');
    }
  }

  /**
   * 데이터 로드 (트랙, 테마)
   */
  private loadData(): void {
    // Ara Bada를 항상 첫 번째로 하는 트랙 목록 가져오기
    this.tracks = this.trackService.getPredefinedTracks();
    console.log('트랙 목록 로드:', this.tracks);
    
    // 테마 목록 가져오기
    this.availableThemes = this.themeManager.getAllThemes();
    console.log('테마 목록 로드:', this.availableThemes);
    
    // 테마 선택 드롭다운 초기화
    this.initThemeSelect();
    
    // 트랙 목록 표시
    this.displayTracks();
    
    // 현재 테마 적용
    this.applyTheme(this.currentTheme);
  }

  /**
   * 테마 선택 드롭다운 초기화
   */
  private initThemeSelect(): void {
    if (!this.themeSelect) return;
    
    // 기존 옵션 비우기
    this.themeSelect.innerHTML = '';
    
    // 테마 옵션 추가
    this.availableThemes.forEach(theme => {
      const option = document.createElement('option');
      option.value = theme.id;
      option.textContent = theme.name;
      this.themeSelect.appendChild(option);
    });
    
    // 현재 테마 선택
    this.themeSelect.value = this.currentTheme.id;
  }

  /**
   * 트랙 목록 표시
   */
  private displayTracks(): void {
    if (!this.trackList) return;
    
    // 목록 비우기
    this.trackList.innerHTML = '';
    
    // 트랙 항목 추가
    this.tracks.forEach((track, index) => {
      const trackItem = document.createElement('div');
      trackItem.className = 'track-item';
      trackItem.id = `track-${index}`;
      
      // 트랙 항목 내용
      trackItem.innerHTML = `
        <div class="track-info">
          <div class="track-title">${track.title}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
      `;
      
      // 클릭 이벤트 추가
      trackItem.addEventListener('click', () => {
        this.selectTrack(track, trackItem);
      });
      
      // 목록에 추가
      this.trackList.appendChild(trackItem);
    });
    
    // 첫 번째 트랙 자동 선택 (200ms 지연)
    setTimeout(() => {
      const firstTrack = document.getElementById('track-0');
      if (firstTrack && this.tracks.length > 0) {
        firstTrack.click();
      }
    }, 200);
  }

  /**
   * 트랙 선택 처리
   */
  private selectTrack(track: Track, element: HTMLElement): void {
    console.log(`트랙 선택: ${track.title} - ${track.artist}`);
    this.selectedTrack = track;
    
    // 이전 선택 해제
    document.querySelectorAll('.track-item').forEach(item => {
      item.classList.remove('selected');
    });
    
    // 새로운 트랙 선택
    element.classList.add('selected');
    
    // 미리보기 표시
    if (this.previewContainer && this.previewTitle && this.previewArtist) {
      this.previewContainer.style.display = 'block';
      this.previewTitle.textContent = track.title;
      this.previewArtist.textContent = track.artist;
      
      // iframe URL 설정
      if (this.scIframe) {
        const color = this.currentTheme.styles.accentColor.replace('#', '');
        const encodedUrl = encodeURIComponent(track.url);
        console.log(`SoundCloud 트랙 URL: ${encodedUrl}`);
        
        // SoundCloud iframe URL 설정 - 직접 노출하지 않음
        const iframeSrc = `https://w.soundcloud.com/player/?url=${encodedUrl}&color=${color}&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
        console.log(`SoundCloud iframe URL: ${iframeSrc}`);
        
        this.scIframe.src = iframeSrc;
        
        // 플레이어 초기화를 약간 지연
        setTimeout(() => {
          this.initSoundCloudPlayer();
        }, 1000);
      }
    }
    
    // 토스트 메시지 표시
    this.showToast(`재생 중: ${track.title}`);
  }

  /**
   * SoundCloud API 초기화
   */
  private initSoundCloudAPI(): void {
    console.log('SoundCloud API 초기화 시도');
    
    // API 로드 완료 확인을 위한 재시도 함수
    const checkApiLoaded = () => {
      if (window.SC && window.SC.Widget) {
        console.log('SoundCloud API 로드 완료');
        return true;
      }
      return false;
    };
    
    // API 로드 확인 및 로드
    if (checkApiLoaded()) {
      console.log('SoundCloud API 이미 로드됨');
      return;
    }
    
    console.log('SoundCloud API 로드 대기 중...');
    
    // API가 로드될 때까지 재시도
    let attempts = 0;
    const maxAttempts = 10;
    
    const waitForApi = setInterval(() => {
      attempts++;
      console.log(`SoundCloud API 로드 확인 시도 ${attempts}/${maxAttempts}`);
      
      if (checkApiLoaded() || attempts >= maxAttempts) {
        clearInterval(waitForApi);
        
        if (checkApiLoaded()) {
          console.log('SoundCloud API 로드 성공');
        } else {
          console.error('SoundCloud API 로드 실패');
          // API 스크립트 직접 로드 시도
          const script = document.createElement('script');
          script.src = 'https://w.soundcloud.com/player/api.js';
          document.head.appendChild(script);
        }
      }
    }, 500);
  }

  /**
   * SoundCloud 플레이어 초기화
   */
  private initSoundCloudPlayer(): void {
    if (!this.scIframe) {
      console.error('SoundCloud iframe을 찾을 수 없습니다');
      return;
    }
    
    if (!window.SC || !window.SC.Widget) {
      console.error('SoundCloud API가 로드되지 않았습니다');
      this.initSoundCloudAPI(); // API 로드 재시도
      setTimeout(() => this.initSoundCloudPlayer(), 1000); // 1초 후 다시 시도
      return;
    }
    
    try {
      console.log('SoundCloud 플레이어 초기화 시작');
      
      // iframe이 로드되었는지 확인
      if (!this.scIframe.src || this.scIframe.src === 'about:blank') {
        console.error('SoundCloud iframe에 유효한 URL이 없습니다');
        return;
      }
      
      // 플레이어 인스턴스 생성
      this.scPlayer = window.SC.Widget(this.scIframe);
      
      // 이벤트 리스너 등록
      this.scPlayer.bind(window.SC.Widget.Events.READY, () => {
        console.log('SoundCloud 플레이어 준비 완료');
        this.scPlayer.play(); // 자동 재생 시도
      });
      
      this.scPlayer.bind(window.SC.Widget.Events.PLAY, () => {
        this.isPlaying = true;
        this.updatePlayStatus(true);
        console.log('SoundCloud 트랙 재생 시작');
      });
      
      this.scPlayer.bind(window.SC.Widget.Events.PAUSE, () => {
        this.isPlaying = false;
        this.updatePlayStatus(false);
        console.log('SoundCloud 트랙 일시정지');
      });
      
      this.scPlayer.bind(window.SC.Widget.Events.FINISH, () => {
        console.log('SoundCloud 트랙 재생 완료, 다음 트랙으로 이동');
        this.playNextTrack();
      });
      
      this.scPlayer.bind(window.SC.Widget.Events.PLAY_PROGRESS, (progress: any) => {
        this.updateProgress(progress.currentPosition, progress.relativePosition);
      });
      
      console.log('SoundCloud 플레이어 이벤트 바인딩 완료');
    } catch (error) {
      console.error('SoundCloud 플레이어 초기화 오류:', error);
    }
  }

  /**
   * 재생 상태 업데이트
   */
  private updatePlayStatus(isPlaying: boolean): void {
    if (this.statusDot) {
      this.statusDot.classList.toggle('playing', isPlaying);
    }
    
    if (this.playPauseBtn) {
      this.playPauseBtn.innerHTML = isPlaying
        ? '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    }
  }

  /**
   * 진행 상태 업데이트
   */
  private updateProgress(currentPosition: number, relativePosition: number): void {
    if (this.progressBar) {
      this.progressBar.style.width = `${relativePosition * 100}%`;
    }
    
    if (this.timeDisplay) {
      const current = this.formatTime(currentPosition);
      let duration = '0:00';
      
      try {
        if (this.scPlayer) {
          this.scPlayer.getDuration((durationMs: number) => {
            duration = this.formatTime(durationMs);
            if (this.timeDisplay) {
              this.timeDisplay.textContent = `${current} / ${duration}`;
            }
          });
        }
      } catch (e) {
        if (this.timeDisplay) {
          this.timeDisplay.textContent = `${current} / ${duration}`;
        }
      }
    }
  }

  /**
   * 시간 포맷 변환 (밀리초 -> MM:SS)
   */
  private formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * 다음 트랙 재생
   */
  private playNextTrack(): void {
    const currentIndex = this.tracks.findIndex(track => track === this.selectedTrack);
    if (currentIndex < this.tracks.length - 1) {
      const nextTrack = this.tracks[currentIndex + 1];
      const nextElement = document.getElementById(`track-${currentIndex + 1}`);
      if (nextElement) {
        this.selectTrack(nextTrack, nextElement);
      }
    }
  }

  /**
   * 재생/일시정지 토글
   */
  private togglePlayback(): void {
    if (!this.scPlayer) return;
    
    try {
      if (this.isPlaying) {
        this.scPlayer.pause();
      } else {
        this.scPlayer.play();
      }
    } catch (e) {
      console.error('재생 토글 중 오류:', e);
    }
  }

  /**
   * 이벤트 리스너 등록
   */
  private setupEventListeners(): void {
    // 테마 변경 이벤트
    if (this.themeSelect) {
      this.themeSelect.addEventListener('change', (e) => {
        const select = e.target as HTMLSelectElement;
        const themeId = select.value;
        const selectedTheme = this.availableThemes.find(theme => theme.id === themeId);
        
        if (selectedTheme) {
          this.currentTheme = selectedTheme;
          this.themeManager.setCurrentTheme(selectedTheme);
          this.applyTheme(selectedTheme);
        }
      });
    }
    
    // 재생/일시정지 버튼 이벤트
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', () => {
        this.togglePlayback();
      });
    }
    
    // 진행 바 클릭 이벤트
    if (this.progressBar && this.progressBar.parentElement) {
      this.progressBar.parentElement.addEventListener('click', (e) => {
        if (!this.scPlayer) return;
        
        const container = this.progressBar.parentElement;
        const rect = container.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const percentage = relX / rect.width;
        
        if (percentage >= 0 && percentage <= 1) {
          this.scPlayer.getDuration((duration: number) => {
            const position = duration * percentage;
            this.scPlayer.seekTo(position);
          });
        }
      });
    }
  }

  /**
   * 테마 적용
   */
  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    const styles = theme.styles;
    
    // CSS 변수 설정
    root.style.setProperty('--theme-background', styles.backgroundColor);
    root.style.setProperty('--theme-text', styles.textColor);
    root.style.setProperty('--theme-button', styles.buttonColor);
    root.style.setProperty('--theme-display', styles.displayColor);
    root.style.setProperty('--theme-display-text', styles.displayTextColor);
    root.style.setProperty('--theme-accent', styles.accentColor);
    root.style.setProperty('--theme-radius', styles.borderRadius);
    
    // 테마 변경 알림
    this.showToast(`테마 변경: ${theme.name}`);
  }

  /**
   * 토스트 메시지 표시
   */
  private showToast(message: string, duration: number = 2000): void {
    // 기존 토스트 제거
    const existingToast = document.getElementById('plugin-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.id = 'plugin-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 토스트 표시 (약간 지연)
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
}

// 플레이어 인스턴스 생성
const player = new PlayerUI();