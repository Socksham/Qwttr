import React from 'react'
import { View, Text } from 'react-native'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import Routes from '../screens/Routes'
import SignupScreen from '../screens/SignupScreen'
import SurveyScreen from '../screens/SurveyScreen'

export const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Signup: {
            screen: SignupScreen
        },
        Survey: {
            screen: SurveyScreen
        },
        Routes: {
            screen: Routes
        }
    },
    {
        initialRouteName: "Login"
    }
)