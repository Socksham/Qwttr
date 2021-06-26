import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { View, Text, Button, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import { createBottomTabsNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import colors from "../config/colors"

const Tabs = createBottomTabsNavigator()

function Home(){

}

function Logout(){

}

function Routes() {
    return (
        <NavigationContainer>
            <Tabs.Navigator initialRoute="Home"
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName
                }
            })}>

            </Tabs.Navigator>
        </NavigationContainer>
    )
}

export default Routes
