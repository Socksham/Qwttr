import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native"
import QwttrRoomsScreen from './QwttrRoomsScreen';
import QwttrMessagesScreen from './QwttrMessagesScreen'; 
const Stack = createStackNavigator();

const MessagesStack = () => {
    return (
        <NavigationContainer independent="true">
            <Stack.Navigator>
                <Stack.Screen name="Rooms" component={QwttrRoomsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Messages" component={QwttrMessagesScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MessagesStack
