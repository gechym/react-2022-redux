import * as userConst from '~/Redux/Constant/userConst';
const initialState = {
    data: [],
    loading: false,
    error: undefined,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConst.fetch_success:
            const newState = {
                ...state,
                loading: false,
                error: undefined,
                data: action.payload,
            };
            return newState;

        case userConst.fetch_request:
            return {
                ...state,
                loading: true,
            };

        case userConst.fetch_error:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case userConst.create_request:
            return {
                ...state,
                loading: true,
            };

        case userConst.create_success:
            return {
                ...state,
                loading: false,
                error: undefined,
                data: [action.payload, ...state.data],
            };

        case userConst.create_error:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Update user
        case userConst.update_request:
            return {
                ...state,
                loading: true,
            };

        case userConst.update_success:
            return {
                ...state,
                loading: false,
                data: state.data?.map((item) => (item.id === action.payload.id ? action.payload : item)),
            };

        case userConst.update_error:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Delete user
        case userConst.delete_request:
            return {
                ...state,
                loading: true,
            };

        case userConst.delete_success:
            return {
                ...state,
                loading: false,
                data: state.data?.filter((item) => item.id !== action.payload),
            };

        case userConst.delete_error:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
