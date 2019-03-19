import '../../config.jsx';

export const changeView = (view, data = {}) => {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_VIEW',
            view,
            data
        });
    }
};

export const startLoading = () => {
    let loading = true;
    return (dispatch) => {
        dispatch({
            type: 'LOADING',
            loading
        });
    }
};

export const stopLoading = () => {
    let loading = false;
    return (dispatch) => {
        dispatch({
            type: 'LOADING',
            loading
        });
    }
};
