import React, { useState, useEffect } from 'react'
import { auth } from '../config/Firebase'
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../config/colors';

export default function LogoutScreen() {
    const signout = () => {
        auth.signOut()
    }
    return (
        <SafeAreaView>
            <Button title="Logout" onPress={signout} />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    headerView: {
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        bottom: 20,
    },
    flatlistView: {
        flex: 1,
    },
    postElement: {
        width: "100%",
        height: 200,
        borderRadius: 20,
        resizeMode: "cover",
        paddingTop: 20,
    },
    postTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        backgroundColor: colors.primary,
        opacity: 0.8,
    },
    postSubtitle: {
        fontSize: 14,
        color: "white",
        backgroundColor: colors.primary,
        opacity: 0.8,
    },
});
