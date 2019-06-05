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

class FriendRequestPage extends Component {
  state = {
    userFriends: null,
    };

  handleChange = (userFriends) => {
    this.setState({ userFriends });
    console.log(`Option selected:`, userFriends);
  }

  componentWillMount(){
    console.log('hello world');
    this.props.dispatch({type:'GET_NEWUSER', payload:this.props.reduxState.user.id});
  }

  inviteFriends = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type: 'CREATE_USER_FRIEND',
      payload: {
        userId:this.props.reduxState.user.id,
        userFriends: this.state.userFriends,
      },
    })
    swal("You made a Friend!", "You send a Friend Request!");
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
    return (
      <div>
        <form className="event-form">
          <h2>FRIEND REQUEST</h2>
          <div>
            <span>Select Friends</span>
            <Select isMulti="true" isSearchable="true"
        value={this.state.userFriends}
        onChange={this.handleChange}
        options={this.props.reduxState.newFriends!=null &&
          this.props.reduxState.newFriends.length>0 
          ? this.props.reduxState.newFriends:[]}
           />
          </div>
          <div>
            <button
              className="create-button"
              onClick={this.inviteFriends}>
              Send Request
              </button>
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


export default connect(mapStateToProps)(FriendRequestPage);
