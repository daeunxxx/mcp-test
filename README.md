# GHOST 상품 상세 페이지

피그마 디자인을 기반으로 제작된 모바일 상품 상세 페이지입니다.

## 기술 스택

- HTML5
- CSS3 (Vanilla CSS)
- Vanilla JavaScript

## 기능

- **이미지 슬라이드**: 자동 슬라이드 및 터치/스와이프 지원
- **하트 버튼**: 좋아요 기능 (토글)
- **선물하기 버튼**: 선물 기능
- **구매하기 버튼**: 구매 기능
- **뒤로가기**: 이전 페이지로 이동
- **검색바**: 검색 기능
- **장바구니/알림 아이콘**: 각각의 기능 연결

## 파일 구조

```
MCP-project/
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── script.js       # JavaScript 기능
└── README.md       # 프로젝트 설명
```

## 실행 방법

1. 피그마 MCP 서버가 실행 중이어야 합니다 (이미지 로드용)
2. `index.html` 파일을 브라우저에서 열기
3. 또는 로컬 서버 실행:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   ```

## 주요 특징

- 모바일 최적화 (375px 기준)
- 터치 제스처 지원 (스와이프)
- 반응형 디자인
- iOS 스타일 UI 요소 (상태바, 홈 인디케이터)

## 브라우저 호환성

- Chrome (권장)
- Safari
- Firefox
- Edge

## 참고사항

- 이미지는 피그마 MCP 서버(localhost:3845)에서 제공됩니다
- 실제 구매/선물 기능은 백엔드 API와 연동 필요
- 검색 기능은 프롬프트로 구현되어 있으며, 실제 검색 페이지로 연결 가능


