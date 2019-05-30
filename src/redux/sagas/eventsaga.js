import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// will be fired on "CREATE_EVENT" action
function* registerEvent(action) {
    try{
     // passes the event information from the payload to the server
     yield axios.post('api/event/:id', action.payload);
     yield put({type: 'SET_EVENT', payload: action.payload});
    } catch (error) {
        console.log('Error with creating event', error);
    }
}
// saga watching for action from our reducer
function* eventsaga() {
    yield takeLatest('CREATE_EVENT', registerEvent);
}

export default eventsaga;