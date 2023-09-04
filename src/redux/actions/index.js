import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import { getNotes } from './getNotes';

const db = SQLite.openDatabase('mydatabase.db');

export const addNoteAction = (title, content, dispatch, navigation) => {
    db.transaction((tx) => {
        tx.executeSql(
            'INSERT INTO notes (title, content, favorite) VALUES (?, ?, ?)',
            [title, content, 0],
            (tx, result) => {
                const { insertId } = result;
                Alert.alert('Добавлено')
                dispatch(getNotes())
                navigation.goBack()
            },
            (error) => {
                console.error('error', error);
            }
        );
    });
}

export const deleteNoteAction = (id, dispatch, navigation) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM notes WHERE id = ?',
            [id],
            (tx, result) => {
                Alert.alert('Удалено')
                dispatch(getNotes())
                navigation.goBack()
            },
            (error) => {
                console.error('error', error);
            }
        );
    });
}

export const updateNoteAction = (title, content, favorite, id, dispatch, navigation) => {
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE notes SET title = ?, content = ?, favorite = ? WHERE id = ?',
            [title, content, favorite, id],
            (tx, result) => {
                Alert.alert('Изменено')
                dispatch(getNotes())
                navigation.goBack()
            },
            (error) => {
                console.error('error', error);
            }
        );
    });
}

export const updateFavoriteNoteAction = (id, favorite, dispatch)=>{
    db.transaction((tx) => {
        tx.executeSql(
            'UPDATE notes SET favorite = ? WHERE id = ?',
            [favorite, id],
            (tx, result) => {
                dispatch(getNotes())
            },
            (error) => {
                console.error('error', error);
            }
        );
    });
    
}
