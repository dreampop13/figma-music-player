# Figma SoundCloud Player

피그마에서 SoundCloud 트랙을 재생하고 예쁜 플레이어를 디자인에 삽입할 수 있는 플러그인입니다.

## 특징

- 실시간 업데이트: 관리자가 곡 목록을 바꾸면 사용자도 업데이트 없이 변경사항을 볼 수 있습니다.
- 다양한 테마: 여러 스타일의 테마를 지원하며, 새로운 테마가 추가되면 자동으로 업데이트됩니다.
- SoundCloud 통합: SoundCloud의 트랙을 검색하고 미리 들어볼 수 있습니다.

## 개발 방법

1. 의존성 설치하기
```bash
npm install
```

2. 개발 모드 실행하기
```bash
npm run dev
```

3. 빌드하기
```bash
npm run build
```

## 테마 추가하기

`src/themes/index.ts` 파일에 새로운 테마를 추가할 수 있습니다.

```typescript
{
  id: "new-theme-id",
  name: "New Theme Name",
  styles: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    buttonColor: "#0099FF",
    displayColor: "#F5F5F5",
    displayTextColor: "#000000",
    accentColor: "#0099FF",
    borderRadius: "12px"
  }
}
``` 