import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import swal from 'sweetalert';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ];

class CreateEventPage extends Component {
  state = {
    eventname: '',
    startdate: '',
    enddate: '',
    place: '',
    hostinfo: '',
    comments: '',
    invites: null,
    
  };

  handleChange = (invites) => {
    this.setState({ invites });
    console.log(`Option selected:`, invites);
  }

  componentWillMount(){
    console.log('hello world');
    console.log('selected event', this.props.reduxState.selectedEvent)
    this.props.dispatch({type:'GET_KIDS', payload:this.props.reduxState.user.id});
    if(this.props.reduxState.selectedEvent != null){
      this.setState(
        this.props.reduxState.selectedEvent
      )
    }
  }

  registerEvent = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'CREATE_EVENT',
      payload: {
        userId:this.props.reduxState.user.id,
        eventname: this.state.eventname,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
        place: this.state.place,
        hostinfo: this.state.hostinfo,
        comments: this.state.comments,
        invites: this.state.invites,
      },
    })
    swal("Good job!", "You Created an Event!");
    this.props.history.push('/home');
  }
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  render() {
    //  const { selectedOption } = this.state;
    console.log(this.state);
    let button;
            if(this.props.reduxState.selectedEvent != null){
            button = <button
              className="update-button"
              onClick={this.updateEvent}>
              Update 
              </button>;
            }
            else {
              button = <button
              className="create-button"
              onClick={this.registerEvent}>
              Create 
              </button>;
            }
    return (
      <div>
        <form className="event-form">
          <h2>CREATE EVENT</h2>
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
            <label htmlFor="startdate">
              Start Date and Time:
            <input
                type="text"
                name="startdate"
                value={this.state.startdate}
                onChange={this.handleInputChangeFor('startdate')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="enddate">
              End Date and Time:
            <input
                type="text"
                name="enddate"
                value={this.state.enddate}
                onChange={this.handleInputChangeFor('enddate')}
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
            <span>Select Kids</span>
            <Select isMulti="true" isSearchable="true"
        value={this.state.invites}
        onChange={this.handleChange}
        options={this.props.reduxState.kids!=null &&
          this.props.reduxState.kids.length>0 
          ? this.props.reduxState.kids:[]}
           />
          </div>
          <div>
            {button}
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


export default connect(mapStateToProps)(CreateEventPage);
