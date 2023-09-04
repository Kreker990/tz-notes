import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors, shadowBlock, widthScale } from '../common/commonStyle'
import { useNavigation } from '@react-navigation/native'
import VerticalIndent from './VerticalIndent'
import HorizontallIndent from './HorizontallIndent'
import { updateFavoriteNoteAction } from '../redux/actions'
import { useDispatch } from 'react-redux'

const NoteCard = ({ item, index }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const updateFavoriteNote = () => {
        updateFavoriteNoteAction(item.id, item.favorite == 1 ? 0 : 1, dispatch)
    }
    
    return (
        <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('noteInfo', { item: item })}
            style={[shadowBlock, styles.card]}
        >
            <View style={styles.headerBlock}>
                <Text style={styles.title} numberOfLines={1}>{index}) {item.title}</Text>
                <HorizontallIndent width={10} />
                <TouchableOpacity
                    onPress={() => updateFavoriteNote()}
                    style={{ padding: 5 }}
                >
                    <AntDesign
                        size={20}
                        name={item.favorite == 1 ? "star" : "staro"}
                        color={item.favorite == 1 ? colors.yellow : colors.black}
                    />
                </TouchableOpacity>
            </View>
            <VerticalIndent height={10} />
            <Text numberOfLines={1} style={styles.content}>{item.content}</Text>
        </TouchableOpacity>
    )
}

export default NoteCard

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.lightOrange,
        marginHorizontal: widthScale * 15,
        borderRadius: 10,
        padding: 10
    },
    headerBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        color: colors.black,
        flex: 1,
        lineHeight: 20
    },
    content: {
        fontSize: 14,
        color: colors.black,
        flex: 1,
        lineHeight: 16
    },
})