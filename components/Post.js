import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Avatar, Icon } from "react-native-elements"
import { Button } from "react-native-elements"
import colors from '../config/colors';

function Post({ item }) {
    return (
        <View style={styles.card}>
            <View style={styles.flex}>
                <Avatar
                    title={item.user.charAt(0).toUpperCase()}
                    activeOpacity={0.7}
                    rounded
                    size='medium'
                    overlayContainerStyle={{ backgroundColor: 'grey' }}
                />
                <View style={styles.body}>
                    <Text style={styles.text}>{item.user}</Text>
                    <Text>{item.text}</Text>
                    <Image source="" />
                    <View style={styles.buttonBar}>
                        <TouchableOpacity
                            style={styles.button}
                        >
                            <Icon
                                name='heart-outline'
                                type='ionicon'
                                color={'black'}
                                size={20}
                            />
                            <Text style={styles.btnText}>Like
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                        >
                            <Icon
                                name='chatbubble-outline'
                                type='ionicon'
                                color={'black'}
                                size={20}
                            />
                            <Text style={styles.btnText}>Comment
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: 'white'
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
        marginBottom: 3
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
    button: {
        marginTop: 15,
        // backgroundColor: "green",
        flexDirection: "row",
        alignItems: 'center',
    },
    btnText: {
        color: 'black',
        marginLeft: 5
    }
})

export default Post
