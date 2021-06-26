// import React from 'react'
// import { View, Text, StyleSheet, Button, Alert, ActivityIndicatorBase } from 'react-native'

// export default function SignupScreen() {

//     const registerUser = () => {

//     }

//     return (
//         <View>
//             <Text>Signup</Text>
//         </View>
//     )
// }

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../config/Firebase';

export default function Signup(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    // constructor() {
    //     super();
    //     this.state = {
    //         displayName: '',
    //         email: '',
    //         password: '',
    //         isLoading: false
    //     }
    // }

    // updateInputVal = (val, prop) => {
    //     const state = this.state;
    //     state[prop] = val;
    //     this.setState(state);
    // }

    const registerUser = () => {
        if (email === '' && password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            setIsLoading(true)
            auth
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log('User registered successfully!')
                    props.navigation.navigate('Login')
                    setIsLoading(false)
                    setDisplayName('')
                    setEmail('')
                    setPassword('')
                    console.log('navigating to login')
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
                color="#3740FE"
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
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
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