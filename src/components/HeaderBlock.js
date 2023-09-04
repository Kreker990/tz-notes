import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, screenWidth, widthScale } from '../common/commonStyle'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'

const HeaderBlock = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
                <FontAwesome name="arrow-left" size={24} color={colors.orange} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity onPress={() => Keyboard.dismiss()} style={styles.btn}>
                <Text style={styles.ready}>Готово</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderBlock

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: colors.white,
        width: '100%',
        paddingHorizontal: widthScale * 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        position: 'absolute',
        width: widthScale * 375,
        textAlign: 'center',
        color: colors.orange,
        fontSize: 20
    },
    ready: {
        fontSize: 16,
        fontWeight: 500,
        color: colors.orange,
        textDecorationLine: 'underline'
    },
    btn: {
        zIndex: 2,
        padding: 2,
    }
})