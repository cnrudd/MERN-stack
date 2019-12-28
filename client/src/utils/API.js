import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/protected/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/protected/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/protected/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/protected/books", bookData);
  },

  signup: function(newUser) {
    return axios.post("/api/auth/signup", newUser).then(res => res.data);
  },

  login: function(credentials) {
    return axios.post("/api/auth/login", credentials);
  },
};
