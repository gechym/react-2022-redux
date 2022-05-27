import { useEffect, useState } from 'react';

import store from '~/Redux/store';

function App() {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    });

    return <div className="App"></div>;
}
export default App;
