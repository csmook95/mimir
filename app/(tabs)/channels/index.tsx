import { MOCK_CHANNELS } from "@/constants/mocks";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { TABS } from "../../../constants/constants";

export default function Index() {
	const [activeTab, setActiveTab] = useState(TABS[0].id);
	const listRef = useRef<FlatList>(null);

	useEffect(() => {
		listRef.current?.scrollToOffset({
			offset: 0,
			animated: true
		});
	}, [activeTab]);

	const filteredChannels = MOCK_CHANNELS.filter((channel) => {
		switch (activeTab) {
			case `all`:
				return true;
			case `unread`:
				return channel.unreadCount > 0;
			case `dm`:
				return channel.type === `dm`;
			case `group`:
				return channel.type === `group`;
		}
	});

	return (
		<View className="flex-1 bg-[#FFF8F0] pb-[5px]">
			<View className="flex-row bg-white px-6">
				<FlatList
					data={TABS}
					horizontal
					scrollEnabled={false}
					keyExtractor={(item) => item.id}
					renderItem={({ item: tab }) => (
						<Pressable
							onPress={() => setActiveTab(tab.id)}
							className="p-4"
						>
							<Text className={`text-[11px] font-[Pretendard-Medium] tracking-widest ${activeTab === tab.id ? `text-[#FF9F1C]` : `text-[#8D6E63] opacity-40`}`}>
								{tab.name}
							</Text>
							{activeTab === tab.id && (
								<View className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#FF9F1C]" />
							)}
						</Pressable>
					)}
				/>
			</View>

			<FlatList
				ref={listRef}
				data={filteredChannels}
				keyExtractor={(item) => item.id.toString()}
				contentContainerClassName="gap-2 p-4 pb-[90px] scroll-smooth"
				renderItem={({ item }) => (
					<Link
						key={item.id}
						href={`/channels/${item.id}`}
						asChild
					>
						<Pressable
							className="flex-row items-center p-4 bg-white rounded-[32px] border border-transparent gap-4 w-full shadow-sm transition-all active:scale-[0.98] hover:bg-[#FFFBF5] hover:border-[#FF9F1C]/10 hover:shadow-md"
						>
							<Image source={{ uri: item.avatar }} className="w-[56px] h-[56px] rounded-[22px]" />

							<View className="flex-1 gap-[2px]">
								<View className="flex-row items-center gap-2">
									<Text className="text-base font-[Pretendard-Bold] text-[#5D4037]" numberOfLines={1}>
										{item.name}
									</Text>
									<Text className="text-[10px] font-[Pretendard-Bold] text-[#8D6E63] opacity-40">
										{item.time}
									</Text>
								</View>
								<Text className="text-[14px] font-[Pretendard-Medium] text-[#8D6E63] opacity-70 leading-5" numberOfLines={1}>
									{item.lastMessage}
								</Text>
							</View>

							{
								item.unreadCount > 0
								&& <View className="ml-3 bg-[#FF9F1C] min-w-[22px] h-[22px] px-[6px] rounded-[11px] items-center justify-center">
									<Text className="text-white text-[10px] font-[Pretendard-Bold]">
										{item.unreadCount}
									</Text>
								</View>
							}
						</Pressable>
					</Link>
				)}
			/>

			<Link href="/channels/create" asChild>
				<Pressable className="absolute bottom-6 right-4 w-12 h-12 bg-[#FF9F1C] rounded-full justify-center items-center shadow-[0_12px_40px_rgba(255,159,28,0.4)] elevation-5 hover:scale-110 active:scale-95 transition-all group">
					<Svg
						className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
						stroke="white"
					>
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