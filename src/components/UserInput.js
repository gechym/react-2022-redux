import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '~/Redux/thunks/userThunk';

const UserInput = ({ editUser, setUserEdit }) => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const dispatch = useDispatch();

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
            const newUser = { ...editUser, name, avatar };
            dispatch(updateUser(newUser));
        } else {
            const newUser = { name, avatar, createdAt };
            dispatch(createUser(newUser));
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
