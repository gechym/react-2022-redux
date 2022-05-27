import * as userConst from '~/Redux/Constant/userConst';

// Fetch Users
export const fetch_request = () => {
    return { type: userConst.fetch_request };
};

export const fetch_success = (users) => {
    return { type: userConst.fetch_success, payload: users };
};

export const fetch_error = (err) => {
    return { type: userConst.fetch_error, payload: err };
};

// Create User
export const create_request = () => {
    return { type: userConst.create_request };
};

export const create_success = (newUser) => {
    return { type: userConst.create_success, payload: newUser };
};

export const create_error = (err) => {
    return { type: userConst.create_success, payload: err };
};

// Update User
export const update_request = () => {
    return { type: userConst.update_request };
};

export const update_success = (newUser) => {
    return { type: userConst.update_success, payload: newUser };
};

export const update_error = (err) => {
    return { type: userConst.update_error, payload: err };
};

// Delete User
export const delete_request = () => {
    return { type: userConst.delete_request };
};

export const delete_success = (id) => {
    return { type: userConst.delete_success, payload: id };
};

export const delete_error = (err) => {
    return { type: userConst.delete_error, payload: err };
};
