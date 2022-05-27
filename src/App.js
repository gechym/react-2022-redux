import { useEffect, useState } from 'react';

import store from '~/Redux/store';

function App() {
    const [state, setState] = useState(store.getState());

    const handleUpdateStore = () => {
        const action = { type: 'updateName', name: 'gechym😂' };
        store.dispatch(action);
    };

    const handleUpdateStoreAge = () => {
        const action = { type: 'updateAge', age: '10🙌' };
        store.dispatch(action);
    };

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    });

    return (
        <div className="App">
            <button onClick={handleUpdateStore}>Click me 😊</button>
            <button onClick={handleUpdateStoreAge}>Click me😘</button>
            <h1>Hello {state.nameState.name}</h1>
            <h1>Age {state.ageState.age}</h1>
        </div>
    );
}
export default App;
