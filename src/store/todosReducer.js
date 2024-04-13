import { RiH1 } from "react-icons/ri"

const defaultState = {
    todos: [
        {}
    ]
}

export function todosReducer(state = defaultState, action) {
    if (action.type === 'add') {
        return { ...state, todos: state.todos += action.payload }
    } else if (action.type === 'del') {
        return { ...state, todos: state.todos += action.payload }
    } else {
        return state
    }
}
