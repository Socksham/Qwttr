import React, { Fragment, useState } from 'react'
import { SafeAreaView, Text, Linking } from 'react-native';
import { View, TextInput, StyleSheet, ImageBackground, Image } from 'react-native'
import { FlatList, TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { Icon } from "react-native-elements"
import { Avatar } from "react-native-elements"
import { auth, db } from '../config/Firebase'

import colors from "../config/colors.js"

const AchievementsScreen = () => {

    let user = auth.currentUser

    const [streakNum, setStreakNum] = useState(0)
    const [numOfFriends, setNumOfFriends] = useState(0)
    const [numOfHobbies, setNumOfHobbies] = useState(0)

    db.collection("users").doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            setStreakNum(doc.data().streakNum)
            console.log("yoyoyoyoyoyoy: " + streakNum)
            setNumOfFriends(doc.data().numOfFriends)
            setNumOfHobbies(doc.data().numOfHobbies)
        } else {
            console.log("THE DOC DOES NOT EXIST... DAH DAH DAHHHHHHHHHH")
        }
    }).catch((error) => {
        console.log("Err getting doc:", error);
    });

    const achievements = [
        {
            title: 'Sober Smoke Streak',
            subtitle: "Keep up the great work!",
            image: {uri: "data:image/jpeg;base64,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"},
            progress: streakNum + " days smoke-free", // fire-base will need to be implemented here
            icon: require("../assets/fire.png"),
            id: '1' 
        },
        {
            title: 'Friend Finder',
            subtitle: "You've made a lot of new friends!",
            image: {uri: "data:image/jpeg;base64,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"},
            progress: numOfFriends + " friends made", // fire-base will need to be implemented here
            icon: require("../assets/laugh.png"),
            id: '2' 
        },
        {
            title: 'Hobby Hoarder',
            subtitle: "Keep exploring new interests!",
            image: {uri: "data:image/jpeg;base64,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"},
            progress: numOfHobbies + " hobbies discovered", // fire-base will need to be implemented here
            icon: require("../assets/artist.png"),
            id: '3' 
        }
    ];

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.secondary }} />
            <SafeAreaView>
                <View style={{height: "12%", justifyContent: "center", alignItems: "center", backgroundColor: colors.secondary}}>
                   <Image style = {{resizeMode: "contain", height: "90%"}} source = {require('../assets/qwttr.jpg')}></Image>
                </View>
                <View style={styles.posts}>
                    <FlatList
                        data={achievements}
                        renderItem={({ item }) => {
                            return (
                                <ImageBackground source={item.icon} style={postStyles.card} blurRadius={2}>
                                    <View style={postStyles.flex}>
                                        <View style={postStyles.body}>
                                            <Text style={postStyles.text}>{item.title}</Text>
                                            <Text style={postStyles.subtitleText}>{item.subtitle}</Text>
                                            <Image source={item.image} />
                                            <View style={postStyles.buttonBar}>
                                                <Text style = {postStyles.progressText}>{item.progress}</Text>
                                            </View>
                                        </View>

                                    </View>

                                </ImageBackground>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </View>

            </SafeAreaView>
        </Fragment>
    )

}

const styles = StyleSheet.create({
    icon: {
        marginTop: 5,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 10
    },
    largeText: {
        fontSize: 60
    },
    posts: {
        marginLeft: 20,
        marginRight: 20,
    }
})

const postStyles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 10
    },
    flex: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 50
    },
    text: {
        fontWeight: "600",
        marginBottom: 3,
        fontSize: 24,
        backgroundColor: colors.primary,
        opacity: 0.7
    },
    body: {
        marginLeft: 7,
        // width: '100%'
    },
    buttonBar: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: "80%"
    },
    progressText: {
        fontWeight: "800",
        marginBottom: 3,
        fontSize: 24,
        backgroundColor: colors.primary,
        opacity: 0.7
    },
    subtitleText: {
        backgroundColor: colors.primary,
        opacity: 0.7
    }
})

export default AchievementsScreen