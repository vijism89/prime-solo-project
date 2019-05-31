const kidsReducer = ( state = {}, action) => {
switch (action.type) {
    case 'KID_TO_ADD':
    return action.payload;
    case 'SET_KIDS':
    return action.payload;
    default: 
    return state;
}
};

export default kidsReducer;