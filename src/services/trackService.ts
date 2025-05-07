import { Track } from '../types';

export class TrackService {
  private static instance: TrackService;
  private trackCache: Map<string, Track> = new Map();
  private readonly CACHE_KEY = 'figma_music_player_cache_v4';
  
  // 싱글톤 패턴
  private constructor() {
    console.log('TrackService 초기화 - v4');
    
    // 초기화 시 캐시 비우기
    this.clearCache();
  }

  public static getInstance(): TrackService {
    if (!TrackService.instance) {
      TrackService.instance = new TrackService();
    }
    return TrackService.instance;
  }

  // 항상 최신 트랙 목록 반환 (캐싱 없음)
  public getPredefinedTracks(): Track[] {
    console.log('최신 기본 트랙 목록 가져오기');
    
    // 항상 하드코딩된 목록 반환
    return [
      {
        title: "Ara Bada",
        artist: "Kuf-G",
        url: "https://soundcloud.com/kuf-g/ara-bada",
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
      }
    ];
  }

  // SoundCloud API를 통해 트랙 메타데이터 가져오기
  public async getTrackMetadata(url: string): Promise<Track> {
    try {
      if (!url) {
        throw new Error('유효하지 않은 URL');
      }
      
      // 캐시에 있으면 캐시에서 가져오기
      if (this.trackCache.has(url)) {
        return this.trackCache.get(url)!;
      }

      // SoundCloud oEmbed API로 정보 가져오기
      const response = await fetch(`https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`);
      
      if (!response.ok) {
        throw new Error(`API 응답 오류: ${response.status}`);
      }
      
      const data = await response.json();
      
      const track: Track = {
        title: data.title.split(" by ")[0] || data.title,
        artist: data.title.includes(" by ") ? data.title.split(" by ")[1] : "Unknown Artist",
        url: url,
        artwork: data.thumbnail_url
      };

      // 캐시에 저장
      this.trackCache.set(url, track);
      
      return track;
    } catch (error) {
      console.error('트랙 메타데이터 가져오기 실패:', error);
      
      // 에러 상황에서 기본 정보 반환
      return {
        title: "Unknown Track",
        artist: "Unknown Artist",
        url: url || "https://soundcloud.com/"
      };
    }
  }

  // 캐시 비우기
  public clearCache(): void {
    this.trackCache.clear();
    try {
      localStorage.removeItem(this.CACHE_KEY);
    } catch (e) {
      console.error('캐시 삭제 중 오류:', e);
    }
  }
} 