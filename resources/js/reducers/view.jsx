import {
    CHANGE_VIEW,
    START_LOADING,
    STOP_LOADING
} from '../actions/view.jsx';

const initialState = {
    actualView: undefined,
    previousView: undefined,
    loading: undefined,
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
                data: action.data,
            });
        },
        LOADING: () => {
            return updateState({
                loading: action.loading,
            });
        }

    }[action.type] || (() => state))();


};

export default viewReducer;
