import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import colors from '../config/colors';
import { auth } from '../config/Firebase';

export default function Signup(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const registerUser = () => {
        if (email === '' && password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            setIsLoading(true)
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log('User registered successfully!')
                    auth.signInWithEmailAndPassword(email, password)
                    .then((res) => {
                        props.navigation.navigate('Routes')

                    })
                })
                .catch(error => setError(error.message))
        }
    }

    if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={email}
                onChangeText={(val) => setEmail(val)}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={password}
                onChangeText={(val) => setPassword(val)}
                maxLength={15}
                secureTextEntry={true}
            />
            <Button
                color={colors.secondary}
                title="Signup"
                onPress={() => registerUser()}
            />

            <Text
                style={styles.loginText}
                onPress={() => props.navigation.navigate('Login')}>
                Already Registered? Click here to login
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: colors.primary
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: colors.secondary,
        borderBottomWidth: 1
    },
    loginText: {
        color: colors.secondary,
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});