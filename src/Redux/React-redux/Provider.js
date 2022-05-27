import React, { useContext, useEffect, useState } from 'react';

const Contex = React.createContext();

export function Provider({ children, store }) {
    Contex.displayName = 'React-redux-custom';
    return <Contex.Provider value={store}>{children}</Contex.Provider>;
}

export const useSelector = (selector) => {
    const store = useContext(Contex);

    const [state, setState] = useState(() => selector(store.getState()));

    useEffect(() => {
        const unsubcribe = store.subscribe(() => {
            setState(() => selector(store.getState()));
        });

        return () => unsubcribe;
    }, [store, selector]);

    return state;
};

export const useSelector2 = () => {
    const store = useContext(Contex);

    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const unsubcribe = store.subscribe(() => {
            setState(store.getState());
        });

        return () => unsubcribe;
    }, [store]);

    return state;
};

export const useDispatch = () => {
    const { dispatch } = useContext(Contex);
    return dispatch;
};
