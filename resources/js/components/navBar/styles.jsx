
const drawerWidth = 240;

export const styles = theme => ({
    root: {
        flexGrow: 1,
        top: 0,
        position: 'absolute',
        width: '100%',
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    grow: {
        flexGrow: 1,
        textTransform: 'capitalize'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        zIndex: 2,
    },
});
