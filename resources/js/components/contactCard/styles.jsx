import Blue from '@material-ui/core/colors/blue';
import Red from '@material-ui/core/colors/red';


export const styles = theme => ({
    card: {
        width: '250px',
        marginBottom: '15px',
        cursor: 'pointer',
    },
    icons: {
        fontSize: '16px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    maleIcon: {
        color: Blue[600],
        fontSize: '16px'
    },
    femaleIcon: {
        color: Red[400],
        fontSize: '16px'
    }
});
