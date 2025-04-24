import axios from "axios";

const ENDPOINT_URL = "/api/book";

const bookApi = {
  async getBook(bookId) {
    const result = await axios.get(ENDPOINT_URL + "/" + bookId);
    return result.data;
  },
  async getBooksByCategory(category) {
    const result = await axios.get(ENDPOINT_URL + "/category/" + category);
    return result.data;
  },
  async getAllBooks() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
  async createBook(book) {
    try {
      const result = await axios.post(ENDPOINT_URL, book);
      return result.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },
  async updateBook(book) {
    const result = await axios.patch(ENDPOINT_URL + "/" + book.id, book);
    return result.data;
  },
  async deleteBook(bookId) {
    const result = await axios.delete(ENDPOINT_URL + "/" + bookId);
    return result.data;
  },
};

export default bookApi;
