import React, { Component } from  'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {withSnackbar} from "notistack";
import withApiService from "../../actions/withApiService";
import {changeView, startLoading, stopLoading} from "../../actions/view";
import {styles} from "./styles";
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import PersonIcon from '@material-ui/icons/Person';
import PetsIcon from '@material-ui/icons/Pets';
import TurnsIcon from '@material-ui/icons/InsertInvitation';
import TextField from '@material-ui/core/TextField';
import PetCard from '../petCard';
import Grid from '@material-ui/core/Grid';
import TurnCard from '../turnCard'
import Divider from '@material-ui/core/Divider';

class ContactView extends Component {

    state = {
        value: 0,
        data: {
            name: '',
            email: '',
            address: '',
            phone: '',
            description: '',
            emergency: ''
        },
    };

    static defaultProps = {
        id: 0,
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    componentDidMount() {

        this.props.startLoading();
        this.props.apiGet(
            'api/contacts/' + this.props.id,
            {
                params: ''
            }
        ).then( response => {
                this.setState({ data: JSON.parse(response).data, azs:'ppp' }, () => {
                    this.props.stopLoading();
                })
            }
        )
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleInputChange  = name => event => {
        this.setState({ data: {...this.state.data, [name]: event.target.value} });
    };

    renderContactInfoTab () {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="name"
                    label="Name"
                    className={classes.textField}
                    fullWidth
                    required
                    margin="normal"
                    onChange={this.handleInputChange('name')}
                    value={this.state.data.name}
                    InputLabelProps={{shrink: (this.state.data.name !== '')}}
                />
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    fullWidth
                    margin="normal"
                    onChange={this.handleInputChange('email')}
                    value={this.state.data.email}
                    InputLabelProps={{shrink: (this.state.data.email !== '')}}
                />
                <TextField
                    id="address"
                    label="Address"
                    className={classes.textField}
                    fullWidth
                    margin="normal"
                    onChange={this.handleInputChange('address')}
                    value={this.state.data.address}
                    InputLabelProps={{shrink: (this.state.data.address !== '')}}
                />
                <TextField
                    id="phone"
                    label="Phone"
                    className={classes.textField}
                    fullWidth
                    margin="normal"
                    onChange={this.handleInputChange('phone')}
                    value={this.state.data.phone}
                    InputLabelProps={{shrink: (this.state.data.phone !== '')}}
                />
                <TextField
                    id="description"
                    label="Description"
                    className={classes.textField}
                    fullWidth
                    rows="4"
                    multiline
                    margin="normal"
                    onChange={this.handleInputChange('description')}
                    value={this.state.data.description}
                    InputLabelProps={{shrink: (this.state.data.description !== '')}}
                />
                <TextField
                    id="emergency"
                    label="Emergency Contact"
                    className={classes.textField}
                    fullWidth
                    rows="4"
                    multiline
                    margin="normal"
                    onChange={this.handleInputChange('emergency')}
                    value={this.state.data.emergency}
                    InputLabelProps={{shrink: (this.state.data.emergency !== '')}}
                />
            </form>
        )
    }

    renderPetsTab () {
        return (
            <Grid container spacing={24}>
                {this.state.data.pets.map(function(pet) {
                    return (
                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xs={12}
                            key={pet.id}
                        >
                            <PetCard data={pet} />
                        </Grid>
                    )
                })}
            </Grid>
        )
    }

    renderTurnsTab () {
        let lastTurnDate = '';
        let showDate = false;
        return (
            <Grid container spacing={24}>
                {this.state.data.turns.map(function(turn) {
                    if (lastTurnDate !== turn.date) {
                        lastTurnDate = turn.date;
                        showDate = true;
                    } else {
                        showDate = false;
                    }

                    let dateSection = (showDate) ?
                        (
                            <Grid item xs={12} key={'date_' + turn.id} >
                                <Divider />
                                <Typography color="textPrimary" component={'h2'} variant={'headline'} >
                                    <strong>{turn.date}</strong>
                                </Typography>
                            </Grid>
                        )
                        : '';

                    let cardSection = (
                        <Grid
                            item
                            lg={4}
                            sm={6}
                            xs={12}
                            key={turn.id}
                        >
                            <TurnCard data={turn} />
                        </Grid>
                    );

                    return [dateSection, cardSection];
                })}
            </Grid>
        )
    }

    renderBody () {
        const { classes, theme } = this.props;
        const transitionDuration = {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
        };

        const fabs = [
            {
                color: 'primary',
                className: classes.fab,
                icon: <EditIcon />,
                onClick: () => {}
            }
            ,
            {
                color: 'secondary',
                className: classes.fab,
                icon: <AddIcon />,
                onClick: () => {}
            },
            {
                color: 'inherit',
                className: classNames(classes.fab, classes.fabGreen),
                icon: <AddIcon />,
                onClick: () => {window.scrollTo(0, 0)}
            },
        ];

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Contact Info" icon={<PersonIcon />} />
                        <Tab label="Pets" icon={<PetsIcon />} />
                        <Tab label="Turns" icon={<TurnsIcon />} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction} classes={classes}>{this.renderContactInfoTab()}</TabContainer>
                    <TabContainer dir={theme.direction} classes={classes}>{this.props.loading ? '' : this.renderPetsTab()}</TabContainer>
                    <TabContainer dir={theme.direction} classes={classes}>{this.renderTurnsTab()}</TabContainer>
                </SwipeableViews>
                <div className={classes.fabContainer}>
                    {this.props.loading ?
                        <div></div> :
                        fabs.map((fab, index) => (
                            <Zoom
                                key={fab.color}
                                in={this.state.value === index}
                                timeout={transitionDuration}
                                style={{
                                    transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
                                }}
                                unmountOnExit
                            >
                                <Fab className={fab.className} color={fab.color} onClick={fab.onClick}>
                                    {fab.icon}
                                </Fab>
                            </Zoom>
                        ))
                    }
                </div>
            </div>
        )
    }

    render () {
        return (this.state.data.name === '') ? '' : this.renderBody();
    }
}

function TabContainer(props) {
    const { children, dir, classes } = props;

    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }} className={classes.tabContainer}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => {
    return {
        loading: globalState.view.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLoading: () => dispatch(startLoading()),
        stopLoading: () => dispatch(stopLoading()),
        changeView: (view, data) => dispatch(changeView(view, data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withSnackbar(withApiService(ContactView))));
