import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';

import '../../../config';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import logo from '../../../img/logo.png'

import { CLIENT_ID, CLIENT_SECRET} from '../../config';
import {styles} from './styles'

import { loginSuccessful } from '../../actions/login'
import { changeView } from '../../actions/view'

export const API_HOST = (typeof window !== "undefined" && window.__CONFIG__ ? window.__CONFIG__.apiHost : global.__CONFIG__.apiHost);

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
    };

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value})
    };

    handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            this.doLogin()
        }
    };

    renderSpinner() {
        const {classes} = this.props;
        return (
            <div>
                <CircularProgress
                    className={classes.spinner}
                    size={16}
                />
            </div>
        );
    }

    doLogin() {
        this.setState({status: {...this.state.status, error: false, sending: true}});

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
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw Object.assign({}, new Error("Response returned statusCode " + res.status), {id: "login.loginError"});
                }
            })
            .then(json => {
                let tokenType = json['token_type'];
                let accessToken = json['access_token'];
                let refreshToken = json['refresh_token'];
                let expireIn = json['expires_in'];
                let seconds = new Date().getTime() / 1000;
                let expire = seconds+expireIn;

                this.setState({status: {...this.state.status, success: true, sending: false}});
                this.props.login(tokenType, accessToken, refreshToken, expire);
                this.props.changeView('dashboard');
            })
            .catch((err) => {
                console.log(err);
                this.setState({status: {...this.state.status, error: true, sending: false}})
            });
    }

    render() {
        const {classes} = this.props;
        let paperClass = classes.paper;

        if (this.state.status.error) {
            paperClass = classes.error
        } else if (this.state.status.success) {
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
                    <span className={classes.title}>Welcome to Cork Petsit</span>
                    <form
                        className="classes.form"
                        autoComplete='off'
                    >
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
                                onKeyUp={this.handleKeyUp}
                            />
                        </FormControl>
                        <br/>
                        <FormControl className={classes.formControl}>
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
                                onKeyUp={this.handleKeyUp}
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

const mapStateToProps = (globalState) => {
    return {
        username: globalState.login.username,
        password: globalState.login.password,
        authToken: globalState.login.authToken,
        error: globalState.login.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (tokenType, accessToken, refreshToken, expire) => dispatch(loginSuccessful(tokenType, accessToken, refreshToken, expire)),
        changeView: (view) => dispatch(changeView(view))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));

