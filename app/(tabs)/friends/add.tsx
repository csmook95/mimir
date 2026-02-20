import { Link } from "expo-router";
import { useState } from "react";
import { Button, FlatList, Image, Text, TextInput, View } from "react-native";


const friends = Array.from({ length: 50 }, (_, i) => ({
	id: i + 1,
	name: `친구 ${i + 1}`,
	lastMessage: `마지막 대화 내용입니다. (${i + 1})`
}));


export default function Add() {
	const [friendId, setFriendId] = useState(``);

	return (
		<View className="flex-1 gap-[5px]">
			<FlatList
				data={friends}
				keyExtractor={(item) => item.id.toString()}
				contentContainerClassName="gap-[5px]"
				renderItem={({ item }) => (
					<Link href={`/friends/${item.id}`} className="flex-row gap-[10px]">
						<Image source={{ uri: `https://github.com/shadcn.png` }} className="rounded-full w-[50px] h-[50px]" />
						<View className="justify-center">
							<Text>{item.name}</Text>
							<Text>{item.lastMessage}</Text>
						</View>
					</Link>
				)}
			/>
			<View className="flex-row gap-[5px]">
				<TextInput placeholder="아이디를 입력하세요." value={friendId} onChangeText={setFriendId} className="flex-1" />
				<Button title="검색" onPress={() => { }} />
			</View>
		</View>
	);
}
