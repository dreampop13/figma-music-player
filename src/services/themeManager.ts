import { Theme } from '../types';
import { themes } from '../themes';

export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme;
  
  private constructor() {
    console.log('ThemeManager 초기화 시작');
    try {
      // 테마 데이터 확인
      if (!themes || themes.length === 0) {
        console.error('테마 데이터가 비어 있습니다');
        throw new Error('테마 데이터가 비어 있습니다');
      }
      
      // 기본 테마는 TE OP-1
      const defaultTheme = themes.find(t => t.id === 'te-op1');
      if (defaultTheme) {
        this.currentTheme = defaultTheme;
        console.log(`기본 테마 설정됨: ${defaultTheme.name}`);
      } else {
        this.currentTheme = themes[0];
        console.log(`기본 테마를 찾을 수 없어 첫 번째 테마로 설정: ${themes[0].name}`);
      }
    } catch (error) {
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

  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  public setCurrentTheme(theme: Theme): void {
    if (!theme) {
      console.error('유효하지 않은 테마가 설정되었습니다');
      return;
    }
    console.log(`테마 변경: ${theme.name} (${theme.id})`);
    this.currentTheme = theme;
  }

  public getThemeById(id: string): Theme | undefined {
    if (!id) {
      console.error('유효하지 않은 테마 ID입니다');
      return undefined;
    }
    
    try {
      const theme = themes.find(theme => theme.id === id);
      if (!theme) {
        console.warn(`테마를 찾을 수 없음: ${id}`);
      }
      return theme;
    } catch (error) {
      console.error(`테마 검색 중 오류 (ID: ${id}):`, error);
      return undefined;
    }
  }

  public getAllThemes(): Theme[] {
    // 테마 배열의 복사본 반환
    return [...themes];
  }

  // CSS 스타일 변수 생성
  public generateCSSVariables(theme: Theme): string {
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
    } catch (error) {
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
  public applyThemeToFigmaNode(node: any, theme: Theme): void {
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
    } catch (error) {
      console.error('Figma 노드에 테마 적용 중 오류:', error);
    }
  }

  // 헬퍼 함수: HEX 색상을 RGB 객체로 변환
  public hexToRGB(hex: string): { r: number; g: number; b: number } {
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
    } catch (error) {
      console.error('HEX to RGB 변환 중 오류:', error);
      // 오류 시 검은색 반환
      return { r: 0, g: 0, b: 0 };
    }
  }
} 