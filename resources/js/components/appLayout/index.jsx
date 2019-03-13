import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from '../navBar';

const styles = theme => ({
    root: {
        backgroundColor: 'white',
        width: '90%',
        height: '100%',
        margin: 'auto',
        boxShadow: '0px 1px 26px 3px rgba(171, 171, 171, 0.97), 0px 2px 0px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
    }
});

class AppLayout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.root}
            >
                <Navbar />
                {this.props.children}
            </Grid>
        );
    }
}

export default withStyles(styles)(AppLayout);
