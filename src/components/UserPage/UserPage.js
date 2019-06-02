import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import KidsPage from '../KidsPage/KidsPage';
import FriendRequestPage from '../FriendRequestPage/FriendRequestPage';
//import { actionChannel } from 'redux-saga/effects';
//import { actionChannel } from 'redux-saga/effects';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {

  componentWillMount() {
    console.log('events are here');
    this.props.dispatch({ type: 'GET_EVENTS',payload:this.props.reduxState.user.id });
  }

  deleteEvent = (eventIdToDelete) => {
    console.log('print',this.props.reduxState.user.id)
    this.props.dispatch({ type:'DELETE_EVENT', payload: {eventId:`${eventIdToDelete}`, userId:`${this.props.reduxState.user.id}`}})
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.reduxState.user.username}!
    </h1>
        <p>Your ID is: {this.props.reduxState.user.id}</p>
        <div>
          <button className="friend-button"> Friend Request </button>
        </div>
        <div>
          <KidsPage />
        </div>
        <h3>Schedule</h3>
        <p>Events</p>
        <div>
                   <table>
                       <tbody>
                         <tr>
                       <th>E.ID</th>
                         <th>EVENT</th>
                         <th>DATE</th>
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
                         <td>{event.date}</td>
                         <td>{event.place}</td>
                         <td>{event.contact_info}</td>
                         <td>{event.comments}</td>
                         <td><button>Details</button></td>
                         <td><button>Update</button></td>
                         <td><button value={event.id} onClick={() => this.deleteEvent(event.id)}>Delete</button></td>
                       </tr>
                    )
              }) : <tr></tr>}
              </tbody>
                   </table>
               </div>
        <button
            type="button"
            className="create-button"
          >Create</button>
          <FriendRequestPage />
        <LogOutButton className="log-in" />
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
