import React, { Component } from 'react';
import {connect} from 'react-redux';
//import '../RegisterPage/RegisterPage.css';

class KidsPage extends Component {

  state = {
   childname: '',
   dob: '',
   gender: '',
  };

  registerKid = (event) => {
      event.preventDefault();
      this.props.dispatch({
          type: 'ADD_KID',
          payload: 
          {
            childname: this.state.childname,
            dob: this.state.dob,
            gender: this.state.gender,
           },
        })
        this.props.history.push('/home');
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
        <label htmlFor="childname">
        Name: 
        <input
        type="text"
        name="childname"
        value={this.state.childname} 
        onChange={this.handleInputChangeFor('childname')}
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
        <button className="add-button"onClick={this.registerKid}>Add Kid</button>
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