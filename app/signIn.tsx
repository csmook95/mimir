import { useBoundStore } from "@/stores";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from 'react-native-svg';

export default function SignIn() {
    const login = useBoundStore(state => state.login)

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <h1 style={styles.title}>mimir</h1>
                <h2 style={styles.subtitle}>지혜의 샘에서 길어 올린 다정한 문장</h2>
                <h3 style={styles.subtitle2}>지금 미미르와 대화를 시작해보세요</h3>
            </View>

            <Pressable
                onPress={login}
                style={({ pressed, hovered }: any) => [
                    styles.button,
                    hovered && styles.buttonHover,
                    pressed && styles.buttonActive
                ]}
            >
                {({ pressed, hovered }: any) => (
                    <>
                        <View style={[
                            styles.iconContainer,
                            (pressed || hovered) && styles.iconRotate
                        ]}>
                            <Svg viewBox="0 0 24 24" >
                                <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </Svg>
                        </View>
                        <Text style={styles.buttonText}>Google로 계속하기</Text>
                    </>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFF8F0",
        paddingBottom: 50,
    },
    textContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        paddingTop: 50,
    },
    title: {
        fontSize: 48,
        color: "#5D4037",
        fontFamily: "Pretendard-Bold",
        letterSpacing: 2,
    },
    subtitle: {
        color: "#8D6E63",
        fontFamily: "Pretendard-SemiBold",
        fontSize: 16,
    },
    subtitle2: {
        color: "#8D6E63",
        fontFamily: "Pretendard-Regular",
        fontSize: 12,
        opacity: 0.6,
    },
    button: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: '#5D4037',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 28,
        shadowColor: '#5D4037',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
        transitionProperty: 'background-color, transform',
        transitionDuration: '200ms',
    },
    buttonHover: {
        backgroundColor: '#795548', // 마우스 오버 시 약간 밝아짐
    },
    buttonActive: {
        transform: [{ scale: 0.95 }],
        backgroundColor: '#4A332C', // 클릭 시 더 어두워짐
    },
    iconContainer: {
        width: 28,
        height: 28,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 5,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconRotate: {
        transform: [{ rotate: '12deg' }],
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Pretendard-Bold',
    },
});