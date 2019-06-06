const selectedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SELECTED_EVENT':
        return action.payload;
        default:
        return state;
    }
}


export default selectedReducer;