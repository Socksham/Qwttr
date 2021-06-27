import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import QwttrHomeScreen from './QwttrHomeScreen';
import QwttrPostScreen from './QwttrPostScreen';
import { NavigationContainer } from "@react-navigation/native"

const Stack = createStackNavigator();

const QwttrRoutes = () => {
    return (
        <NavigationContainer independent="true">
            <Stack.Navigator mode="modal">
                <Stack.Screen name="QwttrHome" component={QwttrHomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="QwttrPost" component={QwttrPostScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default QwttrRoutes
