import { Link } from "expo-router";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";

const friends = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `친구 ${i + 1}`,
    lastMessage: `상태메시지(${i + 1})`
}));

export default function Index() {
    return (
        <View style={styles.container}>
            <FlatList
                data={friends}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: 5 }}
                renderItem={({ item }) => (
                    <Link href={`/friends/${item.id}`} style={styles.channel}>
                        <Image source={{ uri: "https://github.com/shadcn.png" }} style={styles.avatar} />
                        <View style={styles.channelInfo}>
                            <Text>{item.name}</Text>
                            <Text>{item.lastMessage}</Text>
                        </View>
                    </Link>
                )} />
            <View style={{}}>
                <Link href="/friends/add" asChild>
                    <Button title="친구추가" />
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5
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
});
