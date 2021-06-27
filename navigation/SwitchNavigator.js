import React from 'react'
import { View, Text, Picker } from 'react-native'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import Routes from '../screens/Routes'
import SignupScreen from '../screens/SignupScreen'
import SurveyScreen from '../screens/SurveyScreen'
import Chatbot from '../screens/Chatbot'
const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        Signup: {
            screen: SignupScreen
        },
        Survey: {
            screen: SurveyScreen
        },
        Routes: {
            screen: Routes
        },
        // Chatbot: {
        //     screen: Chatbot
        // }
    },
    {
        initialRouteName: "Login",
        cardStyle: { backgroundColor: 'white' }
    },

)
export default createAppContainer(SwitchNavigator)