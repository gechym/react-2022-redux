import React, { useEffect, useState } from 'react';
import * as userAPI from '../api/userApi';
import store from '~/Redux/store';

const UserInput = ({ editUser, setUserEdit }) => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (editUser) {
            setName(editUser.name);
            setAvatar(editUser.avatar);
        }
    }, [editUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdAt = new Date().toISOString();

        if (editUser) {
            try {
                store.dispatch({ type: 'users/update_request' });
                const newUser = { ...editUser, name, avatar };
                const data = await userAPI.updateUser(newUser);

                store.dispatch({ type: 'users/update_success', payload: data });
            } catch (error) {
                if (error.response.data?.msg) {
                    store.dispatch({
                        type: 'users/update_error',
                        payload: error.response.data?.msg,
                    });
                    throw new Error(error.response.data?.msg);
                } else {
                    store.dispatch({
                        type: 'users/update_error',
                        payload: error.message,
                    });
                    throw new Error(error.message);
                }
            }
        } else {
            store.dispatch({ type: 'users/create_request' });
            try {
                const data = await userAPI.createUser({ name, avatar, createdAt });
                console.log(data);

                store.dispatch({ type: 'users/create_success', payload: data });
            } catch (error) {
                if (error.response.data?.msg) {
                    store.dispatch({
                        type: 'users/create_error',
                        payload: error.response.data?.msg,
                    });
                    throw new Error(error.response.data?.msg);
                } else {
                    store.dispatch({
                        type: 'users/create_error',
                        payload: error.message,
                    });
                    throw new Error(error.message);
                }
            }
        }

        setUserEdit(undefined);
        setName('');
        setAvatar('');
    };

    return (
        <form className="user_input" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="input-group">
                <label htmlFor="avatar">Avatar</label>
                <input type="text" required value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            </div>

            <button type="submit">{editUser ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default UserInput;
