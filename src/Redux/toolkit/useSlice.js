import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as useApi from '~/api/userApi';

const initialState = {
    data: [],
    loading: false,
    error: undefined,
};

const useSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetch_request: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        fetch_success: (state, action) => {
            return {
                ...state,
                loading: false,
                error: undefined,
                data: action.payload,
            };
        },
        fetch_error: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        create_request: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        create_success: (state, action) => {
            return {
                ...state,
                loading: false,
                error: undefined,
                data: [action.payload, ...state.data],
            };
        },
        create_error: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        update_request: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        update_success: (state, action) => {
            return {
                ...state,
                loading: false,
                data: state.data?.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                ),
            };
        },
        update_error: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        delete_request: (state, action) => {
            return {
                ...state,
                loading: true,
            };
        },
        delete_success: (state, action) => {
            return {
                ...state,
                loading: false,
                data: state.data?.filter((item) => item.id !== action.payload),
            };
        },
        delete_error: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
    },
});

export const getUser = createAsyncThunk(
    'users/getUsers',
    async (payload, thunkAPi) => {
        thunkAPi.dispatch(userActions.fetch_request());
        try {
            const res = await useApi.getUsers();
            thunkAPi.dispatch(userActions.fetch_success(res));
        } catch (error) {
            thunkAPi.dispatch(userActions.fetch_error(error.message));
        }
    },
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPi) => {
        thunkAPi.dispatch(userActions.create_request());
        try {
            const res = await useApi.createUser(payload);
            thunkAPi.dispatch(userActions.create_success(res));
        } catch (error) {
            thunkAPi.dispatch(userActions.create_error(error.message));
        }
    },
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload, thunkAPi) => {
        thunkAPi.dispatch(userActions.delete_request());
        try {
            await useApi.deleteUser(payload);
            thunkAPi.dispatch(userActions.delete_success(payload));
        } catch (error) {
            thunkAPi.dispatch(userActions.delete_error(error.message));
        }
    },
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload, thunkAPi) => {
        thunkAPi.dispatch(userActions.update_request());
        try {
            await useApi.updateUser(payload);
            thunkAPi.dispatch(userActions.update_success(payload));
        } catch (error) {
            thunkAPi.dispatch(userActions.update_error(error.message));
        }
    },
);

export const userActions = useSlice.actions;

export default useSlice.reducer;
