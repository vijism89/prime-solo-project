const updatedEventReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATED_EVENT':
        return action.payload;
        default:
        return state;
    }
}


export default updatedEventReducer;