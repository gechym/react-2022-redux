import React, { useEffect, useState } from 'react';
import { getUsers } from './api/userApi';
import store from '~/Redux/store';
import Card from './components/Card';
import Spinner from './components/Spinner';
import UserInput from './components/UserInput';

function App() {
    const [state, setState] = useState(store.getState());
    const { error, loading, data: users } = state.userState;
    const [userEdit, setUserEdit] = useState();

    useEffect(() => {
        store.dispatch({ type: 'users/fetch_request' });

        const fetchData = async () => {
            try {
                const res = await getUsers();
                store.dispatch({ type: 'users/fetch_success', payload: res });
            } catch (error) {
                console.log(error);
                if (error.response.data?.msg) {
                    store.dispatch({
                        type: 'users/fetch_error',
                        payload: error.response.data?.msg,
                    });
                    throw new Error(error.response.data?.msg);
                } else {
                    store.dispatch({ type: 'users/fetch_error', payload: error.message });
                    throw new Error(error.message);
                }
            }
        };

        store.subscribe(() => {
            const newState = store.getState();
            setState(newState);
        });

        fetchData();
    }, []);

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
