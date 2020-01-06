import axios from "axios";
import { Browser as JotBrowser } from 'jwt-jot'

import store from '../redux/store';
import {onLogout} from '../redux/actions';

const axiosP = axios.create({
  baseURL: '/api/protected'
});

// https://www.npmjs.com/package/axios#interceptors
axiosP.interceptors.request.use(
  async function (config) {
    const source = axios.CancelToken.source();
    let authHeader;
    try {
      authHeader = await getAuthHeaderAsync();
    } catch (error) {
      store.dispatch(onLogout());      
      source.cancel(`Request canceled: ${error}`);
      return {cancelToken: source.token};
    }

    config.headers = {
      ...config.headers,
      ...authHeader,
      cancelToken: source.token
    }

    return config;
  }
);

export default {
  // Gets all books
  getBooks: function () {
    return axiosP.get("/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axiosP.get("/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axiosP.delete("/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axiosP.post("/books", bookData);
  },

  signup: function (newUser) {
    return axios.post("/api/auth/signup", newUser).then(res => res.data);
  },

  login: function (credentials) {
    return axios.post("/api/auth/login", credentials).then(res => res.data);
  },
};

function getAuthHeaderAsync() {
  const jot = new JotBrowser('jwt');

  if (jot.getToken() && jot.valid()) return Promise.resolve(makeAuthHeader(jot));

  const refreshJot = new JotBrowser('refreshJwt');

  if (!refreshJot.getToken()) return Promise.reject('Refresh token not found on client.');
  if (!refreshJot.valid()) return Promise.reject('Refresh token not valid on client.');

  return axios.post("/api/auth/refresh", {token: refreshJot.getToken()})
  .then(res => res.data)
  .then(data => {
    if (data.success) {
      new JotBrowser('refreshJwt', data.tokens.refresh);
      const jot = new JotBrowser('jwt', data.tokens.user);
      return makeAuthHeader(jot);
    } else {
      return Promise.reject(data.errors.token);
    }
  });
}

function makeAuthHeader(jot) {
  return {Authorization: 'Bearer ' + jot.getToken()};
}