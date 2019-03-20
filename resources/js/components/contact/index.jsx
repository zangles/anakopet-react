import React, { Component } from 'react'
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import { apiGet } from "../../actions/apiService";
import Grid from '@material-ui/core/Grid';

import {styles} from "./styles";
import ContactCard from "../contactCard";
import {changeView, startLoading, stopLoading} from "../../actions/view";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'

class Contact extends Component {

    state = {
        contacts: [],
    };

    componentDidMount() {
        this.props.startLoading();
        apiGet('api/contacts')
            .then( json => {
                this.setState({contacts:JSON.parse(json).data.data}, () => {
                    this.props.stopLoading();
                })
            })
    }

    handleCreateContactClick () {
        this.props.changeView('create contact')
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={24}
                >
                    {this.state.contacts.map(function(contact, index){
                        return (
                            <Grid
                                item
                                lg={4}
                                md={6}
                                sm={6}
                                xs={12}
                                key={index}
                            >
                                <ContactCard
                                    contact={contact}
                                    id={index}
                                />
                            </Grid>
                        );
                    })}

                </Grid>
                {this.props.loading ?
                    <div></div> :
                    <div className={classes.fabContainer}>
                        <Fab className={classes.fab} color='primary' onClick={() => this.handleCreateContactClick() }>
                            <AddIcon />
                        </Fab>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        authToken: globalState.login.authToken,
        loading: globalState.view.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLoading: () => dispatch(startLoading()),
        stopLoading: () => dispatch(stopLoading()),
        changeView: (view, data) => dispatch(changeView(view, data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Contact));
