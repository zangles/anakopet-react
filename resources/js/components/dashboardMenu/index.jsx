import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {logout} from "../../actions/login";
import {withStyles} from "@material-ui/core";
import Hidden from '@material-ui/core/Hidden';
import {connect} from "react-redux";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import CalendarIcon from '@material-ui/icons/InsertInvitation';
import SettingsIcon from '@material-ui/icons/Settings';

import Drawer from '@material-ui/core/Drawer';
import {styles} from "./styles";

import logo from '../../../img/logo.png'
import {changeView} from "../../actions/view";

class DashboardMenu extends Component {

    static propTypes = {
        mobileOpen: PropTypes.bool.isRequired,
        handleDrawerToggle: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);
    }

    changeView (view) {
        this.props.changeView(view);
        if (this.props.mobileOpen) {
            this.props.handleDrawerToggle();
        }
    }

    render () {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar} >
                    <img src={logo} alt="" className={classes.logo}/>
                </div>
                <Divider />
                <List>
                    <ListItem
                        button key={'Dashboard'}
                        selected={this.props.view === 'dashboard'}
                        onClick={() => this.changeView('dashboard')}
                    >
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItem>
                    <ListItem
                        button key={'Contact'}
                        selected={this.props.view === 'contact'}
                        onClick={() => this.changeView('contact')}
                    >
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <ListItemText primary={'Contact'} />
                    </ListItem>
                    <ListItem button key={'Turns'}>
                        <ListItemIcon><CalendarIcon /></ListItemIcon>
                        <ListItemText primary={'Turns'} />
                    </ListItem>
                    <ListItem button key={'Config'}>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary={'Config'} />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.props.mobileOpen}
                        onClose={this.props.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        authToken: globalState.login.authToken,
        view: globalState.view.actualView
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        changeView: (view) => dispatch(changeView(view))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DashboardMenu));
