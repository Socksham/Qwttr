import React from 'react'
import { SafeAreaView, Text } from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import QwttrHomeScreen from './QwttrHomeScreen';
import QwttrMessagesScreen from './QwttrMessagesScreen';
import QwttrRoutes from './QwttrRoutes';

const Drawer = createDrawerNavigator()

function QwttrScreen(props) {
    return (
        <NavigationContainer independent="true">
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={QwttrRoutes}></Drawer.Screen>
                <Drawer.Screen name="Messages" component={QwttrMessagesScreen}></Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default QwttrScreen
