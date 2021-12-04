import React, { useReducer, createContext } from "react";

type ActionType = {
    type: 'mock_store_data' | 'other_store_data'; // type 类型
    value?: string
};


type InitialState = {
    mock_store_data: string,
}

const initialState: InitialState = {
    mock_store_data: '',
};

function reducer(state: typeof initialState, action: ActionType) {
    switch (action.type) {
        case 'mock_store_data':
            state.mock_store_data = action.value!;
            return state;
        default:
            throw new Error('什么鬼');
    }
}

let context = createContext(initialState);

export {
    reducer,
    initialState,
    context
}