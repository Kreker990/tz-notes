import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import VerticalIndent from './VerticalIndent'
import { Ionicons } from '@expo/vector-icons'
import { colors, widthScale } from '../common/commonStyle'
import HorizontallIndent from './HorizontallIndent'

const SearchBlock = ({search, setsearch}) => {
    return (
        <View>
            <VerticalIndent height={20} />
            <View style={styles.inputBlock}>
                <Ionicons name="search" size={22} color={colors.gray} />
                <HorizontallIndent width={5}/>
                <TextInput style={styles.input}
                    placeholder='Поиск...'
                    value={search}
                    onChangeText={setsearch}
                />
            </View>
            <VerticalIndent height={20} />
        </View>
    )
}

export default SearchBlock

const styles = StyleSheet.create({
    inputBlock: {
        backgroundColor: colors.white,
        marginHorizontal: widthScale * 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    }
})