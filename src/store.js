import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = { records: [] };


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_RECORD':
            return {
                ...state,
                records: [...state.records, action.payload]
            };
        case 'EDIT_RECORD':
            return {
                ...state,
                records: state.records.map(record => record.id === action.payload.id ? action.payload : record)
            };
        case 'DELETE_RECORD':
            return {
                ...state, records: state.records.filter(record => record.id !== action.payload)
            };
        default:
            return state;
    }

};
const store = createStore(reducer, composeWithDevTools());
export default store;
