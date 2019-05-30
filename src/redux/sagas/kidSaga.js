import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* registerKid(action) {
    try {
         // passes the kid detail to the server
        yield axios.post('api/child/:id', action.payload)

        // passing the kid detail to the reducer
        yield put({ type: 'KID_TO_ADD', payload: action.payload});
    } catch (error) {
        console.log(error);
    }
}
function* kidSaga() {
   yield takeLatest('ADD_KID',registerKid);
}
 export default kidSaga;