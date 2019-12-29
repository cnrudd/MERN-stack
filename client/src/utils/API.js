import axios from "axios";

import {getJwt} from './Authentication';

const axiosP = axios.create({
  baseURL: '/api/protected'
});

axiosP.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = {
    ...config.headers,
    ...getAuthHeader()
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default {
  // Gets all books
  getBooks: function() {
    return axiosP.get("/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axiosP.get("/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axiosP.delete("/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axiosP.post("/books", bookData);
  },

  signup: function(newUser) {
    return axios.post("/api/auth/signup", newUser).then(res => res.data);
  },

  login: function(credentials) {
    return axios.post("/api/auth/login", credentials).then(res => res.data);
  },
};

function getAuthHeader() {
  const jwt = getJwt();
  return jwt ? {Authorization: 'Bearer ' + jwt} : undefined
}