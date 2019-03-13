import {
    LOGIN_SUCCESSFUL,
    LOGIN_FAILED,
} from '../actions/login.jsx';

import ls from 'local-storage';

const initialState = {
    username: '',
    password: '',
    inProgress: false,
    error: {},
    authToken: undefined,
    userLabel: undefined,
    userPicture: undefined,
    userLoginPicture: undefined,
    userData: {},
    userIdentity: undefined,
    isSocial: false,
    previousUsers: []
};

const loginReducer = (state = initialState, action) => {

    let updateState = (object) => ({
        ...state,
        ...object
    });
    
    return ({
        LOGIN_SUCCESSFUL: () => {
            ls.set('authToken', action.authToken);

            return updateState({
                authToken: action.authToken,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            });
        },

        LOGIN_FAILED: () => {
            return updateState({
                password: '',
                error: {
                    label: action.errorLabel ? action.errorLabel : 'login.defaultError',
                    show: true
                },
                inProgress: false
            });
        },

    }[action.type] || (() => state))();


};

export default loginReducer;
