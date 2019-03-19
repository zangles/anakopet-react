import green from '@material-ui/core/colors/green';

export const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        position: 'relative',
        minHeight: '100%',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    },
    fabContainer: {
        position: 'sticky',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        width: '50px',
        textAlign: 'right',
        float: 'right',
    },
});
