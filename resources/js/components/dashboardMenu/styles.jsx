const drawerWidth = 240;

export const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: 240,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
        position: 'absolute',
        height: '100%'
    },
    logo: {
        maxHeight: '60px',
        marginLeft: '77px'
    }
});
