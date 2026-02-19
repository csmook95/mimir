import { useBoundStore } from "@/stores";
import { Stack } from "expo-router";

export default function CustomStack({ children }: { children: React.ReactNode }) {
    const logout = useBoundStore(state => state.logout)

    return (
        <Stack screenOptions={{
            headerLeft: () => null,
            // headerRight: () => <Button title="로그아웃" onPress={() => { logout() }}></Button>,
            // headerLeftContainerStyle: { padding: 5 },
            // headerRightContainerStyle: { padding: 5 },
        }}>
            {children}
        </Stack>
    );
}
