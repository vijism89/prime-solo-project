import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
//import KidsPage from '../KidsPage/KidsPage';
//import FriendRequestPage from '../FriendRequestPage/FriendRequestPage';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import swal from 'sweetalert';

//import { actionChannel } from 'redux-saga/effects';
//import { actionChannel } from 'redux-saga/effects';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`


const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer


class UserPage extends Component {

  componentWillMount() {
    console.log('events are here');
    this.props.dispatch({ type: 'GET_EVENTS',payload:this.props.reduxState.user.id });
    this.props.dispatch({ type: 'GET_EVENTS_CAL',payload:this.props.reduxState.user.id });
  }

  deleteEvent = (eventIdToDelete) => {
    console.log('print',this.props.reduxState.user.id)
    this.props.dispatch({ type:'DELETE_EVENT', payload: {eventId:`${eventIdToDelete}`, userId:`${this.props.reduxState.user.id}`}})
    swal("Done!", "You deleted an event!");
    
  }

  updateEvent = (eventIdToUpdate) => {
    //this.props.dispatch({ type:'GET_EVENT', payload: {eventId:`${eventIdToUpdate}`, userId:`${this.props.reduxState.user.id}`}})
    if(this.props.reduxState.events!=null && 
      this.props.reduxState.events.length>0){
        console.log('EVENTS: ',this.props.reduxState.events);
        console.log('eventIdToUpdate: ',eventIdToUpdate);
        let selectedEvent = this.props.reduxState.events.find((e) => e.id === eventIdToUpdate);
        // objArray.find((o) => o.name === name).id = newId;
        this.props.dispatch({type: 'SELECTED_EVENT', payload: selectedEvent});
        console.log('selected event', selectedEvent);
      } 
    this.props.history.push('/createevent');
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.reduxState.user.username}!
    </h1>
        <p>Your ID is: {this.props.reduxState.user.id}</p>
        <div className="btn-group">
        <div>
          <button 
          type="button"
          className="friend-button"
          onClick={() => {this.props.history.push('/friendrequestpage');}}
          > Friend Request </button>
        </div>
        <div><button
            type="button"
            className="create-button"
            onClick={() => {  this.props.dispatch({type: 'SELECTED_EVENT',payload:null}); this.props.history.push('/createevent');}}
          >Create Event</button></div>
          <div><button
          type="button"
          className="register-kid-button"
          onClick={() => {this.props.history.push('/kidspage');}}
          >Register Kid</button></div>
          <div> <LogOutButton className="log-in" /></div>
          </div>
        {/* <div>
          <KidsPage />
        </div> */}
        <h3>Schedule</h3>
        <div className="calenderDiv">
      <BigCalendar
      localizer={localizer}
      events={this.props.reduxState.eventsCal!=null && 
        this.props.reduxState.eventsCal.length>0 
        ? this.props.reduxState.eventsCal:[]}
      startAccessor="start"
      endAccessor="end"
       />
        </div>
        <p>Events</p>
        <div>
                   <table>
                       <tbody>
                         <tr>
                       <th>E.ID</th>
                         <th>EVENT</th>
                         <th>START DATE</th>
                         <th>END DATE</th>
                         <th>PLACE</th>
                         <th>HOST INFO</th>
                         <th>COMMENTS</th>
                         <th>DETAILS</th>
                         <th>UPDATE</th>
                         <th>DELETE</th>
                         </tr>
        {this.props.reduxState.events!=null && 
              this.props.reduxState.events.length>0 
              ? this.props.reduxState.events.map(event => {
                return (
                  //  <p>{event.id}</p>
                       <tr key={event.id}>
                         <td >{event.id}</td>
                         <td>{event.eventname}</td>
                         <td>{event.startdate.substr(0,16)}</td>
                         <td>{event.enddate.substr(0,16)}</td>
                         <td>{event.place}</td>
                         <td>{event.contact_info}</td>
                         <td>{event.comments}</td>
                         <td><button value={event.id} onClick = {() => {this.props.history.push('/success');}}>Details</button></td>
                         <td><button value={event.id} onClick= {() => this.updateEvent(event.id)}>Update</button></td>
                         <td><button value={event.id} onClick={() => this.deleteEvent(event.id)}>Delete</button></td>
                       </tr>
                    )
              }) : <tr></tr>}
              </tbody>
                   </table>
               </div>
      </div>
    )
  }
}
// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
