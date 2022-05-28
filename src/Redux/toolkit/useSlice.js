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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => {
                    return (
                        action.type.startsWith('users/') &&
                        action.type.endsWith('/pending')
                    );
                },
                (state, action) => {
                    state.loading = true;
                },
            )
            .addMatcher(
                (action) => {
                    return (
                        action.type.startsWith('users/') &&
                        action.type.endsWith('/fulfilled')
                    );
                },
                (state, action) => {
                    state.loading = false;
                    state.data = action.payload;
                },
            )
            .addMatcher(
                (action) => {
                    return (
                        action.type.startsWith('users/') &&
                        action.type.endsWith('/rejected')
                    );
                },
                (state, action) => {
                    state.loading = false;
                    state.error = action.error;
                },
            );
    },
});

export const getUser = createAsyncThunk(
    'users/getUsers',
    async (payload, thunkAPi) => {
        const res = await useApi.getUsers();
        return res;
    },
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPi) => {
        const res = await useApi.createUser(payload);
        const state = thunkAPi.getState().userState;
        return [res, ...state.data];
    },
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload, thunkAPi) => {
        await useApi.deleteUser(payload);
        const state = thunkAPi.getState().userState;
        return state.data.filter((user) => user.id !== payload);
    },
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload, thunkAPi) => {
        await useApi.updateUser(payload);
        const state = thunkAPi.getState().userState;
        return state.data.map((user) =>
            user.id === payload.id ? payload : user,
        );
    },
);

export const userActions = useSlice.actions;

export default useSlice.reducer;
