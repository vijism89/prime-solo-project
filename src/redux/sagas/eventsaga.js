import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getEvents(action) {
    console.log('abc',action.payload);
    
    try {
        let eventResponse = yield axios.get(`/api/event/${action.payload}`);
        yield put({ type: 'SET_EVENTS', payload: eventResponse.data})
    } catch (error) {
        console.log(error)
    }
}
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
    yield takeLatest('GET_EVENTS', getEvents);
}

export default eventsaga;