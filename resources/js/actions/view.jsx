import '../../config.jsx';

export const changeView = (view) => {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_VIEW',
            view
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
