import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';
import CircularProgress from '@material-ui/core/CircularProgress';

import logo from '../../../img/logo.png'

import { API_HOST, CLIENT_ID, CLIENT_SECRET } from '../../config';

const styles = theme => ({
    spinner: {
        color: 'white'
    },
    container: {
        height: '100%',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 'medium'
    },

    cssLabelUser: {
        '&$cssFocusedUser': {
            color: green['A700'],
        },
    },
    cssUnderlineUser: {
        '&:after': {
            borderBottomColor: green['A700'],
        },
    },
    cssFocusedUser: {},
    userInput: {
        color: green['A700']
    },

    cssLabelPass: {
        '&$cssFocusedPass': {
            color: red['A200'],
        },
    },
    cssUnderlinePass: {
        '&:after': {
            borderBottomColor: red['A200'],
        },
    },
    cssFocusedPass: {},
    passInput: {
        color: red['A200']
    },

    cssLoginButton: {
        marginTop: '30px',
        width: '200px',
        color: theme.palette.getContrastText(cyan[500]),
        backgroundColor: cyan[500],
        '&:hover': {
            backgroundColor: cyan[700],
            color: theme.palette.getContrastText(cyan[700]),
        },
    },
    footerText: {
        marginTop: '10px',
        fontSize: 'x-small'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '200px'
    },
    formControl: {
        marginTop: '15px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '300px'
    },
    error: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '300px',
        boxShadow: '0px 1px 20px 0px rgba(228, 7, 7, 0.97), 0px 2px 0px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
    },
    success: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '300px',
        boxShadow: '0px 1px 20px 3px rgba(5, 136, 4, 0.97), 0px 2px 0px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);'
    }

});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            status: {
                sending: false,
                success: false,
                error: false
            }
        }
    }

    handleUserNameChange = (e) => {
        this.setState({userName: e.target.value})
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    renderSpinner () {
        const { classes } = this.props;
        return (
            <div>
                <CircularProgress
                    className={classes.spinner}
                    size={16}
                />
            </div>
        );
    }

    doLogin () {
        this.setState({status: {...this.state.status, error:false, sending:true}})

        return fetch(API_HOST + '/oauth/token', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.userName,
                password: this.state.password,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'password'
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                if (res.status == 200) {
                    return res.json();
                } else {
                    throw Object.assign({}, new Error("Response returned statusCode " + res.status), { id: "login.loginError" });
                }
            })
            .then(json => {
                var tokenType = json['token_type'];
                var accessToken = json['access_token'];
                var refreshToken = json['refresh_token'];
                console.log(tokenType, accessToken, refreshToken)
                // dispatch(loginSuccessful(tokenType, accessToken, refreshToken));
                this.setState({status: {...this.state.status, success:true, sending:false}})
            })
            .catch((err) => {
                this.setState({status: {...this.state.status, error:true, sending:false}})
            });
    }

    render () {
        const { classes } = this.props;
        let paperClass = classes.paper;

        if (this.state.status.error) {
            paperClass = classes.error
        }

        if (this.state.status.success) {
            paperClass = classes.success
        }

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <Paper className={paperClass}>
                    <img src={logo} alt=""/>
                    <br/>
                    <span className={classes.title}>Welcome to AnaKo Petsit</span>
                    <form className="classes.form" autoComplete='off'>
                        <FormControl className={classes.formControl}>
                            <InputLabel
                                htmlFor="user"
                                classes={{
                                    root: classes.cssLabelUser,
                                    focused: classes.cssFocusedUser,
                                }}
                            >
                                User Name
                            </InputLabel>
                            <Input
                                id="user"
                                classes={{
                                    underline: classes.cssUnderlineUser,
                                }}
                                className={classes.userInput}
                                onChange={this.handleUserNameChange}
                            />
                        </FormControl>
                        <br/>
                        <FormControl  className={classes.formControl}>
                            <InputLabel
                                htmlFor="user"
                                classes={{
                                    root: classes.cssLabelPass,
                                    focused: classes.cssFocusedPass,
                                }}
                            >
                                Password
                            </InputLabel>
                            <Input
                                id="user"
                                type={'password'}
                                classes={{
                                    underline: classes.cssUnderlinePass,
                                }}
                                className={classes.passInput}
                                onChange={this.handlePasswordChange}
                            />
                        </FormControl>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.cssLoginButton}
                            onClick={() => this.doLogin()}
                        >
                            {this.state.status.sending ? this.renderSpinner() : 'Login'}
                        </Button>
                        <Typography className={classes.footerText} color="textSecondary">
                            From Zangles to Anako (again) © 2019
                        </Typography>
                    </form>

                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles)(Login)
