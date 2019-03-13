import '../../config.jsx';

export const changeView = (view) => {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_VIEW',
            view
        });

    }
};
