import {StyleSheet, View} from 'react-native';
import {Main} from "./src/Main";

export default function App() {
    return (
        <View style={styles.container}>
            <Main/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6fcce8',
        marginTop: 50,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});
