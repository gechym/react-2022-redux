const nameReducer = (state = { name: 'Bảo👌' }, action) => {
    switch (action.type) {
        case 'updateName':
            const newState = { ...state, name: action.name };
            return newState;
        default:
            return state;
    }
};

export default nameReducer;
