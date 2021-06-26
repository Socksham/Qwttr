import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
// import { Icon } from 'react-native-vector-icons/Icon'
import { Icon } from "react-native-elements"
import colors from '../config/colors';

const QwttrHomeScreen = () => {

    

    return (
        <SafeAreaView style={styles.container}>
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

                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
    },
    icon: {
        marginTop: 5,
        marginRight: 10
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    largeText: {
        fontSize: 60
    }
})

export default QwttrHomeScreen
