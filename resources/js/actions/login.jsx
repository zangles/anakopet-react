import '../../config.jsx';

export const updateLoginField = (field, value) => {
    return {
        type: 'UPDATE_LOGIN_FIELD',
        field,
        value
    }
};

export const loginSuccessful = (tokenType, accessToken, refreshToken, expire) => {
    return (dispatch) => {
        const authToken = tokenType + " " + accessToken;

        dispatch({
            type: 'LOGIN_SUCCESSFUL',
            tokenType,
            accessToken,
            refreshToken,
            expire,
            authToken: tokenType + " " + accessToken,
        });

    }
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};


export const loginFailed = (err) => {
    return {
        type: 'LOGIN_FAILED',
        errorLabel: err.id,
        error: err
    };
};
