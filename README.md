# 🍮 POMPOM ARCADE (폼폼푸린 레트로 아케이드) 🐶

> **따뜻한 노랑과 갈색의 포근한 감성! 폼폼푸린 강아지와 함께 즐기는 3D 레트로 아케이드 게임 스튜디오**  
> 귀여운 갈색 베레모를 쓴 사랑스러운 골든 리트리버 강아지(폼폼푸린)가 주인공인 6종의 픽셀 아케이드 게임을 실제 3D 캐비닛에서 플레이해보세요!

---

## ✨ 리메이크 주요 변경 사항 (Remake Highlights)

### 🐶 1. 폼폼푸린 스타일 강아지 캐릭터 전면 리메이크
* **시그니처 디자인**: 보들보들한 커스터드 옐로우 몸통, 머리 위의 앙증맞은 초콜릿 갈색 베레모, 축 처진 양 귀, 단추 같은 눈과 코, 핑크빛 볼터치, 살랑거리는 꼬리를 도트 픽셀 아트로 정밀 구현
* **6종 전 장르 캐릭터 적용**:
  * 🏃 **러너 (Purin Run)**: 2프레임 달리기 및 귀가 펄럭이는 점프 애니메이션
  * 🌟 **닷저 (Purin Dodger)**: 발을 구르며 장애물을 피하는 좌우 질주 스프라이트
  * 🐾 **플랫포머 (Purin Bounce)**: 통통 튀며 별과 보석을 모으는 점프 모션
  * 🧱 **벽돌깨기 (Purin Breakout)**: 패들 위에서 플레이어를 응원하는 마스코트
  * 🧀 **미로 (Purin Maze)**: 미로를 누비며 간식을 찾는 탐험 모습
  * 🚀 **슈팅 (Purin Flyer)**: 작은 날개와 부스터로 하늘을 비행하는 슈팅 스프라이트

### 🍮 2. 노랑 + 갈색의 따뜻한 감성 테마 (Warm Yellow & Brown Theme)
* **컬러 팔레트**:
  * **메인 옐로우 (`#FFD836` / `#FFE169`)**: 달콤한 커스터드 푸딩과 푸린의 시그니처 옐로우
  * **딥 초콜릿 브라운 (`#4A2E1B` / `#22130C`)**: 베레모 모자와 따뜻한 카라멜 시럽을 닮은 딥 브라운
  * **크림 아이보리 (`#FFFBF0`)**: 부드러운 우유 생크림 텍스트
* **UI & 3D 무대 비주얼**:
  * 전체 웹 UI (버튼, 필, 칩, 모달 카드)를 폼폼푸린 테마 색상으로 전면 교체
  * 3D 아케이드 캐비닛의 배경 안개와 스포트라이트 조명을 은은하고 따뜻한 골든 옐로우 & 웜 브라운 조명으로 리뉴얼
  * 마키(Marquee) 및 사이드 패널(Side Art)의 기본 타이틀과 일러스트를 푸린 테마로 변경

---

## 🕹️ 탑재된 게임 모드 (Game Modes)

| 장르 | 게임명 | 설명 |
| :--- | :--- | :--- |
| **Runner** | 🍮 **PURIN RUN** | 다가오는 장애물을 점프와 슬라이딩으로 피하며 질주하는 런너 게임 |
| **Dodger** | 🌟 **PURIN DODGER** | 하늘에서 쏟아지는 유성을 요리조리 피하는 순발력 회피 게임 |
| **Platformer** | 🐾 **PURIN BOUNCE** | 움직이는 발판을 밟고 보석을 모으며 골인 지점을 향해 올라가는 플랫포머 |
| **Breakout** | 🧱 **PURIN BREAKOUT** | 폼폼푸린 패들로 공을 튕겨 모든 디저트 블록을 깨뜨리는 벽돌깨기 |
| **Maze** | 🧀 **PURIN MAZE** | 귀여운 몬스터들을 피해 미로 속 모든 별을 획득하는 미로 탈출 게임 |
| **Shooter** | 🚀 **PURIN FLYER** | 하늘을 날며 날아오는 적들을 정밀 조준 사격하는 레트로 비행 슈팅 게임 |

---

## 🎮 조작법 (Controls)

* **이동**: 키보드 방향키 `←` `→` `↑` `↓` 또는 `A` `S` `W` `D`
* **액션 / 점프 (A 버튼)**: `Z` 키 또는 `스페이스바 (Space)`
* **서브 액션 / 부스트 (B 버튼)**: `X` 키
* **화면 조작**: 마우스 드래그로 3D 아케이드 캐비닛을 360도 자유롭게 둘러볼 수 있습니다.

---

## 🚀 시작하기 (Getting Started)

### 사전 요구사항
* Node.js 18 이상 설치 필요

### 설치 및 로컬 실행
```bash
# 의존성 패키지 설치
npm install

# 개발 서버 실행 (포트 3000 또는 5173)
npm run dev
```

### 프로덕션 빌드
```bash
# 게임 카트리지 싱크, Vite 클라이언트 및 Express 서버 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 🛠️ 기술 스택 (Tech Stack)

* **Frontend**: React 19, TypeScript, Vite
* **3D & Graphics**: Three.js, Custom CRT Scanline Post-processing Shader, Canvas 2D Pixel Art Compositor
* **Audio**: Web Audio API (Retro Chime & Hum Generator)
* **Backend**: Express, TSX, esbuild
* **Architecture**: PICO-8 스타일 커스텀 2D 가상 픽셀 엔진 (Sandbox IFrame Runtime)

---

## 📜 라이선스 (License)

This project is created for educational and remix showcase purposes.
All character inspirations belong to their respective copyright holders.
