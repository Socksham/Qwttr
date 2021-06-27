import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import colors from '../config/colors';
import { auth, db } from '../config/Firebase';
import RNPickerSelect from 'react-native-picker-select';

export default function Signup(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [userType, setUserType] = useState('quitter')
    const [error, setError] = useState('')

    const registerUser = async () => {
        if (email === '' && password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            setIsLoading(true)
            await auth
                .createUserWithEmailAndPassword(email, password)
            console.log('User registered successfully!')
            await auth.signInWithEmailAndPassword(email, password)
            let user = auth.currentUser

            db.collection("users").doc(user.uid).set({
                "user": user.email,
                "uid": user.uid,
                "userType": userType
            })

            props.navigation.navigate("Survey")

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
                autoCapitalize="none"
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={password}
                onChangeText={(val) => setPassword(val)}
                maxLength={15}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <RNPickerSelect
                value={userType}
                onValueChange={(value) => setUserType(value)}
                items={[
                    { label: 'Advisor', value: 'advisor' },
                    { label: 'Quitter', value: 'quitter' },
                ]}
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