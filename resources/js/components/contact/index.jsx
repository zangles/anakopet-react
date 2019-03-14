import React, { Component } from 'react'
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import { apiGet } from "../../actions/apiService";
import Grid from '@material-ui/core/Grid';

import {styles} from "./styles";
import ContactCard from "../contactCard";
import { startLoading, stopLoading } from "../../actions/view";

class Contact extends Component {

    state = {
        contacts: [],
    };

    componentDidMount() {
        this.props.startLoading();
        apiGet(this.props.authToken, 'api/contacts')
            .then( json => {
                this.setState({contacts:json.data}, () => {
                    this.props.stopLoading();
                })
            })
    }

    render () {
        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {this.state.contacts.map(function(contact, index){
                    return (
                        <Grid
                            item
                            lg={4}
                            md={6}
                            sm={6}
                            xs={12}
                        >
                            <ContactCard
                                contact={contact}
                                id={index}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        authToken: globalState.login.authToken,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLoading: () => dispatch(startLoading()),
        stopLoading: () => dispatch(stopLoading()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Contact));
