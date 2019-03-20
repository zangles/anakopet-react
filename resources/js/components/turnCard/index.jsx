import React, { Component } from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {styles} from "./styles";
import {withSnackbar} from "notistack";
import withApiService from "../../actions/withApiService";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {TurnsColors} from '../turnsColors'
import classNames from "classnames";


class TurnCard extends Component {

    static defaultProps = {
        data: {},
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render () {
        const { classes } = this.props;

        let turnTypeClass = '';

        if (this.props.data.turn_type.id === 1) {
            turnTypeClass = classes.turnMorning;
        }
        if (this.props.data.turn_type.id === 2) {
            turnTypeClass = classes.turnNoon;
        }
        if (this.props.data.turn_type.id === 3) {
            turnTypeClass = classes.turnEvening;
        }
        if (this.props.data.turn_type.id === 4) {
            turnTypeClass = classes.turnDayCare;
        }
        if (this.props.data.turn_type.id === 5) {
            turnTypeClass = classes.turnFullDay;
        }
        if (this.props.data.turn_type.id === 6) {
            turnTypeClass = classes.turnNight;
        }

        return (
            <Card className={classNames(classes.card, turnTypeClass)}>
                <CardContent>
                    <Grid container spacing={24}>
                        <Grid item xs={12} >
                            <Typography className={classes.title} color="textPrimary">
                                <strong>{this.props.data.turn_type.name}</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary">
                                <strong>Comments</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textPrimary">
                                {this.props.data.comments}
                            </Typography>
                        </Grid>
                    </Grid>

                </CardContent>
                <CardActions>
                    actions
                </CardActions>
            </Card>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        loading: globalState.view.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withSnackbar(withApiService(TurnCard))));
