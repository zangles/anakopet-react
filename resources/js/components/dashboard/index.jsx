import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {styles} from "./styles";

class Dashboard extends Component {

    render () {
        const {classes} = this.props;
        let paperClass = classes.paper;

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <Paper className={paperClass}>
                    <span className={classes.title}>Welcome to Cork Petsit</span>
                </Paper>
            </Grid>
        )
    }

}

const mapStateToProps = (globalState) => {
    return {
        authToken: globalState.login.authToken,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
