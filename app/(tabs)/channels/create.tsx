import { GLOBAL_DISCOVERY, MOCK_FRIENDS } from "@/constants/constants";
import { Friend } from "@/constants/mocks";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Create() {
	const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
	const [channelName, setChannelName] = useState(``);
	const [isGenerating, setIsGenerating] = useState(false);
	const [searchQuery, setSearchQuery] = useState(``);
	const [isSearchFocused, setIsSearchFocused] = useState(false);

	const isGroup = selectedFriends.length > 1;

	// 통합 검색 로직 (Universal Search)
	const { friendsResults, globalResults } = useMemo(() => {
		if (!searchQuery.trim()) {
			return {
				friendsResults: MOCK_FRIENDS,
				globalResults: []
			};
		}

		const isIdSearch = searchQuery.startsWith(`@`);
		const cleanQuery = (isIdSearch ? searchQuery.slice(1) : searchQuery).toLowerCase();

		const filterFn = (f: Friend) => {
			const nameMatch = f.name.toLowerCase().includes(cleanQuery);
			const idMatch = f.userId?.toLowerCase().includes(cleanQuery);
			return isIdSearch ? idMatch : (nameMatch || idMatch);
		};

		return {
			friendsResults: MOCK_FRIENDS.filter(filterFn),
			globalResults: GLOBAL_DISCOVERY.filter(filterFn),
		};
	}, [searchQuery]);

	const toggleFriend = (id: string) => {
		setSelectedFriends(prev =>
			prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
		);
	};

	const handleAiNameRecommendation = async () => {
		if (selectedFriends.length < 2) return;
		setIsGenerating(true);
		try {
			const selectedNames = MOCK_FRIENDS
				.filter(f => selectedFriends.includes(f.id))
				.map(f => f.name)
				.join(`, `);
			const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
			const response = await ai.models.generateContent({
				model: `gemini-3-flash-preview`,
				contents: `${selectedNames} 친구들과 함께하는 단체 채팅방 이름을 추천해줘. 센스 있고 재미있는 걸로 하나만 짧게(텍스트만) 출력해줘.`,
			});
			setChannelName(response.text?.replace(/"/g, ``).trim() || `즐거운 모임`);
		} catch (error) {
			console.error(error);
			setChannelName(`mimir 그룹 채팅`);
		} finally {
			setIsGenerating(false);
		}
	};

	return <View className="gap-6 pb-20 bg-[#FFFBF5]">
		{selectedFriends.length > 0 && (
			<View className="bg-white px-6 py-5 flex space-x-4 overflow-x-auto border-b border-[#E6D5C3]/10 shrink-0 min-h-[110px] items-center">
				<FlatList
					data={selectedFriends}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item}
					renderItem={({ item }) => {
						const friend = MOCK_FRIENDS.find(f => f.id === item);

						return (
							<View key={item} className="flex flex-col items-center shrink-0 animate-in zoom-in duration-300">
								<View className="relative group">
									<Image source={{ uri: friend?.avatar }} className="w-14 h-14 rounded-[20px] object-cover border-2 border-[#FF9F1C] shadow-lg" alt={friend?.name} />
									<Pressable
										onPress={() => toggleFriend(item)}
										className="absolute -top-1.5 -right-1.5 bg-[#5D4037] text-white rounded-xl p-1 shadow-md hover:scale-110 transition-transform"
									>
										<Svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
										</Svg>
									</Pressable>
								</View>
								<Text className="text-[10px] font-black text-[#5D4037] mt-2 tracking-tighter opacity-80">
									{friend?.name}
								</Text>
							</View>
						);
					}}
				/>
			</View>
		)}

		{/* Group Name Section */}
		{isGroup && (
			<View className="p-8 bg-gradient-to-b from-[#FFF9F2] to-transparent">
				<View className="flex justify-between items-center mb-3 px-1">
					<Text className="text-[11px] font-black text-[#8D6E63] uppercase tracking-[0.2em] opacity-60">그룹 이름</Text>
					<Pressable
						onPress={handleAiNameRecommendation}
						disabled={isGenerating}
						className="text-[11px] font-black text-[#FF9F1C] hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 py-1 px-3 bg-[#FF9F1C]/10 rounded-full"
					>
						<Text>{isGenerating ? `추천 중...` : `✨ AI 추천`}</Text>
					</Pressable>
				</View>
				<TextInput
					value={channelName}
					onChangeText={setChannelName}
					placeholder="예: 즐거운 우리 모임"
					className="w-full bg-white border border-[#E6D5C3]/50 rounded-[22px] py-4 px-6 text-sm font-bold focus:ring-4 focus:ring-[#FF9F1C]/10 shadow-xl shadow-orange-100/30 outline-none transition-all"
				/>
			</View>
		)}

		{/* Search Bar */}
		<View className="flex px-6 mt-6">
			<View className={`flex-row items-center gap-3 bg-white border border-[#E6D5C3]/40 rounded-[24px] py-4 pl-5 pr-3 transition-all shadow-sm${isSearchFocused ? ` ring-4 ring-[#FF9F1C]/10 border-[#FF9F1C]` : ``}`}>
				<Svg
					className={`transition-colors duration-300 w-6 h-6${searchQuery ? ` text-[#FF9F1C]` : ` text-[#8D6E63] opacity-30`}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</Svg>

				<TextInput
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="이름 또는 @아이디 검색"
					className="flex-1 text-sm font-bold text-[#5D4037] outline-none"
					onFocus={() => setIsSearchFocused(true)}
					onBlur={() => setIsSearchFocused(false)}
				/>

				{!!searchQuery && (
					<Pressable
						onPress={() => setSearchQuery(``)}
						className="text-[#8D6E63] opacity-40 hover:opacity-100 transition-opacity"
					>
						<Svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
						</Svg>
					</Pressable>
				)}
			</View>

			{/* Friends Section */}
			<View className="space-y-1">
				<Text className="text-[10px] font-black text-[#8D6E63] uppercase tracking-widest opacity-40 mb-3 block px-2">
					{searchQuery ? `검색된 친구` : `친구 목록`} ({friendsResults.length})
				</Text>
				{
					friendsResults.length > 0
						? <FlatList
							data={friendsResults}
							keyExtractor={(item) => item.id.toString()}
							contentContainerClassName="gap-2 pb-[90px] px-[5px]"
							renderItem={({ item: friend }) => {
								const isSelected = selectedFriends.includes(friend.id);

								return (
									<Pressable
										onPress={() => toggleFriend(friend.id)}
										className={`flex items-center p-4 rounded-[28px] cursor-pointer transition-all active:scale-[0.98] mb-1 ${isSelected
											? `bg-[#FF9F1C]/10 border border-[#FF9F1C]/20 shadow-sm`
											: `bg-white hover:bg-[#FFF8F0] border border-transparent`}`
										}
									>
										<Image
											src={friend.avatar}
											className="w-12 h-12 rounded-[18px] object-cover border-2 border-white shadow-sm hover:scale-110 transition-transform"
											alt={friend.name}
										/>
										<View
											className="ml-4 flex-1"
										>
											<View className="flex items-center space-x-1.5">
												<Text className="font-black text-[#5D4037] text-sm">{friend.name}</Text>
												<Text className="text-[9px] font-black text-[#8D6E63] opacity-30">@{friend.userId}</Text>
											</View>
											<Text className="text-[10px] font-medium text-[#8D6E63] opacity-50 truncate line-clamp-1">{friend.statusMessage}</Text>
										</View>
										<Pressable
											onPress={() => toggleFriend(friend.id)}
											className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${isSelected ? `bg-[#FF9F1C] border-[#FF9F1C] scale-110 shadow-lg shadow-orange-200` : `border-[#E6D5C3] bg-white`}`}
										>
											{isSelected && <Svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></Svg>}
										</Pressable>
									</Pressable>
								);
							}}
						/>
						: searchQuery
						&& <View className="p-8 text-center bg-white/40 rounded-[28px] border border-dashed border-[#E6D5C3]/30 mb-6">
							<Text className="text-xs font-bold text-[#8D6E63] opacity-40 italic">검색 결과가 없습니다.</Text>
						</View>
				}
			</View>

			{/* Global Search Results (Other Users) */}
			{(searchQuery.length > 0 || globalResults.length > 0) && (
				<View className="mt-8 space-y-1">
					<Text className="text-[10px] font-black text-[#FF9F1C] uppercase tracking-widest opacity-60 mb-3 block px-2">새로운 사람 발견</Text>

					{globalResults.length > 0 ? (
						globalResults.map((user) => (
							<View
								key={user.id}
								className="flex items-center p-4 bg-white rounded-[28px] border border-[#E6D5C3]/20 hover:border-[#FF9F1C]/30 hover:shadow-md transition-all group mb-1"
							>
								<Image
									src={user.avatar}
									className="w-12 h-12 rounded-[18px] object-cover border-2 border-white shadow-sm hover:scale-105 transition-transform cursor-pointer"
									alt={user.name}
								/>
								<View
									className="ml-4 flex-1 cursor-pointer"
								>
									<View className="flex items-center space-x-1.5">
										<Text className="font-black text-[#5D4037] text-sm group-hover:text-[#FF9F1C] transition-colors">{user.name}</Text>
										<Text className="text-[9px] font-black text-[#8D6E63] opacity-40 bg-gray-50 px-1.5 py-0.5 rounded-md">@{user.userId}</Text>
									</View>
									<Text className="text-[10px] font-medium text-[#8D6E63] opacity-50 truncate line-clamp-1">{user.statusMessage}</Text>
								</View>
								<View className="flex space-x-2">
									<Pressable
										className="w-10 h-10 bg-[#5D4037]/5 text-[#5D4037] rounded-xl flex items-center justify-center hover:bg-[#5D4037] hover:text-white transition-all shadow-sm active:scale-95"
									>
										<Svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></Svg>
									</Pressable>
									<Pressable
										className="w-10 h-10 bg-[#FF9F1C]/10 text-[#FF9F1C] rounded-xl flex items-center justify-center hover:bg-[#FF9F1C] hover:text-white transition-all shadow-sm active:scale-95"
									>
										<Svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></Svg>
									</Pressable>
								</View>
							</View>
						))
					) : searchQuery.length > 0 && (
						<View className="p-8 text-center bg-gray-50 rounded-[28px] border border-dashed border-[#E6D5C3]/20">
							<Text className="text-xs font-bold text-[#8D6E63] opacity-30 italic">검색 결과가 없습니다.</Text>
						</View>
					)}
				</View>
			)}
		</View>
	</View >;
}