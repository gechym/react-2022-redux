import * as useApi from '~/api/userApi';
import { userActions } from '~/Redux/toolkit/useSlice';

export const getUsers = (id) => async (dispatch) => {
    console.log(id);
    dispatch(userActions.fetch_request());
    try {
        const res = await useApi.getUsers();
        dispatch(userActions.fetch_success(res));
    } catch (error) {
        dispatch(userActions.fetch_error(error.message));
    }
};

export const deleteUser = (id) => async (dispatch) => {
    dispatch(userActions.delete_request());
    try {
        await useApi.deleteUser(id);
        dispatch(userActions.delete_success(id));
    } catch (error) {
        if (error.response.data?.msg) {
            dispatch(userActions.delete_error(error.response.data?.msg));
            throw new Error(error.response.data?.msg);
        } else {
            dispatch(userActions.delete_error(error.message));
            throw new Error(error.message);
        }
    }
};

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch(userActions.update_request());
        const data = await useApi.updateUser(user);

        dispatch(userActions.update_success(data));
    } catch (error) {
        if (error.response.data?.msg) {
            dispatch(userActions.update_error(error.response.data?.msg));
            throw new Error(error.response.data?.msg);
        } else {
            dispatch(userActions.update_error(error.message));
            throw new Error(error.message);
        }
    }
};

export const createUser = (user) => async (dispatch) => {
    dispatch(userActions.create_request());
    try {
        const data = await useApi.createUser(user);
        dispatch(userActions.create_success(data));
    } catch (error) {
        if (error.response.data?.msg) {
            dispatch(userActions.create_error(error.response.data?.msg));
            throw new Error(error.response.data?.msg);
        } else {
            dispatch(userActions.create_error(error.message));
            throw new Error(error.message);
        }
    }
};
