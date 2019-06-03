const eventCalReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EVENTS_CAL':
        return action.payload;
        default:
        return state;
    }
}


export default eventCalReducer;