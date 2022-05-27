import React from 'react';
import * as userAPI from '../api/userApi';

import store from '~/Redux/store';
const Card = ({ user, setUserEdit }) => {
    const handleDeleteUser = async (id) => {
        store.dispatch({ type: 'users/delete_request' });

        try {
            await userAPI.deleteUser(id);
            store.dispatch({ type: 'users/delete_success', payload: id });
        } catch (err) {
            store.dispatch({ type: 'users/delete_error', payload: err });
        }
    };

    return (
        <div className="card">
            <h2>{user?.name}</h2>
            <img src={user?.avatar} alt="avatar" />
            <div className="btn_nav">
                <button
                    className="btn_edit"
                    onClick={() => {
                        setUserEdit(user);
                    }}
                >
                    Edit
                </button>
                <button
                    className="btn_delete"
                    onClick={() => {
                        handleDeleteUser(user.id);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Card;
