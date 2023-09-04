import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderBlock from '../components/HeaderBlock'
import VerticalIndent from '../components/VerticalIndent'
import { colors, shadowBlock, widthScale } from '../common/commonStyle'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { deleteNoteAction, updateNoteAction } from '../redux/actions'

const NoteInfo = ({ route }) => {
    const item = route.params.item;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('');
    const [favorite, setfavorite] = useState('');
    useEffect(() => {
        settitle(item?.title || '')
        setfavorite(item?.favorite || '')
        setcontent(item?.content || '')
    }, [item])
    const updateNote = () => {
        if (title != item.title || content != item.content) {
            updateNoteAction(title.trim(), content.trim(), favorite, item.id, dispatch, navigation)
        } else {
            Alert.alert('Измените данные!')
        }
    }
    const deleteNote = () => {
        deleteNoteAction(item.id, dispatch, navigation)
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ backgroundColor: colors.lightOrange, flex: 1 }}>
            <HeaderBlock title={'Редактировать'} />
            <VerticalIndent height={10} />
            <TextInput value={title} style={styles.inputCard}
                onChange={(e) => settitle(e.nativeEvent.text)} placeholder='Введите наименование...'
                multiline={true}
                textAlign='top'
            />
            <VerticalIndent height={10} />
            <TextInput value={content} style={[styles.inputCard, { height: 400 }]}
                onChange={(e) => setcontent(e.nativeEvent.text)} placeholder='Введите текст'
                multiline={true}
                textAlign='top'
            />
            <TouchableOpacity style={[styles.addButton, shadowBlock]}
                onPress={() => updateNote()}
            >
                <Text style={styles.addButtonText}>Сохранить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.deleteButton, shadowBlock]}
                onPress={() => deleteNote()}
            >
                <Text style={styles.addButtonText}>Удалить</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default NoteInfo

const styles = StyleSheet.create({
    inputCard: {
        width: widthScale * 345,
        height: 100,
        borderRadius: 10,
        backgroundColor: colors.white,
        padding: 15,
        marginHorizontal: widthScale * 15,
        fontSize: 16,
        fontWeight: 400,
        color: colors.black
    },
    addButton: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: colors.green,
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    deleteButton: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: colors.red,
        position: 'absolute',
        bottom: 20,
        left: 20
    },

    addButtonText: {
        color: colors.white
    }
})