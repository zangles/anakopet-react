import React, { Component } from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import { BarChart } from 'reaviz';
import {styles} from "./styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Dashboard extends Component {

    render () {
        const {classes} = this.props;
        let paperClass = classes.paper;


        const data = [
            { key: 'Enero', data: 14 },
            { key: 'Febrero', data: 5 },
            { key: 'Marzo', data: 18 }
        ];

        return (
            <div>
                <Card className={classes.card} >
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Cantidad De turnos por mes
                        </Typography>
                        <BarChart width={350} height={250} data={data} />
                    </CardContent>
                </Card>
            </div>
        )
    }

}

const mapStateToProps = (globalState) => {
    return {
        authToken: globalState.login.authToken,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
