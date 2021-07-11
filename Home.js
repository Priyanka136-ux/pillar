import React from 'react';
import { View, StyleSheet, Button } from 'react-native';


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        marginTop: 100
    },
    container: {
        flex: 1,
        margin: 25,
        backgroundColor: "white"
    },
    button: {
        width: "50%",
        color: "orangered",
        marginTop: 100,
        marginBottom: 50,
        marginLeft: 80
    },

    buttonSecondary: {
        width: "50%",
        color: "orangered",
        flex: 1,
        marginBottom: 50,
        marginLeft: 80
    }

})
const Home = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button onPress={() => navigation.navigate('Mnemonic')} title="Save" />
            </View>
            <View style={styles.buttonSecondary}>
                <Button onPress={() => navigation.navigate('Transaction')} title="Balance/Transaction" />
            </View>
        </View>
    )
}

export default Home;

