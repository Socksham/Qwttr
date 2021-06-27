import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Avatar, Icon } from "react-native-elements"
import { Button } from "react-native-elements"
import colors from '../config/colors';
import Comments from './Comments';

function Post(props) {
    return (
        <View style={styles.card}>
            <View style={styles.flex}>
                <Avatar
                    title={props.item.user.charAt(0).toUpperCase()}
                    activeOpacity={0.7}
                    rounded
                    size='small'
                    overlayContainerStyle={{ backgroundColor: colors.secondary }}
                />
                <View style={styles.body}>
                    <Text style={styles.text}>{props.item.user}</Text>
                    <View style={{marginBottom: 10, marginTop: 10, marginLeft:"3%"}}>
                        <Image style={{width: 250, height: 175, borderRadius:"10%"}} source={{uri: props.item.image}} />
                    </View>
                    <Text style={{fontWeight:"600"}}>{props.item.title}</Text>
                    <Text>{props.item.text}</Text>
                    <View style={styles.buttonBar}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {props.navigation.navigate("QwttrPost")}}
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
                            onPress={() => {props.navigation.navigate("QwttrPost")}}
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
                    <Comments item={props.item}/>
                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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
