const thunkMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        if (typeof action == 'function') {
            return action(dispatch);
        }

        next(action);
    };

export default thunkMiddleware;
