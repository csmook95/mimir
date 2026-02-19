import { Link } from "expo-router";
import { useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";


const friends = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `친구 ${i + 1}`,
    lastMessage: `마지막 대화 내용입니다. (${i + 1})`
}));


export default function Add() {
    const [friendId, setFriendId] = useState("");

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
            <View style={styles.inputContainer}>
                <TextInput placeholder="아이디를 입력하세요." value={friendId} onChangeText={setFriendId} style={styles.input} />
                <Button title="검색" onPress={() => { }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
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
    inputContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    input: {
        flex: 1,
    },
});
