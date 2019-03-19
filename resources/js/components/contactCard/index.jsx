import React, { Component } from 'react'
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
import PlaceIcon from '@material-ui/icons/Place'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Call'
import PetIcon from '@material-ui/icons/Pets'
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles'
import {changeView, startLoading, stopLoading} from "../../actions/view";
import {withSnackbar} from "notistack";
import withApiService from "../../actions/withApiService";

class ContactCard extends Component {

    static propTypes = {
        contact: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleContactCardClick (id) {
        this.props.changeView('contact view', {id: id})
    }

    render () {
        const { classes } = this.props;

        return (
            <Card className={classes.card} onClick={() => this.handleContactCardClick(this.props.contact.id)}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {this.props.contact.name}
                    </Typography>
                    <Divider />
                    <Typography component="p">
                        <br/>
                        <PlaceIcon className={classes.icons} /> {this.props.contact.address}
                        <br/>
                        <EmailIcon className={classes.icons} /> {this.props.contact.email}
                        <br/>
                        <PhoneIcon className={classes.icons} /> {this.props.contact.phone}
                        <br/>
                    </Typography>
                    <Divider />
                    <br/>
                    {this.props.contact.pets.map(function(pet, index){
                        let sexClass = (pet.sex === 'M') ? classes.maleIcon : classes.femaleIcon
                        return (
                            <div key={index} >
                                <PetIcon className={sexClass} /> {pet.name}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        viewData: globalState.view.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeView: (view, data) => dispatch(changeView(view, data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withApiService(ContactCard)));
