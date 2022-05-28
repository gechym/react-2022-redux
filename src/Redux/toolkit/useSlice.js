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
        //     fetch_request: (state, action) => {
        //         return {
        //             ...state,
        //             loading: true,
        //         };
        //     },
        //     fetch_success: (state, action) => {
        //         return {
        //             ...state,
        //             loading: false,
        //             error: undefined,
        //             data: action.payload,
        //         };
        //     },
        //     fetch_error: (state, action) => {
        //         return {
        //             ...state,
        //             loading: false,
        //             error: action.payload,
        //         };
        //     },
        //     create_request: (state, action) => {
        //         return {
        //             ...state,
        //             loading: true,
        //         };
        //     },
        //     create_success: (state, action) => {
        //         return {
        //             ...state,
        //             loading: false,
        //             error: undefined,
        //             data: [action.payload, ...state.data],
        //         };
        //     },
        //     create_error: (state, action) => {
        //         return {
        //             ...state,
        //             loading: false,
        //             error: action.payload,
        //         };
        //     },
        //     update_request: (state, action) => {
        //         return {
        //             ...state,
        //             loading: true,
        //         };
        //     },
        //     update_success: (state, action) => {
        //         return {
        //             ...state,
        //             loading: false,
        //             data: state.data?.map((item) =>
        //                 item.id === action.payload.id ? action.payload : item,
        //             ),
        //         };
        //     },
        //     update_error: (state, action) => {
        //         return {
        //             ...state,
        //             loading: false,
        //             error: action.payload,
        //         };
        //     },
        //     delete_request: (state, action) => {
        //         return {
        //             ...state,
        //             loading: true,
        //         };
        //     },
        //     delete_success: (state, action) => {
        //         return {
        //             ...state,
        //             loading: false,
        //             data: state.data?.filter((item) => item.id !== action.payload),
        //         };
        //     },
        //     delete_error: (state, action) => {
        //         return {
        //             ...state,
        //             loading: false,
        //             error: action.payload,
        //         };
        //     },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [action.payload, ...state.data];
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = state.data.map((user) =>
                    user.id === action.payload.id ? action.payload : user,
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload);
                state.data = state.data.filter(
                    (user) => user.id !== action.payload,
                );
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const getUser = createAsyncThunk(
    'users/getUsers',
    async (payload, thunkAPi) => {
        const res = await useApi.getUsers();
        return res;
        // thunkAPi.dispatch(userActions.fetch_request());
        // try {
        //     thunkAPi.dispatch(userActions.fetch_success(res));
        // } catch (error) {
        //     thunkAPi.dispatch(userActions.fetch_error(error.message));
        // }
    },
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPi) => {
        const res = await useApi.createUser(payload);
        return res;
        // thunkAPi.dispatch(userActions.create_request());
        // try {
        //     const res = await useApi.createUser(payload);
        //     thunkAPi.dispatch(userActions.create_success(res));
        // } catch (error) {
        //     thunkAPi.dispatch(userActions.create_error(error.message));
        // }
    },
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload, thunkAPi) => {
        await useApi.deleteUser(payload);
        return payload;
        // thunkAPi.dispatch(userActions.delete_request());
        // try {
        //     thunkAPi.dispatch(userActions.delete_success(payload));
        // } catch (error) {
        //     thunkAPi.dispatch(userActions.delete_error(error.message));
        // }
    },
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload, thunkAPi) => {
        await useApi.updateUser(payload);
        return payload;
        // thunkAPi.dispatch(userActions.update_request());
        // try {
        //     thunkAPi.dispatch(userActions.update_success(payload));
        // } catch (error) {
        //     thunkAPi.dispatch(userActions.update_error(error.message));
        // }
    },
);

export const userActions = useSlice.actions;

export default useSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import * as useApi from '~/api/userApi';

// const initialState = {
//     data: [],
//     loading: false,
//     error: undefined,
// };

