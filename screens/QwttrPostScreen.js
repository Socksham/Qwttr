import React, { useState, useRef } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';

const QwttrPostScreen = () => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    const addPost = () => {

    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image)
            const imageUri = Platform.OS === 'ios' ? image.sourceUrl : image.path
            setImage(imageUri)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={image}
                style={{ width: '100%' }}
            />
            <Text>Add Post</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10
    }
})

export default QwttrPostScreen