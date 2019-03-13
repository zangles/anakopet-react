import {
    CHANGE_VIEW,
} from '../actions/view.jsx';

const initialState = {
    actualView: undefined,
    previousView: undefined,
};

const viewReducer = (state = initialState, action) => {

    let updateState = (object) => ({
        ...state,
        ...object
    });
    
    return ({
        CHANGE_VIEW: () => {
            return updateState({
                actualView: action.view,
            });
        },

    }[action.type] || (() => state))();


};

export default viewReducer;
