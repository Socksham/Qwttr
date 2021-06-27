import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler"
import { Icon } from "react-native-elements"
import colors from '../config/colors';
import { db } from '../config/Firebase';
import Post from '../components/Post';

const QwttrHomeScreen = (props) => {

    const [data, setData] = useState()

    const getData = async () => {
        const snapshot = await db.collection('posts').get()
        setData(snapshot.docs.map(doc => doc.data()))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <SafeAreaView>
            <View style={styles.flex}>
                <Text style={styles.largeText}>Home</Text>
                <View style={styles.icon}
                >
                    <Icon
                        name='add-outline'
                        type='ionicon'
                        color={colors.primary}
                        // reverse={true}
                        raised={true}
                        onPress={() => {
                            props.navigation.navigate("QwttrPost")
                        }}
                    />
                </View>
            </View>
            <View style={styles.posts}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <Post item={item} />
                        )
                    }}
                    keyExtractor={item => item.uid}
                />
            </View>

        </SafeAreaView>
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
        marginLeft: 15,
        marginRight: 20,
    }
})

export default QwttrHomeScreen
