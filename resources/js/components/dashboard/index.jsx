import React, { Component } from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {styles} from "./styles";
import { BarChart } from 'reaviz';

class Dashboard extends Component {

    render () {
        const {classes} = this.props;
        let paperClass = classes.paper;

        const data = [
            { key: 'IDS', data: 14 },
            { key: 'Malware', data: 5 },
            { key: 'DLP', data: 18 }
        ];

        return (
            <div>
                Dashboard content
                <BarChart width={350} height={250} data={data} />
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
