import React, { Component } from 'react'
import { findDOMNode } from 'react-dom';
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";
import { styles } from './styles'
import Loading from '../loading'
import { SnackbarProvider } from 'notistack';

class Main extends Component {

    componentWillReceiveProps() {
        const element = findDOMNode(this);
        if (element != null) {
            element.scrollTop = 0
        }
    }

    render () {
        const { classes, theme } = this.props;

        return (
            <main className={classes.content}>
                <Loading />
                <SnackbarProvider maxSnack={3}>
                    {this.props.children}
                </SnackbarProvider>
            </main>
        )
    }
}

export default withStyles(styles)(Main);
