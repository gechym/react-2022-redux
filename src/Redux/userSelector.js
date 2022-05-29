import { createSelector } from 'reselect';

export const userSelect = (state) => state.userState;

export const userRemainingSelector = createSelector(userSelect, (userState) => {
    return userState;
});
