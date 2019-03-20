import Red from '@material-ui/core/colors/red'
import Blue from "@material-ui/core/colors/blue";
import Grey from '@material-ui/core/colors/grey'

export const styles = theme => ({
    card: {
        maxWidth: '100%',
        backgroundColor: Grey[100]
    },
    cell1: {
        width: '50px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
    },
    malePet: {
        backgroundColor: Blue[600],
    },
    femalePet: {
        backgroundColor: Red[400],
    }
});
