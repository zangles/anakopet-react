
const drawerWidth = 240;
const topHeight = 64;

export const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        position: 'absolute',
        left: '0px',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            left: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
        },
        paddingLeft: '15px',
        paddingRight: '15px',
        height: `calc(100% - ${topHeight}px)`,
        top: `${topHeight}px`,
        overflowY: 'auto',
        paddingTop: '15px'

    },
});
