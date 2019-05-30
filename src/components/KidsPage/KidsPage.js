import React, { Component } from 'react';
import {connect} from 'react-redux';
//import '../RegisterPage/RegisterPage.css';

class KidsPage extends Component {

  state = {
   kid: '',
   dob: '',
   gender: '',
  };

  registerKid = (event) => {
      event.preventDefault();
      this.props.dispatch({
          type: 'ADD_KID',
          payload: 
          {
            kid: this.state.kid,
            dob: this.state.dob,
            gender: this.state.gender,
           },
        });
      }

  handleInputChangeFor = propertyName => (event) => {
      this.setState ({
          [propertyName]: event.target.value,
      });
  }

  render() {
    console.log(this.state);
      return(
          <div>
        <form className="kids-form" >
            <h1>Register Kid</h1>
        <div>
        <label htmlFor="kid">
        Name: 
        <input
        type="text"
        name="kid"
        value={this.state.kid} 
        onChange={this.handleInputChangeFor('kid')}
        />
        </label>
      </div>
      <div>
        <label htmlFor="dob">
        DOB: 
        <input
        type="text"
        name="dob"
        value={this.state.dob} 
        onChange={this.handleInputChangeFor('dob')}
        />
        </label>
      </div>
      <div>
        <label htmlFor="gender">
        Gender: 
        <select value={this.state.gender} onChange={this.handleInputChangeFor('gender')}>
          <option value="select">select</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        </label>
        <button onClick={this.registerKid}>Add Kid</button>
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

export default connect(mapStateToProps)(KidsPage);