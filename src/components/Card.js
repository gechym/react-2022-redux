import React from 'react';

import { useDispatch } from 'react-redux';
import { deleteUser } from '~/Redux/thunks/userThunk';
const Card = ({ user, setUserEdit }) => {
    const dispatch = useDispatch();

    const handleDeleteUser = async (id) => {
        // dispatch(deleteUser(id));
        dispatch({ type: 'users/delete_request', payload: id });
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
