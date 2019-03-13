import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Login from '../login'
import {connect} from "react-redux";
import Dashboard from "../dashboard";
import ls from 'local-storage';

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

    renderBody () {
        let authToken = ls.get('authToken');
        // ls.remove('authToken');

        if (authToken === null) {
            return (<Login />)
        } else {
            switch (this.props.view) {
                case undefined:
                    return (<Dashboard />);
                case 'dashboard':
                    return (<Dashboard />);
                default:
                    return (<div>No '{this.props.view}' view</div>);
            }
        }
    }

    render() {

        const { classes } = this.props

        return (
            <div className={classes.root}>
                {this.renderBody()}
            </div>
        );
    }
}
const mapStateToProps = (globalState) => {
    return {
        authToken: globalState.login.authToken,
        view: globalState.view.actualView
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout));
