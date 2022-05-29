import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from './components/Card';
import Spinner from './components/Spinner';
import UserInput from './components/UserInput';

import { getUsers } from '~/Redux/thunks/userThunk';
import { userRemainingSelector } from '~/Redux/userSelector';

function App() {
    const [userEdit, setUserEdit] = useState();

    const { error, loading, data: users } = useSelector(userRemainingSelector);

    // const state = useSelector2();
    // console.log(state);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(123));
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
