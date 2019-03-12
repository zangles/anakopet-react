import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Login from '../login'

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        backgroundColor: '#e9ecef'
    }
});

class Layout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Login />
            </div>
        );
    }
}

export default withStyles(styles)(Layout)
