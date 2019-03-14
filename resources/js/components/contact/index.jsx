import React, { Component } from 'react'
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import { apiGet } from "../../actions/apiService";

import {styles} from "./styles";

class Contact extends Component {

    componentDidMount() {
        apiGet(this.props.authToken, 'api/contacts')
            .then( json => {
                // console.log(json)
            })
    }

    render () {
        return (
            <div>Contact content</div>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        authToken: globalState.login.authToken,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Contact));
