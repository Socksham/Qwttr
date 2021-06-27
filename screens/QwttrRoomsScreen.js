import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { db, auth } from "../config/Firebase";
import { Card, Avatar } from "react-native-elements";
import color from "color";
import colors from '../config/colors';


const QwttrRoomsScreen = (props) => {
    const [rooms, setRooms] = useState([]);

    const getRooms = () => {
        setRooms([]);

        let email = auth.currentUser.email;
        console.log(email);
        db.collection("rooms")
            .where("user1", "==", email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setRooms((oldArray) => [...oldArray, doc.data()]);
                    // console.log(doc.data())
                });
            });
        db.collection("rooms")
            .where("user2", "==", email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setRooms((oldArray) => [...oldArray, doc.data()]);
                    // console.log(doc.data())
                });
            });
    };

    useEffect(() => {
        console.log("WFUEF");
        getRooms();
    }, []);
    let long_name = auth.currentUser.email
    return (
        <SafeAreaView>
            <View style={styles.title}>
            <Text style={styles.titleText}>Friends</Text>

            </View>
            <FlatList
                data={rooms}
                renderItem={({ item }) => {
                    console.log(rooms);
                    return (
                        <View style = {styles.main}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate("Messages", {
                                        room: `${item.user1}${item.user2}`,
                                    });
                                }}
                            >
                                <View style={styles.card}>
                                    <View style={styles.flex}>
                                        <Avatar
                                            title={`${item.user1.replace(auth.currentUser.email, "")}${item.user2.replace(auth.currentUser.email, "")}`.charAt(0).toUpperCase()}
                                            activeOpacity={0.7}
                                            rounded
                                            size='medium'
                                            overlayContainerStyle={{ backgroundColor: colors.secondary }}
                                        />
                                        <View style={styles.body}>
                                            <Text style={styles.text}>{item.user1.replace(auth.currentUser.email, "")}{item.user2.replace(auth.currentUser.email, "")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.uid}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title:{
        justifyContent:"center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 50
    },
    main: {
        borderRadius: 10,
    },
    card: {
        borderRadius: 10,
        backgroundColor: "white",
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
        justifyContent: "center"
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

export default QwttrRoomsScreen;

// .replace(auth.currentUser.email, ""){item.user1.replace(auth.currentUser.email, "")}{item.user2.replace(auth.currentUser.email, "")}
