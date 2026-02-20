import CustomStack from "@/components/customStack";
import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function FriendsLayout() {
	return (
		<CustomStack>
			<Stack.Screen
				name="index"
				options={{
					title: `친구목록`,
					headerStyle: {
						backgroundColor: `#A67C52`,
					},
					headerTitleStyle: {
						color: `#FFF8F0`,
						fontFamily: `Pretendard-Bold`,
						fontSize: 24,
					}
				}}
			/>
			<Stack.Screen
				name="add"
				options={{
					title: `친구추가`,
					headerLeft: () => (
						<Button title="목록으로" onPress={() => router.replace(`/(tabs)/friends`)} />
					),
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: `친구`,
					headerLeft: () => (
						<Button title="목록으로" onPress={() => router.replace(`/(tabs)/friends`)} />
					),
				}}
			/>
		</CustomStack>
	);
}
