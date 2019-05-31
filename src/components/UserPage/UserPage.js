import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import KidsPage from '../KidsPage/KidsPage';
//import { actionChannel } from 'redux-saga/effects';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {

  componentWillMount() {
    console.log('events are here');
    this.props.dispatch({ type: 'GET_EVENTS',payload:this.props.reduxState.user.id });
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.reduxState.user.username}!
    </h1>
        <p>Your ID is: {this.props.reduxState.user.id}</p>
        <div>
          <KidsPage />
        </div>
        <h3>Schedule</h3>
      
        <p>Events</p>

        {this.props.reduxState.events!=null && 
              this.props.reduxState.events.length>0 
              ? this.props.reduxState.events.map(event => {
                return (
                   <p>{event.id}</p>
                )
              }) : <span></span>}
     
     <h3>Created Events</h3>
        <button>Create</button>
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
