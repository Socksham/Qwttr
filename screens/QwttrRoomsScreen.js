import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { db, auth } from '../config/Firebase'

const QwttrRoomsScreen = (props) => {
    const [rooms, setRooms] = useState([])

    const getRooms = () => {
        setRooms([])

        let email = auth.currentUser.email
        console.log(email)
        db.collection("rooms").where("user1", "==", email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setRooms(oldArray => [...oldArray, doc.data()])
                // console.log(doc.data())
            })
        })
        db.collection("rooms").where("user2", "==", email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setRooms(oldArray => [...oldArray, doc.data()])
                // console.log(doc.data())
            })
        })
    }

    useEffect(() => {
        console.log("WFUEF")
        getRooms()
    }, [])

    return (
        <SafeAreaView>
            <FlatList
                data={rooms}
                renderItem={({ item }) => {
                    console.log(rooms)
                    return (
                        <View>
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate("Messages", {
                                    room: `${item.user1}${item.user2}`,
                                })
                            }}>
                            <Text>{item.user1} {item.user2}</Text>

                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={item => item.uid}
            />
        </SafeAreaView>
    )
}

export default QwttrRoomsScreen
