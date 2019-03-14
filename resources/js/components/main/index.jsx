import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core";
import { styles } from './styles'
import Loading from "../loading";

class Main extends Component {
    render () {
        const { classes, theme } = this.props;

        return (
            <main className={classes.content}>
                <Loading />
                <div className={classes.toolbar} />
                {this.props.children}
            </main>
        )
    }
}

export default withStyles(styles)(Main);
