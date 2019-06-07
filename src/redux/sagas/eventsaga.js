import { put, takeLatest, take } from 'redux-saga/effects';
import axios from 'axios';


function* getEvents(action) {
    console.log('abc',action.payload);
    
    try {
        let eventResponse = yield axios.get(`/api/event/uid/${action.payload}`);
        yield put({ type: 'SET_EVENTS', payload: eventResponse.data})
    } catch (error) {
        console.log(error)
    }
}

function* eventDetails(action) {
    console.log('abc',action.payload.eventId);
    
    try {
        let detailsResponse = yield axios.get(`/api/event/success/${action.payload}`);
        yield put({ type: 'SET_DETAILS', payload: detailsResponse.data})
    } catch (error) {
        console.log(error)
    }
}

function* getEventsCal(action) {
    console.log('abc',action.payload);
    
    try {
        let eventResponse = yield axios.get(`/api/event/cal/${action.payload}`);
        console.log('eventResponse::: ->',eventResponse);
        let finalEventResult=[];
        for (let event of eventResponse.data){
            event.start=new Date(event.start);
            event.end=new Date(event.end);
            finalEventResult.push(event);
        }
        yield put({ type: 'SET_EVENTS_CAL', payload: finalEventResult})
    } catch (error) {
        console.log(error)
    }
}
// will be fired on "CREATE_EVENT" action
function* registerEvent(action) {
    try{
     // passes the event information from the payload to the server
     yield axios.post('api/event', action.payload);
     yield put({type: 'SET_EVENT', payload: action.payload});
    } catch (error) {
        console.log('Error with creating event', error);
    }
}

function* getEvent(action) {
    try{
      yield axios.get(`/api/event/eid/${action.payload.eventId}`)
      yield put({ type: 'GET_EVENTS',payload: action.payload.userId });
    }catch (error) {
        console.log('Error with updating event', error);
}
}

function* updateEvent(action) {
    try{
        yield axios.put('/api/event/change',action.payload);
        //yield put({ type: 'GET_EVENTS',payload: action.payload });
      }catch (error) {
          console.log('Error with updating event', error);
  } 
}

function* eventToDelete(action) {
    try {
        yield axios.delete(`/api/event/${action.payload.eventId}`)
    // yield axios.delete(`api/event/:id`, action.payload);
    //  const deleteResponse = yield axios.get(`/api/imagetags/${action.payload.tags_id}`)
    //     yield put({type:'SET_IMAGETAGS', payload:deleteResponse.data})
     yield put({ type: 'GET_EVENTS',payload: action.payload.userId });
    }catch (error) {
        console.log('Error with deleting event', error);
    }
}
// saga watching for action from our reducer
function* eventsaga() {
    yield takeLatest('CREATE_EVENT', registerEvent);
    yield takeLatest('GET_EVENTS', getEvents);
    yield takeLatest('DELETE_EVENT', eventToDelete);
    yield takeLatest('GET_EVENTS_CAL', getEventsCal);
    yield takeLatest('EVENT_DETAILS', eventDetails);
    yield takeLatest('GET_EVENT', getEvent);
    yield takeLatest('MAKE_CHANGE',updateEvent);
}

export default eventsaga;