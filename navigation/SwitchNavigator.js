import React from 'react'
import { View, Text } from 'react-native'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'

export const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Signup: {
            screen: Signup
        },
        Routes: {
            screen: Routes
        }
    }
)