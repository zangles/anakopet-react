
const drawerWidth = 240;

export const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        position: 'absolute',
        top: '15px',
        [theme.breakpoints.up('md')]: {
            left: `${drawerWidth}px`,
        },
        left: '0px',
        paddingLeft: '15px',
        paddingRight: '15px'
    },
});
