import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getNewUser(action) {
    console.log('abc',action.payload);
    
    try {
        let friendResponse = yield axios.get(`/api/friend/dd/${action.payload}`);
        yield put({ type: 'SET_FRIEND', payload: friendResponse.data})
    } catch (error) {
        console.log(error)
    }
}
// will be fired on "CREATE_EVENT" action
function* registerFriend(action) {
    try{
     // passes the event information from the payload to the server
     yield axios.post('api/friend', action.payload);
    //  yield put({type: 'SET_FRIEND', payload: action.payload});
    } catch (error) {
        console.log('Error with creating event', error);
    }
}

// function* eventToDelete(action) {
//     try {
//         yield axios.delete(`/api/event/${action.payload.eventId}`)
//     // yield axios.delete(`api/event/:id`, action.payload);
//     //  const deleteResponse = yield axios.get(`/api/imagetags/${action.payload.tags_id}`)
//     //     yield put({type:'SET_IMAGETAGS', payload:deleteResponse.data})
//      yield put({ type: 'GET_EVENTS',payload: action.payload.userId });
//     }catch (error) {
//         console.log('Error with deleting event', error);
//     }
// }
// saga watching for action from our reducer
function* friendSaga() {
    yield takeLatest('CREATE_USER_FRIEND', registerFriend);
    yield takeLatest('GET_NEWUSER', getNewUser);
    // yield takeLatest('DELETE_EVENT', eventToDelete);
}

export default friendSaga;