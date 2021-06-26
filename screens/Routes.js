import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { View, Text, Button, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import colors from "../config/colors"
import AchievementsScreen from "./AchievementsScreen"
import QwttrScreen from "./QwttrScreen"
import LogoutScreen from "./LogoutScreen"

const Tabs = createBottomTabNavigator()

function Logout() {
    return <LogoutScreen />
}

function Qwttr() {
    return <QwttrScreen />
}

function Achievements() {
    return <AchievementsScreen />
}

function Routes() {
    return (
        <NavigationContainer>
            <Tabs.Navigator initialRoute="Qwttr"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        if (route.name === "Qwttr") {
                            iconName = focused ? 'home' : 'home'
                        } else if (route.name === "Achievements") {
                            iconName = focused ? 'trophy' : 'trophy'
                        } else if (route.name === "Logout") {
                            iconName = focused ? 'logout-variant' : 'logout-variant'
                        }
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                    }
                })} tabBarOptions={{
                    activeTintColor: colors.secondary,
                    inactiveTintColor: colors.primary,
                    style: { 
                        borderTopWidth: 0,
                        elevation: 0
                     }
                }}>
                <Tabs.Screen name="Qwttr" component={Qwttr} options={{ title: "Qwttr" }} />
                <Tabs.Screen name="Achievements" options={{ title: "Achievements" }} component={Achievements} />
                <Tabs.Screen name="Logout" options={{ title: "Logout" }} component={Logout} />
            </Tabs.Navigator>
        </NavigationContainer>
    )
}

export default Routes
