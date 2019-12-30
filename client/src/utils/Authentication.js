import { Browser as JotBrowser } from 'jwt-jot'

export function isLoggedIn() {
    const jwt = new JotBrowser('jwt');
    return jwt && jwt.valid();
}

export function logOut() {
    const jwt = new JotBrowser('jwt');
    if (jwt) {
        jwt.eject();
        window.location = '/'
    }
}

export function getJwt() {
    const jwt = new JotBrowser('jwt');
    return jwt.valid() ? jwt.getToken() : null;
}

