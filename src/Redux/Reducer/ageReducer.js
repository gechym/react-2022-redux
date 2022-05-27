const ageReducer = (state = { age: '10' }, action) => {
    switch (action.type) {
        case 'updateAge':
            const newState = { ...state, age: action.age };
            return newState;
        default:
            return state;
    }
};

export default ageReducer;