// const useSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
//         //     fetch_request: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: true,
//         //         };
//         //     },
//         //     fetch_success: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: false,
//         //             error: undefined,
//         //             data: action.payload,
//         //         };
//         //     },
//         //     fetch_error: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: false,
//         //             error: action.payload,
//         //         };
//         //     },
//         //     create_request: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: true,
//         //         };
//         //     },
//         //     create_success: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: false,
//         //             error: undefined,
//         //             data: [action.payload, ...state.data],
//         //         };
//         //     },
//         //     create_error: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: false,
//         //             error: action.payload,
//         //         };
//         //     },
//         //     update_request: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: true,
//         //         };
//         //     },
//         //     update_success: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: false,
//         //             data: state.data?.map((item) =>
//         //                 item.id === action.payload.id ? action.payload : item,
//         //             ),
//         //         };
//         //     },
//         //     update_error: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: false,
//         //             error: action.payload,
//         //         };
//         //     },
//         //     delete_request: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: true,
//         //         };
//         //     },
//         //     delete_success: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: false,
//         //             data: state.data?.filter((item) => item.id !== action.payload),
//         //         };
//         //     },
//         //     delete_error: (state, action) => {
//         //         return {
//         //             ...state,
//         //             loading: false,
//         //             error: action.payload,
//         //         };
//         //     },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getUser.pending, (state, action) => {
//                 state.loading = true;
//             })
//             .addCase(getUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })
//             .addCase(getUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(createUser.pending, (state, action) => {
//                 state.loading = true;
//             })
//             .addCase(createUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = [action.payload, ...state.data];
//             })
//             .addCase(createUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(updateUser.pending, (state, action) => {
//                 state.loading = true;
//             })
//             .addCase(updateUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = state.data.map((user) =>
//                     user.id === action.payload.id ? action.payload : user,
//                 );
//             })
//             .addCase(updateUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(deleteUser.pending, (state, action) => {
//                 state.loading = true;
//             })
//             .addCase(deleteUser.fulfilled, (state, action) => {
//                 state.loading = false;
//                 console.log(action.payload);
//                 state.data = state.data.filter(
//                     (user) => user.id !== action.payload,
//                 );
//             })
//             .addCase(deleteUser.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export const getUser = createAsyncThunk(
//     'users/getUsers',
//     async (payload, thunkAPi) => {
//         const res = await useApi.getUsers();
//         return res;
//         // thunkAPi.dispatch(userActions.fetch_request());
//         // try {
//         //     thunkAPi.dispatch(userActions.fetch_success(res));
//         // } catch (error) {
//         //     thunkAPi.dispatch(userActions.fetch_error(error.message));
//         // }
//     },
// );

// export const createUser = createAsyncThunk(
//     'users/createUser',
//     async (payload, thunkAPi) => {
//         const res = await useApi.createUser(payload);
//         return res;
//         // thunkAPi.dispatch(userActions.create_request());
//         // try {
//         //     const res = await useApi.createUser(payload);
//         //     thunkAPi.dispatch(userActions.create_success(res));
//         // } catch (error) {
//         //     thunkAPi.dispatch(userActions.create_error(error.message));
//         // }
//     },
// );

// export const deleteUser = createAsyncThunk(
//     'users/deleteUser',
//     async (payload, thunkAPi) => {
//         await useApi.deleteUser(payload);
//         return payload;
//         // thunkAPi.dispatch(userActions.delete_request());
//         // try {
//         //     thunkAPi.dispatch(userActions.delete_success(payload));
//         // } catch (error) {
//         //     thunkAPi.dispatch(userActions.delete_error(error.message));
//         // }
//     },
// );

// export const updateUser = createAsyncThunk(
//     'users/updateUser',
//     async (payload, thunkAPi) => {
//         await useApi.updateUser(payload);
//         return payload;
//         // thunkAPi.dispatch(userActions.update_request());
//         // try {
//         //     thunkAPi.dispatch(userActions.update_success(payload));
//         // } catch (error) {
//         //     thunkAPi.dispatch(userActions.update_error(error.message));
//         // }
//     },
// );

// export const userActions = useSlice.actions;

// export default useSlice.reducer;
