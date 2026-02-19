import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";


export default function Channel() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ id: number; content: string }[]>([]);

    const reversedMessages = [...messages].reverse();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={reversedMessages}
                inverted
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={{ borderWidth: 1 }}>{item.content}</Text>
                )}
            />
            <View style={{ flexDirection: 'row', gap: 5 }}>
                <Button title="부가기능" onPress={() => { }}></Button>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    onKeyPress={(e) => {
                        if (e.nativeEvent.key === 'Enter') {
                            setMessages([...messages, { id: messages.length + 1, content: message }]);
                            setMessage('');
                        }
                    }}
                    style={{ flex: 1 }}
                />
                <Button title="AI모달" onPress={() => { }}></Button>
                <Button title="전송" onPress={() => { }}></Button>
            </View>
        </View>
    );
}