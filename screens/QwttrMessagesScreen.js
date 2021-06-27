import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db } from "../config/Firebase"

export default function Example(props) {
    const [messages, setMessages] = useState([]);

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
    }

    useEffect(() => {
        
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </View>
    )
}