import { MOCK_FRIENDS, UserProfile } from "@/constants/mocks";
import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";


export default function Index() {
	const [userProfile, setUserProfile] = useState<UserProfile>({
		name: `나 (mimir 사용자)`,
		statusMessage: `오늘도 스마트하게 답장하기 ✨`,
		avatar: `https://picsum.photos/seed/me/400`,
		userId: `mimir_user_77`
	});

	return <View className="flex-1 overflow-y-auto pb-24 bg-[#FFF8F0]">
		<View className="p-6">
			<View className="relative group">
				<TextInput
					placeholder="이름으로 검색"
					className="w-full bg-white border border-[#E6D5C3]/50 rounded-[20px] py-3.5 px-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] focus:border-transparent shadow-sm transition-all"
				/>
				<Svg className="w-5 h-5 text-[#8D6E63] absolute left-4 top-3.5 opacity-40 group-focus-within:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</Svg>
			</View>
		</View>

		<View className="px-6 mb-8">
			<label className="text-[11px] font-black text-[#8D6E63] uppercase tracking-[0.1em] mb-3 block px-1 opacity-60">내 프로필</label>
			<View
				className="flex items-center p-4 bg-white rounded-[32px] border border-[#FF9F1C]/20 shadow-xl shadow-orange-100/50 cursor-pointer hover:bg-[#FFF1E0] transition-all group active:scale-[0.98]"
			>
				<View className="relative">
					<Image source={{ uri: `https://github.com/shadcn.png` }} alt="Me" className="w-16 h-16 rounded-[24px] object-cover border-2 border-white shadow-md" />
					<View className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-xl shadow-lg">
						<Svg className="w-3.5 h-3.5 text-[#FF9F1C]" fill="currentColor" viewBox="0 0 20 20">
							<Path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
						</Svg>
					</View>
				</View>
				<View className="ml-4 flex-1">
					<h3 className="font-black text-[#5D4037] text-xl group-hover:text-[#FF9F1C] transition-colors">{userProfile.name}</h3>
					<p className="text-xs text-[#8D6E63] font-medium opacity-70 truncate">{userProfile.statusMessage}</p>
				</View>
			</View>
		</View>

		<View className="px-6">
			<View className="flex justify-between items-center mb-3 px-1">
				<Text className="text-[11px] font-black text-[#8D6E63] uppercase tracking-[0.1em] opacity-60">친구 {MOCK_FRIENDS.length}</Text>
			</View>
			<View className="bg-white rounded-[32px] p-2 shadow-sm border border-[#E6D5C3]/30 overflow-hidden">
				{MOCK_FRIENDS.map((friend, idx) => (
					<View
						key={friend.id}
						className={`flex items-center p-4 hover:bg-[#FFF8F0] rounded-[24px] cursor-pointer transition-all active:scale-[0.98] group ${idx !== MOCK_FRIENDS.length - 1 ? `border-b border-[#E6D5C3]/10` : ``}`}
					>
						<View className="relative">
							<Image source={{ uri: friend.avatar }} alt={friend.name} className="w-12 h-12 rounded-[18px] object-cover border-2 border-white shadow-sm" />
							{friend.isOnline && (
								<View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
							)}
						</View>
						<View className="ml-4 flex-1">
							<h3 className="font-bold text-[#5D4037] group-hover:text-[#FF9F1C] transition-colors">{friend.name}</h3>
							<p className="text-[11px] text-[#8D6E63] font-medium opacity-60 truncate">{friend.statusMessage}</p>
						</View>
					</View>
				))}
			</View>
		</View>
	</View>;
}

