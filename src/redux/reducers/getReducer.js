import { GET_NOTES_ERROR, GET_NOTES_START, GET_NOTES_SUCCES } from "../config";

const initialState = {
    data: [],
    loading: false,
    error: false,
};

const getNotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTES_START:
            return {
                ...state,
                data: [],
                loading: true,
            };
        case GET_NOTES_SUCCES:
            return {
                data: action.payload,
                loading: false,
                error: false
            };
        case GET_NOTES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default getNotesReducer;