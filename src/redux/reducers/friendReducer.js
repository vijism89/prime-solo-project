const friendReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FRIEND':
        return action.payload;
        // case 'SET_EVENTS':
        // return action.payload;
        default:
        return state;
    }
}


export default friendReducer;