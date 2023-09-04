import { API, GET_NOTES_ERROR, GET_NOTES_START, GET_NOTES_SUCCES } from '../config';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const actionStart = () => {
    return {
        type: GET_NOTES_START,
    };
};
const actionSuccess = (data) => {
    return {
        type: GET_NOTES_SUCCES,
        payload: data,
    };
};
const actionError = (error) => {
    return {
        type: GET_NOTES_ERROR,
        payload: error
    }
}
export const getNotes = () => {
    return async (dispatch) => {
        dispatch(actionStart());
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM notes',
                [],
                (tx, results) => {
                    dispatch(actionSuccess(results.rows._array))
                },
                (error) => {
                    dispatch(actionError(error))
                }
            );
        });
    };
};