
const drawerWidth = 240;

export const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        position: 'absolute',
        top: '15px',
        left: '0px',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            left: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
        },
        paddingLeft: '15px',
        paddingRight: '15px',
        height: '100%',
    },
});
