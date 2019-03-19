import React, { Component } from 'react';
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import withApiService from "../../actions/withApiService";
import PropTypes from "prop-types";
import { styles } from'./styles'
import classNames from 'classnames';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PetIcon from '@material-ui/icons/Pets'
import EditIcon from '@material-ui/icons/Edit'

class PetCard extends Component {
    static defaultProps = {
        data: {},
    };

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    render() {
        const { classes } = this.props;

        let avatarClass = (this.props.data.sex === 'M') ? classes.malePet : classes.femalePet;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={avatarClass}>
                            <PetIcon />
                        </Avatar>
                    }
                    title={this.props.data.name}
                    subheader={this.props.data.breed}
                />
                <CardContent>
                    <Typography component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton
                        className={classes.expand}
                        aria-label="Edit"
                    >
                        <Fab
                            color="primary"
                            aria-label="Edit"
                            className={classes.fab}
                            size={'small'}
                        >
                            <EditIcon />
                        </Fab>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }

}

const mapStateToProps = (globalState) => {
    return {
        loading: globalState.view.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withSnackbar(withApiService(PetCard))));
