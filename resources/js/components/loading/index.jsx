import React, { Component } from 'react'
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import { styles } from './styles'


class Loading extends Component {

    constructor(props) {
        super(props);
    }

    renderLoading () {
        const { classes } = this.props;
        if (this.props.loading) {
            return (<div className={classes.loadingOverlay}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >
                    <CircularProgress
                        className={classes.spinner}
                        size={100}
                    />
                </Grid>
            </div>)
        } else {
          return (<div> </div>)
        }
    }

    render () {


        return this.renderLoading()
    }
}

const mapStateToProps = (globalState) => {
    return {
        loading: globalState.view.loading
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Loading));
