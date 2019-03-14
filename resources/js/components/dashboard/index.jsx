import React, { Component } from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {styles} from "./styles";

class Dashboard extends Component {

    render () {
        const {classes} = this.props;
        let paperClass = classes.paper;

        return (
            <div>Dashboard content</div>
        )
    }

}

const mapStateToProps = (globalState) => {
    return {
        authToken: globalState.login.authToken,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
