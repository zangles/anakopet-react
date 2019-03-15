import React, { Component } from 'react';
import {connect} from "react-redux";
import {changeView, startLoading, stopLoading} from "../../actions/view";
import {withStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddButton from '@material-ui/icons/Save'
import CancelButton from '@material-ui/icons/Backspace'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {styles} from "./styles";
import Divider from '@material-ui/core/Divider';
import {apiPost} from "../../actions/apiService";
import { withSnackbar } from 'notistack';
import PropTypes from "prop-types";

class ContactCreate extends Component {

    static propTypes = {
        enqueueSnackbar: PropTypes.func.isRequired,
    };

    state = {
        formData: {
            name: '',
            email: '',
            address: '',
            phone: '',
            description: '',
            emergency: '',
        }
    };

    constructor(props) {
        super(props);
    }

    handleInputChange  = name => event => {
        this.setState({ formData: {...this.state.formData, [name]: event.target.value} });
    };

    handleSubmit () {
        this.props.startLoading();
        apiPost('api/contacts', {
            body: this.state.formData
        }).then(json => {
            this.props.stopLoading();
            let response = JSON.parse(json).data;
            let errors = response.message;

            if (response.status !== 200) {
                errors.map((message, key) => {
                    this.props.enqueueSnackbar(JSON.stringify(message), { variant: 'error', autoHideDuration: 2000 });
                });
            }
        });
    }

    render () {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Contact Information
                        </Typography>
                        <Divider />
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            fullWidth
                            required
                            margin="normal"
                            onChange={this.handleInputChange('name')}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            fullWidth
                            margin="normal"
                            onChange={this.handleInputChange('email')}
                        />
                        <TextField
                            id="address"
                            label="Address"
                            className={classes.textField}
                            fullWidth
                            margin="normal"
                            onChange={this.handleInputChange('address')}
                        />
                        <TextField
                            id="phone"
                            label="Phone"
                            className={classes.textField}
                            fullWidth
                            margin="normal"
                            onChange={this.handleInputChange('phone')}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            className={classes.textField}
                            fullWidth
                            rows="4"
                            multiline
                            margin="normal"
                            onChange={this.handleInputChange('description')}
                        />
                        <TextField
                            id="emergency"
                            label="Emergency Contact"
                            className={classes.textField}
                            fullWidth
                            rows="4"
                            multiline
                            margin="normal"
                            onChange={this.handleInputChange('emergency')}
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleSubmit()}>
                            Save &nbsp;
                            <AddButton />
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Back &nbsp;
                            <CancelButton />
                        </Button>
                    </CardActions>
                </Card>
            </form>
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
        changeView: (view) => dispatch(changeView(view))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(ContactCreate)));
