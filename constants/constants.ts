import { Friend } from "@/constants/mocks";

type TabId = `all` | `unread` | `dm` | `group`;

export interface Tab {
	id: TabId;
	name: string
}

export const TABS: Tab[] = [{
	id: `all`,
	name: `전체`
}, {
	id: `unread`,
	name: `안읽음`
}, {
	id: `dm`,
	name: `개인`
}, {
	id: `group`,
	name: `그룹`
}];


// 친구 데이터에 userId 보강
export const MOCK_FRIENDS: Friend[] = [
	{
		id: `1`,
		userId: `seungmook`,
		name: `최승묵`,
		statusMessage: `오늘도 즐거운 하루!`,
		avatar: `https://picsum.photos/seed/1/100`,
		isOnline: true,
		isFriend: true
	},
	{
		id: `2`,
		userId: `minsu_k`,
		name: `김민수`,
		statusMessage: `회의 중입니다.`,
		avatar: `https://picsum.photos/seed/5/100`,
		isOnline: false,
		isFriend: true
	},
	{
		id: `3`,
		userId: `jiwon_lee`,
		name: `이지원`,
		statusMessage: `mimir 최고예요 ✨`,
		avatar: `https://picsum.photos/seed/6/100`,
		isOnline: true,
		isFriend: true
	},
	{
		id: `4`,
		userId: `jisung_p`,
		name: `박지성`,
		statusMessage: `축구 보고 싶다`,
		avatar: `https://picsum.photos/seed/7/100`,
		isOnline: false,
		isFriend: true
	},
	{
		id: `5`,
		userId: `yujin_an`,
		name: `안유진`,
		statusMessage: `Love Dive~`,
		avatar: `https://picsum.photos/seed/8/100`,
		isOnline: true,
		isFriend: true
	},
];

export const GLOBAL_DISCOVERY: Friend[] = [
	{
		id: `101`,
		userId: `coffee_lover`,
		name: `커피요정`,
		statusMessage: `원두 볶는 중 ☕`,
		avatar: `https://picsum.photos/seed/c1/200`,
		isOnline: true,
		isFriend: false
	},
	{
		id: `102`,
		userId: `dev_jin`,
		name: `진지한 개발자`,
		statusMessage: `버그는 나의 친구`,
		avatar: `https://picsum.photos/seed/c2/200`,
		isOnline: false,
		isFriend: false
	},
	{
		id: `103`,
		userId: `traveler_s`,
		name: `우주여행자`,
		statusMessage: `다음은 화성인가?`,
		avatar: `https://picsum.photos/seed/c3/200`,
		isOnline: true,
		isFriend: false
	},
	{
		id: `104`,
		userId: `mimir_fan`,
		name: `미미르팬`,
		statusMessage: `AI 채팅 너무 재밌어요`,
		avatar: `https://picsum.photos/seed/c4/200`,
		isOnline: true,
		isFriend: false
	},
];