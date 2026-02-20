export interface Friend {
	id: string;
	name: string;
	statusMessage: string;
	avatar: string;
	isOnline: boolean;
	userId?: string;
	isFriend?: boolean;
}

export interface UserProfile {
	name: string;
	statusMessage: string;
	avatar: string;
	userId: string;
}

export interface Channel {
	id: string;
	name: string;
	lastMessage: string;
	time: string;
	unreadCount: number;
	avatar: string;
	type: `dm` | `group`;
	memberCount?: number;
}

// 데이터 생성을 위한 헬퍼 데이터
const SURNAMES = [`김`, `이`, `박`, `최`, `정`, `강`, `조`, `윤`, `장`, `임`, `한`, `오`, `서`, `신`, `권`, `황`, `안`, `송`, `전`, `홍`];
const NAMES = [`민수`, `지수`, `서준`, `도윤`, `예준`, `시우`, `하준`, `주원`, `지호`, `지후`, `준서`, `준우`, `현우`, `도현`, `지훈`, `건우`, `우진`, `현준`, `선우`, `민재`, `민서`, `서윤`, `서연`, `하윤`, `지우`, `지유`, `윤서`, `하은`, `지민`, `채원`];
const STATUS_MESSAGES = [
	`오늘도 즐거운 하루!`, `회의 중입니다.`, `mimir 최고예요 ✨`, `답장은 늦을 수 있어요.`, `휴가 중 (연락 X)`, `공부 중... 📝`, `운동하는 습관 기르기`, `맛있는 점심 추천 좀!`, `날씨가 너무 좋네요 ☀️`, `바쁜 하루 끝`, `새로운 프로젝트 시작!`, `집이 최고다`, `커피 수혈 중 ☕`, `여행 가고 싶다...`, `독서의 계절`, `열일 중!!`, `지루한 오후`, `음악 감상 중 🎧`, `지혜의 샘에서 길어 올린 문장`, `오늘의 명언 읽기`
];
const CHAT_MESSAGES = [
	`안녕하세요!`, `반가워요~`, `넵 알겠습니다.`, `확인했습니다!`, `오늘 뭐 하세요?`, `내일 봐요!`, `정말요? 대박!`, `나중에 연락드릴게요.`, `이지원: 다음 배포 일정 확인 부탁드려요.`, `엄마: 오늘 저녁 메뉴 뭐야?`, `AI 기능을 써보세요!`, `점심 먹었니?`, `파일 보내드렸습니다.`, `이거 확인 좀 부탁드려요.`, `나쁘지 않네요 ㅎㅎ`, `감사합니다!`, `고생하셨어요.`, `축하드립니다! 🎉`, `언제쯤 끝나나요?`, `지금 가는 중입니다.`
];
const TIMES = [`오후 2:30`, `오전 11:15`, `오전 9:00`, `오후 4:45`, `오후 8:20`, `오후 1:10`, `어제`, `그저께`, `수요일`, `목요일`, `금요일`, `월요일`, `1월 15일`];

export const MOCK_CHANNELS: Channel[] = [
	{
		id: `1`,
		name: `최승묵`,
		lastMessage: `안녕하세요!`,
		time: `오후 2:30`,
		unreadCount: 2,
		avatar: `https://picsum.photos/seed/1/100`,
		type: `dm`
	},
	{
		id: `2`,
		name: `mimir 프로덕트 팀`,
		lastMessage: `이지원: 다음 배포 일정 확인 부탁드려요.`,
		time: `오전 11:15`,
		unreadCount: 0,
		avatar: `https://picsum.photos/seed/2/100`,
		type: `group`,
		memberCount: 5
	},
	{
		id: `3`,
		name: `가족방`,
		lastMessage: `엄마: 오늘 저녁 메뉴 뭐야?`,
		time: `어제`,
		unreadCount: 5,
		avatar: `https://picsum.photos/seed/3/100`,
		type: `group`,
		memberCount: 3
	},
	...Array.from({ length: 197 }, (_, i) => {
		const id = (i + 4).toString();
		const type = Math.random() > 0.3 ? `dm` : `group`;
		return {
			id,
			name: type === `dm`
				? SURNAMES[i % SURNAMES.length] + NAMES[i % NAMES.length]
				: `${SURNAMES[i % SURNAMES.length]}씨 가족 모임`,
			lastMessage: CHAT_MESSAGES[i % CHAT_MESSAGES.length],
			time: TIMES[i % TIMES.length],
			unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 10) + 1 : 0,
			avatar: `https://picsum.photos/seed/${id}/100`,
			type: type as `dm` | `group`,
			...(type === `group` && { memberCount: Math.floor(Math.random() * 8) + 3 })
		};
	})
];

export const MOCK_FRIENDS: Friend[] = [
	{
		id: `1`,
		name: `최승묵`,
		statusMessage: `오늘도 즐거운 하루!`,
		avatar: `https://picsum.photos/seed/1/100`,
		isOnline: true
	},
	{
		id: `2`,
		name: `김민수`,
		statusMessage: `회의 중입니다.`,
		avatar: `https://picsum.photos/seed/5/100`,
		isOnline: false
	},
	...Array.from({ length: 198 }, (_, i) => {
		const id = (i + 3).toString();
		return {
			id,
			name: SURNAMES[i % SURNAMES.length] + NAMES[(i + 5) % NAMES.length],
			statusMessage: STATUS_MESSAGES[i % STATUS_MESSAGES.length],
			avatar: `https://picsum.photos/seed/friend_${id}/100`,
			isOnline: Math.random() > 0.5
		};
	})
];

