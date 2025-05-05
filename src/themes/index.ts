import { Theme } from '../types';

export const themes: Theme[] = [
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
      backgroundColor: "#FFCC00", // TE 시그니처 옐로우
      textColor: "#000000",
      buttonColor: "#000000",
      displayColor: "#111111", // LCD 디스플레이 스타일
      displayTextColor: "#FFFFFF",
      accentColor: "#FF0000", // TE 레드
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
  },
  {
    id: "minimal-player",
    name: "미니멀 플레이어 (앨범아트 없음)",
    styles: {
      backgroundColor: "#F8F8F8", // 약간 회색을 띤 흰색 배경
      textColor: "#333333",
      buttonColor: "#555555", // 어두운 회색 버튼
      displayColor: "#FFFFFF", // 순수 흰색 디스플레이
      displayTextColor: "#333333",
      accentColor: "#555555", // 어두운 회색 강조색
      borderRadius: "4px" // 최소한의 둥근 모서리
    }
  }
]; 