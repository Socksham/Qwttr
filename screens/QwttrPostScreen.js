import React, { useState, useRef } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import * as Progress from 'react-native-progress';
import { storage } from '../config/Firebase';
import colors from '../config/colors';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

const QwttrPostScreen = () => {

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
        console.log("images/" + uuid)
        setImage("images/" + uuid)
        return ref.put(blob)
    }


    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.largeText}>Post</Text>
            <View>
                <Image style={{ width: 100, height: 100 }} source={{ uri: image }} />
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={choosePhotoFromLibrary}
                >
                    <Text style={styles.btnText}>Add Image
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10
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
        // backgroundColor: "green",
        flexDirection: "row",
        alignItems: 'center',
    },
})

export default QwttrPostScreen