import Grey from '@material-ui/core/colors/grey'
import {TurnsColors} from '../turnsColors'

export const styles = theme => ({
    card: {
        maxWidth: '100%',
        backgroundColor: Grey[100]
    },
    turnType: {
        borderRadius: '4px',
        textAlign: 'center',
    },
    turnTypeText: {
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'white'
    },
    turnMorning: {
        borderLeft: '7px solid ' + TurnsColors.morning
    },
    turnEvening: {
        borderLeft: '7px solid ' + TurnsColors.evening
    },
    turnNoon: {
        borderLeft: '7px solid ' + TurnsColors.noon
    },
    turnDayCare: {
        borderLeft: '7px solid ' + TurnsColors.dayCare
    },
    turnFullDay: {
        borderLeft: '7px solid ' + TurnsColors.fullDay
    },
    turnNight: {
        borderLeft: '7px solid ' + TurnsColors.night
    },
});
