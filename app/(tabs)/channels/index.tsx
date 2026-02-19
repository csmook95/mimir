import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const channels = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `채널 ${i + 1}`,
    lastMessage: `마지막 대화 내용입니다. (${i + 1})`
}));

const MOCK_CHANNELS = [
    { id: '1', name: '최승묵', lastMessage: '안녕하세요!', time: '오후 2:30', unreadCount: 2, avatar: 'https://picsum.photos/seed/1/100', type: 'dm' },
    { id: '2', name: 'mimir 프로덕트 팀', lastMessage: '이지원: 다음 배포 일정 확인 부탁드려요.', time: '오전 11:15', unreadCount: 0, avatar: 'https://picsum.photos/seed/2/100', type: 'group', memberCount: 5 },
    { id: '3', name: '가족방', lastMessage: '엄마: 오늘 저녁 메뉴 뭐야?', time: '어제', unreadCount: 5, avatar: 'https://picsum.photos/seed/3/100', type: 'group', memberCount: 3 },
    { id: '4', name: '지니', lastMessage: 'AI 기능을 써보세요!', time: '수요일', unreadCount: 0, avatar: 'https://picsum.photos/seed/4/100', type: 'dm' },
    { id: '5', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '6', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '7', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '8', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '9', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '10', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '11', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '12', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '13', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '14', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
    { id: '15', name: '김민수', lastMessage: '넵 알겠습니다.', time: '목요일', unreadCount: 1, avatar: 'https://picsum.photos/seed/5/100', type: 'dm' },
];

const CHAT = { id: '1', name: '최승묵', lastMessage: '안녕하세요!', time: '오후 2:30', unreadCount: 2, avatar: 'https://picsum.photos/seed/1/100', type: 'dm' }


export default function Index() {
    const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'dm' | 'group'>('all');

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                <FlatList
                    data={['all', 'unread', 'dm', 'group'] as const}
                    horizontal
                    scrollEnabled={false}
                    keyExtractor={(item) => item}
                    renderItem={({ item: tab }) => (
                        <Pressable
                            onPress={() => setActiveTab(tab)}
                            style={styles.tabItem}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === tab ? styles.tabTextActive : styles.tabTextInactive
                            ]}>
                                {tab === 'all' ? '전체' : tab === 'unread' ? '안읽음' : tab === 'dm' ? '개인' : '그룹'}
                            </Text>
                            {activeTab === tab && (
                                <View style={styles.activeIndicator} />
                            )}
                        </Pressable>
                    )}
                />
            </View>

            <FlatList
                data={MOCK_CHANNELS}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: 8, marginBottom: 90, paddingHorizontal: 5 }}
                renderItem={({ item }) => (
                    <Link
                        key={item.id}
                        href={`/channels/${item.id}`}
                        asChild
                    >
                        <Pressable
                            style={styles.chatItem}
                        >
                            <Image source={{ uri: item.avatar }} style={styles.avatarImage} />

                            <View style={styles.chatContent}>
                                <View style={styles.chatHeader}>
                                    <Text style={styles.chatName} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.chatTime}>{item.time}</Text>
                                </View>
                                <Text style={styles.lastMessage} numberOfLines={1}>
                                    {item.lastMessage}
                                </Text>
                            </View>

                            {item.unreadCount > 0 && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadText}>{item.unreadCount}</Text>
                                </View>
                            )}
                        </Pressable>
                    </Link>
                )} />

            <Link href="/channels/create" asChild>
                <Pressable style={
                    // styles.createButton
                    {
                        position: "absolute",
                        bottom: 24,
                        right: 16,
                        width: 48,
                        height: 48,
                        backgroundColor: "#FF9F1C",
                        borderRadius: 24,
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }
                }>
                    <Svg
                        style={{ width: 24, height: 24 }}
                        stroke="white">
                        <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M12 4v16m8-8H4"
                        />
                    </Svg>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
        backgroundColor: '#FFF8F0',
        paddingBottom: 5
    },
    header: {
        flexDirection: 'row',
        gap: 5,
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
    },
    tabItem: {
        padding: 16,
    },
    tabText: {
        fontSize: 11,
        fontFamily: 'Pretendard-Medium',
        letterSpacing: 1,
    },
    tabTextActive: {
        color: '#FF9F1C',
    },
    tabTextInactive: {
        color: '#8D6E63',
        opacity: 0.4,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#FF9F1C',
    },
    channel: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    channelInfo: {
        justifyContent: 'center',
    },
    avatar: {
        borderRadius: 9999,
        width: 50,
        height: 50,
    },
    createButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        padding: 10,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: 'transparent',
        gap: 16,
        width: "100%"
    },
    chatItemHover: {
        backgroundColor: '#FFFBF5',
        borderColor: 'rgba(255, 159, 28, 0.1)',
    },
    chatItemPressed: {
        transform: [{ scale: 0.98 }],
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatarImage: {
        width: 56,
        height: 56,
        borderRadius: 22,
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 16,
        height: 16,
        backgroundColor: '#22C55E',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 8,
    },
    chatContent: {
        flex: 1,
        gap: 2,
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    chatName: {
        fontSize: 16,
        fontFamily: 'Pretendard-Bold',
        color: '#5D4037',
    },
    chatTime: {
        fontSize: 10,
        fontFamily: 'Pretendard-Bold',
        color: '#8D6E63',
        opacity: 0.4,
    },
    lastMessage: {
        fontSize: 14,
        fontFamily: 'Pretendard-Medium',
        color: '#8D6E63',
        opacity: 0.7,
        lineHeight: 20,
    },
    unreadBadge: {
        marginLeft: 12,
        backgroundColor: '#FF9F1C',
        minWidth: 22,
        height: 22,
        paddingHorizontal: 6,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'Pretendard-Bold',
    },
});
