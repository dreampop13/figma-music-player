import { Track } from '../types';

export class TrackService {
  private static instance: TrackService;
  private trackCache: Map<string, Track> = new Map();

  // 싱글톤 패턴으로 구현
  private constructor() {
    console.log('TrackService 초기화');
  }

  public static getInstance(): TrackService {
    if (!TrackService.instance) {
      TrackService.instance = new TrackService();
    }
    return TrackService.instance;
  }

  // 미리 정의된 트랙 목록
  public getPredefinedTracks(): Track[] {
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
    } catch (error) {
      console.error('트랙 목록 가져오기 오류:', error);
      return []; // 오류 시 빈 배열 반환
    }
  }

  // 트랙 메타데이터 가져오기
  public async getTrackMetadata(url: string): Promise<Track> {
    try {
      if (!url) {
        throw new Error('유효하지 않은 URL');
      }
      
      console.log(`트랙 메타데이터 요청: ${url}`);
      
      // 캐시에 있으면 캐시에서 가져오기
      if (this.trackCache.has(url)) {
        console.log('캐시에서 트랙 정보 가져옴');
        return this.trackCache.get(url)!;
      }

      // SoundCloud oEmbed API로 정보 가져오기
      console.log('SoundCloud API 요청 시작');
      const response = await fetch(`https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`);
      
      if (!response.ok) {
        throw new Error(`API 응답 오류: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API 응답 받음:', data);
      
      const track: Track = {
        title: data.title.split(" by ")[0] || data.title,
        artist: data.title.includes(" by ") ? data.title.split(" by ")[1] : "Unknown Artist",
        url: url,
        artwork: data.thumbnail_url
      };

      // 캐시에 저장
      this.trackCache.set(url, track);
      console.log('트랙 정보 캐시에 저장됨');
      
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
    try {
      this.trackCache.clear();
      console.log('트랙 캐시 비움');
    } catch (error) {
      console.error('캐시 비우기 오류:', error);
    }
  }
} 