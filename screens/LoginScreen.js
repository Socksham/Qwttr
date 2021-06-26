import React, { useState, useEffect } from 'react'
import { auth } from '../config/Firebase'
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

export default function LoginScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user.email)
                props.navigation.navigate("Routes")
            }
        })
    }, [])

    const login = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                props.navigation.navigate('Routes')

            })
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={(email) => setEmail(email)}
                placeholder="Email"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => login()}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button
                title="Don't have an account yet? Sign up"
                color={colors.secondary}
                onPress={() => props.navigation.navigate("Signup")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    inputBox: {
        width: "85%",
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: colors.secondary,
        borderBottomWidth: 1,
        textAlign: "center",
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: "center",
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    buttonSignup: {
        fontSize: 12,
        color: colors.secondary,
    },
    topView: {
        width: "100%",
        height: "7%",
        backgroundColor: colors.primary,
    },
    logoIcon: {
        height: "30%",
    },
});
