import React, { Component } from 'react';
import { connect } from 'react-redux';


class SuccessPage extends Component {

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
                  <tr>
                    <td>shrivatsav</td>
                    <td>vijism89@gmail.com</td>
                    <td>yes</td>
                  </tr>
                  </tbody>
              </table>
          </div>
          </div>
        )
    }
}


export default connect()(SuccessPage);

