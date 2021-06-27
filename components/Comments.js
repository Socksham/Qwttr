import React, { useState, useRef } from 'react'
import { View, Text, FlatList } from 'react-native'

const Comments = () => {
    const [data, setData] = useState([])

    useRef(() => {
        
    }, [])
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View>

                        </View>
                    )
                }}
                keyExtractor={item => item.uid}
            />
        </View>
    )
}

export default Comments
