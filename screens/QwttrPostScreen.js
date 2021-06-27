import React, { useState, useRef } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform, TextInput, Button , Dimensions} from 'react-native'
import * as Progress from 'react-native-progress';
import { auth, db, storage } from '../config/Firebase';
import colors from '../config/colors';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from "react-native-elements"
import firebase from "firebase"

let screenWidth = Dimensions.get("window").width

const QwttrPostScreen = (props) => {

    let uuid = uuidv4()

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const addPost = () => {

    }

    const choosePhotoFromLibrary = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!")
            return
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync()
        console.log(pickerResult)
        uploadImage(pickerResult.uri)
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()

        var ref = storage.ref().child("images/" + uuid).put(blob)

        ref.on(
            "state_changed",
            (snapshot) => {
            },
            (error) => {
                console.log(error);
                alert(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(uuid)
                    .getDownloadURL()
                    .then(url => {
                        setImage(url);
                        db.collection("posts").add({
                            date: firebase.firestore.FieldValue.serverTimestamp(),
                            text: text,
                            likes: 0,
                            likedBy: [],
                            title: title,
                            user: auth.currentUser.email,
                            image: url
                        })
                    })
            }
        )
        props.navigation.navigate("QwttrHome")

    }


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.largeText}>Post</Text>
                <View style={styles.icon}
                >
                    <Icon
                        name='arrow-back-outline'
                        type='ionicon'
                        color={colors.primary}
                        // reverse={true}
                        raised={true}
                        onPress={() => {
                            props.navigation.navigate("QwttrHome")
                        }}
                    />
                </View>

                <View style={styles.postInfoContainer}>
                    <View style={styles.imageView}>
                        <Image style={styles.imageView} source={{ uri: image }} />

                    </View>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(text) => { setTitle(text) }}
                        value={title}
                    />
                    <TextInput
                        style={styles.inputBox}

                        onChangeText={(text) => { setText(text) }}
                        value={text}
                    />
                    <View style={styles.icon}
                    >
                        <Icon
                            name='add-outline'
                            type='ionicon'
                            color={colors.primary}
                            // reverse={true}
                            raised={true}
                            onPress={() => {
                                choosePhotoFromLibrary()
                            }}
                        />
                    </View>

                </View>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    largeText: {
        fontSize: 60
    },
    inputBox: {
        width: "85%",
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: colors.secondary,
        borderBottomWidth: 1,
        textAlign: "center",
    },
    button: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: 'center',
    },
    postInfoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageView: {
        width: screenWidth - 18,
        height: 100,
        borderRadius: 2,
        borderBottomWidth: 3
    },
    icon: {
        marginBottom: 10
    }
})

export default QwttrPostScreen