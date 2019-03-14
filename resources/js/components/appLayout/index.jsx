import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from '../navBar';
import Menu from '../dashboardMenu';
import Main from '../main';

const styles = theme => ({
    root: {
        backgroundColor: 'white',
        width: '100%',
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            width: '90%',
        },
        height: '100%',
        margin: 'auto',
        boxShadow: '0px 1px 26px 3px rgba(171, 171, 171, 0.97), 0px 2px 0px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
    }
});

class AppLayout extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

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
                <Navbar
                    handleDrawerToggle={this.handleDrawerToggle}
                />
                <Menu
                    mobileOpen={this.state.mobileOpen}
                    handleDrawerToggle={this.handleDrawerToggle}
                />
                <Main>
                    {this.props.children}
                </Main>
            </Grid>
        );
    }
}

export default withStyles(styles)(AppLayout);
