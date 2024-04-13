
const defaultState = {
    checked: 'false'
}

export function checkboxReducer(state = defaultState, action) {
    if (action.type == 'checked') {
        return { ...state, checked: state.checked = action.payload }
    } else if (action.type == 'unchecked') {
        return { ...state, checked: state.checked = action.payload }
    } else {
        return state
    }
}