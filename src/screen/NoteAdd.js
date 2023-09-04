import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { colors, screenWidth, shadowBlock, widthScale } from '../common/commonStyle'
import VerticalIndent from '../components/VerticalIndent'
import { addNoteAction } from '../redux/actions'
import HeaderBlock from '../components/HeaderBlock'
import { useNavigation } from '@react-navigation/native'

const NoteAdd = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [title, settitle] = useState('');
    const [content, setcontent] = useState('');
    const addNote = () => {
        if (title.length > 0) {
            addNoteAction(title.trim(), content.trim(), dispatch, navigation)
        } else {
            Alert.alert("Заполните наименование!")
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ backgroundColor: colors.lightOrange, flex: 1 }}>
            <HeaderBlock title={'Новая заметка'} />
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
                onPress={() => addNote()}
            >
                <Text style={styles.addButtonText}>Добавить</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default NoteAdd

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
    addButtonText: {
        color: colors.white
    }
})