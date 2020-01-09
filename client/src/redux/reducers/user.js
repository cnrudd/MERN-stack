/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 * Remember that actions only describe what happened, but don't describe how the application's state changes.
 * @see {@link https://redux.js.org/basics/reducers}
 * 
 */

import { Browser as JotBrowser } from 'jwt-jot'

import { LOGIN, LOGOUT } from "../actionTypes";

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            new JotBrowser('JWT_ACCESS', action.payload.tokens.access);
            new JotBrowser('JWT_REFRESH', action.payload.tokens.refresh);
            return {
                ...state,
                details: setUserDetails()
            };
        }
        case LOGOUT: {
            // remove all tokens from local storage
            const accessJot = new JotBrowser('JWT_ACCESS');
            if (accessJot.getToken()) accessJot.eject();
            const refreshJot = new JotBrowser('JWT_REFRESH');
            if (refreshJot.getToken()) refreshJot.eject();

            return {
                ...state,
                details: setUserDetails()
            };
        }
        default:
            return {
                ...state,
                details: setUserDetails()
            };
    }
}

const setUserDetails = () => {
    const accessJot = new JotBrowser('JWT_ACCESS');
    return accessJot.getToken() ?
        {
            firstName: accessJot.getClaim('firstName'),
            role: accessJot.getClaim('role'),
            id: accessJot.getClaim('sub')
        } :
        null;
}
export const initialState = {
    details: setUserDetails()
};