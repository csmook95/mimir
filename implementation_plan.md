# 구현 계획서 - 특정 채팅 아이템 UI 리팩토링

사용자가 지시한 특정 코드 블록(라인 54-79의 `div` 영역)의 디자인을 React Native 환경에 맞게 리팩토링합니다. 다른 전역 스타일이나 데이터 구조는 변경하지 않습니다.

## 1. 개요
현재 임시로 작성된 웹 스타일(`div`, `img`, Tailwind 클래스)의 채팅 아이템 UI를 React Native의 코어 컴포넌트와 `StyleSheet`로 변환합니다.

## 2. 작업 내용
### 2.1 리팩토링 대상 (라인 54-79)
- **컨테이너**: `<div className="...">` -> `<Pressable style={styles.chatItem}>`
- **아바타 영역**: `<div className="relative">` 및 `<img>` -> `<View>` 및 `<Image>` (온라인 인디케이터 포함)
- **텍스트 영역**: `<h3>`, `<span>`, `<p>` -> `<Text>` (Pretendard 폰트 적용)
- **안읽음 배지**: `<div className="...">` -> `<View style={styles.unreadBadge}>` 및 `<Text>`

### 2.2 스타일 정의
- 기존 Tailwind 클래스의 시각적 효과(rounded-[32px], shadow-lg 등)를 `StyleSheet`에 정의하여 적용합니다.
- `Pretendard-Bold`, `Pretendard-Medium` 등 이미 로드된 폰트만 사용하여 가독성을 높입니다.

## 3. 상세 단계
1. **코드 분석**: 현재 `CHAT` 데이터를 사용하는 `div` 블록의 구조 파악
2. **스타일 추가**: `StyleSheet.create` 내부에 필요한 스타일(`chatItem`, `avatar`, `unreadBadge` 등) 정의
3. **컴포넌트 교체**: 웹 태그를 React Native 컴포넌트로 교환

---
위 계획에 대해 **승인** 또는 **진행해**라고 말씀해 주시면 작업을 시작하겠습니다. 이번에는 지정된 영역 외의 코드는 절대 수정하지 않겠습니다.
