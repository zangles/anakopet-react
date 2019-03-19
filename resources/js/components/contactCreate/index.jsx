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
import withApiService from "../../actions/withApiService";
import { withSnackbar } from 'notistack';

import {styles} from "./styles";
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';


class ContactCreate extends Component {

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

        this.props.apiPost('api/contacts', {
            body: this.state.formData,
            message: 'Contact create success. Redirecting...',
            onSuccess: () => {
                this.props.changeView('contacts')
            }
        }).then(json => {
            this.props.stopLoading();
        });
    }

    handleBack () {
        this.props.changeView('contacts')
    }

    renderSaveButton () {
        const { classes } = this.props;

        return (
            <Button variant="contained" disabled={this.props.loading} color="primary" className={classes.button} onClick={() => this.handleSubmit()}>
                Save &nbsp;
                {(this.props.loading) ? <CircularProgress className={classes.spinner} size={24} /> : <AddButton /> }
            </Button>
        )
    }

    renderBackButton() {
        const { classes } = this.props;

        return (
            <Button variant="contained" disabled={this.props.loading}  color="secondary" className={classes.button} onClick={() => this.handleBack()} >
                Back &nbsp;
                <CancelButton />
            </Button>
        )
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
                        {this.renderSaveButton()}
                        {this.renderBackButton()}
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
        changeView: (view, data) => dispatch(changeView(view, data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(withApiService(ContactCreate))));
