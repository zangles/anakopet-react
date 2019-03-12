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

import logo from '../../../img/logo.png'

const styles = theme => ({
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
            color: orange[500],
        },
    },
    cssUnderlinePass: {
        '&:after': {
            borderBottomColor: orange[500],
        },
    },
    cssFocusedPass: {},
    passInput: {
        color: orange[500]
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
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '300px'
    },
    formControl: {
        marginTop: '15px'
    },

});

class Login extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        const { classes } = this.props;

        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.container}
            >
                <Paper className={classes.paper}>
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
                            />
                        </FormControl>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.cssLoginButton}
                        >
                            Login
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
