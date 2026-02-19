import CustomStack from "@/components/customStack";
import { router, Stack } from "expo-router";
import { Button } from "react-native";

export default function ChannelsLayout() {
	return (
		<CustomStack>
			<Stack.Screen
				name="index"
				options={{
					title: `대화`,
					headerStyle: {
						backgroundColor: `#A67C52`,
					},
					headerTitleStyle: {
						color: `#FFF8F0`,
						fontFamily: `Pretendard-Bold`,
						fontSize: 24,
					},
				}}
			/>
			<Stack.Screen
				name="create"
				options={{
					title: `채널생성`,
					headerLeft: () => (
						<Button title="목록으로" onPress={() => router.push(`/(tabs)/channels`)} />
					),
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: `채널`,
					headerLeft: () => (
						<Button title="목록으로" onPress={() => router.push(`/(tabs)/channels`)} />
					),
				}}
			/>
		</CustomStack>
	);
}
