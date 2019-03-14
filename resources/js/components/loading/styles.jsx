import LightBlue from '@material-ui/core/colors/lightBlue'
const mainMargin = 15;

export const styles = theme => ({
    loadingOverlay: {
        height: `calc(100% + ${mainMargin}px)`,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: `49px`,
        left: `0px`
    },
    container: {
        height: '100%',
    },
    spinner: {
        color: LightBlue[300],
    },
});
