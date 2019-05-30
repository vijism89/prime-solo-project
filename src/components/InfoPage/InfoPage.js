import React, { Component } from 'react';
import {connect} from 'react-redux';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {
  state = {
    eventname: '',
    date: '',
    place: '',
    hostinfo: '',
    comments: ''
  }
  
  registerEvent = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'CREATE_EVENT',
      payload: {
        eventname: this.state.eventname,
        date: this.state.date,
        place: this.state.place,
        hostinfo: this.state.hostinfo,
        comments: this.state.comments,
      }
    })
  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  render () {
    console.log(this.state);
    return(
  <div>
     <h2>CREATE EVENT</h2>
    <form onSubmit={this.registerEvent}>
    <div>
      <label htmlFor="eventname">
      Event Name:
      <input 
      type="text"
      name="eventname"
      value={this.state.eventname}
      onChange={this.handleInputChangeFor('eventname')}
      />
      </label>
    </div>
    <div>
      <label htmlFor="date">
      Date:
      <input 
      type="text"
      name="date"
      value={this.state.date}
      onChange={this.handleInputChangeFor('date')}
      />
      </label>
    </div>
    <div>
    <label htmlFor="place">
      Place:
      <input 
      type="text"
      name="Place"
      value={this.state.place}
      onChange={this.handleInputChangeFor('place')}
      />
      </label>
    </div>
    <div>
    <label htmlFor="hostinfo">
      Host Info:
      <input 
      type="text"
      name="hostinfo"
      value={this.state.hostinfo}
      onChange={this.handleInputChangeFor('hostinfo')}
      />
      </label>
    </div>
    <div>
    <label htmlFor="comments">
      Comments:
      <input 
      type="text"
      name="comments"
      value={this.state.comments}
      onChange={this.handleInputChangeFor('comments')}
      />
      </label>
    </div>
    <div>
      <button>Invites</button>
    </div>
    <div>
      <button>Create</button>
    </div>
    </form>
  </div>
    )
}
}


const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}  


export default connect(mapStateToProps)(InfoPage);
