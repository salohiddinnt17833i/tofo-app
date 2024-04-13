import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import { todosReducer } from './todosReducer';

const rootReducer = combineReducers({
    todos: todosReducer
})

export const store = createStore(rootReducer, composeWithDevTools())