// 트랙 관련 타입
export interface Track {
  title: string;
  artist: string;
  url: string;
  artwork?: string;
}

// 테마 관련 타입
export interface ThemeStyle {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  displayColor: string;
  displayTextColor: string;
  accentColor: string;
  borderRadius: string;
}

export interface Theme {
  id: string;
  name: string;
  styles: ThemeStyle;
}

// 플레이리스트 관련 타입
export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

// 메시지 타입 (Figma와 UI 간 통신)
export interface InsertPlayerMessage {
  type: 'insert-player';
  track: Track;
  theme: Theme;
}

export interface ChangeThemeMessage {
  type: 'change-theme';
  theme: Theme;
}

export interface CloseMessage {
  type: 'close';
}

export type PluginMessage = InsertPlayerMessage | ChangeThemeMessage | CloseMessage; 