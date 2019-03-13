import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import cyan from "@material-ui/core/colors/cyan";

export const styles = theme => ({
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
