import React, { useEffect, useState } from 'react';
import { getUsers } from './api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import Card from './components/Card';
import Spinner from './components/Spinner';
import UserInput from './components/UserInput';

function App() {
    const [userEdit, setUserEdit] = useState();

    const { error, loading, data: users } = useSelector((state) => state.userState);

    // const state = useSelector2();
    // console.log(state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'users/fetch_request' });

        const fetchData = async () => {
            try {
                const res = await getUsers();
                dispatch({ type: 'users/fetch_success', payload: res });
            } catch (error) {
                console.log(error);
                if (error.response.data?.msg) {
                    dispatch({
                        type: 'users/fetch_error',
                        payload: error.response.data?.msg,
                    });
                    throw new Error(error.response.data?.msg);
                } else {
                    dispatch({ type: 'users/fetch_error', payload: error.message });
                    throw new Error(error.message);
                }
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="wrap">
            <UserInput editUser={userEdit} setUserEdit={setUserEdit} />
            {error && <span>{error}</span>}

            <div className="card_container">
                {users.map((user) => (
                    <React.Fragment key={user.id}>
                        <Card user={user} setUserEdit={setUserEdit} />
                    </React.Fragment>
                ))}
            </div>

            {loading && <Spinner />}
        </div>
    );
}
export default App;
