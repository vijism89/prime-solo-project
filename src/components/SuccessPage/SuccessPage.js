import React, { Component } from 'react';
import { connect } from 'react-redux';


class SuccessPage extends Component {

    render () {
        return(
          <h2>EVENT CREATED</h2>

        )
    }
}


export default connect()(SuccessPage);

