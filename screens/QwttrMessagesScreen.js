import React, { useState, useCallback, useEffect } from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-navigation';
import { auth, db } from "../config/Firebase"
import { v4 as uuidv4 } from 'uuid';

export default function QwttrMessagesScreen({ route, navigation }) {


    const [messages, setMessages] = useState([]);

    const { room } = route.params

    const [size, setSize] = useState(0)

    // setMessages([
    //     {
    //         _id: 1,
    //         text: 'Hello developer',
    //         createdAt: new Date(),
    //         user: {
    //             _id: 2,
    //             name: 'catchgsaksham@gmail.com',
    //         },
    //     },
    // ])

    const getMessages = () => {
        db.collection("rooms").doc(room).collection("messages").get().then((querySnapshot => {
            querySnapshot.forEach((doc) => {
                let docData = doc.data()
                // alert(docData._id)
                // alert(docData.createdAt)

                // alert(docData.text)

                // alert(docData._id)

                setMessages(oldArray => [...oldArray, {
                    _id: docData._id,
                    createdAt: docData.createdAt.toDate(),
                    text: docData.text,
                    user: {
                        _id: docData.user_id,
                        name: docData.user_name
                    }
                }])
            })
        }))
    }

    useEffect(() => {
        getMessages()
    }, [])

    const onSend = useCallback(async (messages = []) => {
        let uuid = uuidv4()

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        let email = auth.currentUser.email

        db.collection("rooms").doc(room).collection("messages").get().then(snap => {
            size = snap.size
        })

        const query = db.collection("rooms").doc(room).collection("messages")
        const snapshot = await query.get()
        const count = snapshot.size

        db.collection("rooms").doc(room).collection("messages").doc(uuid).set({
            _id: count + 1,
            text: messages[messages.length - 1].text,
            createdAt: new Date(),
            user_id: 1,
            user_name: email
        }
        )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </SafeAreaView>
    )
}