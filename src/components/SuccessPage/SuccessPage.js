import React, { Component } from 'react';
import { connect } from 'react-redux';


class SuccessPage extends Component {

  componentDidMount() {
    this.props.dispatch({ type:'SET_DETAILS', payload:this.props.reduxState.user.id})
  }

    render () {
        return(
            <div>
          <h2>EVENT CREATED</h2>
          <h4>Participants List:</h4>
          <div>
              <table>
                  <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Response</th>
                  </tr>
                  {this.props.reduxState.eventDetails!=null && 
              this.props.reduxState.eventDetails.length>0 
              ? this.props.reduxState.eventDetails.map(detail => {
                return (
                  //  <p>{event.id}</p>
                       <tr key={detail.id}>
                       <td>{detail.username}</td>
                       <td>{detail.email}</td>
                      <td >{detail.childname}</td>
                      <td>{detail.eventname}</td>
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
const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}

export default connect(mapStateToProps)(SuccessPage);

