import { Book, Author } from "../types";
import { client } from "../utils/fetchClient";

export const getBooks = () => {
  return client.get<Book[]>("/books");
};

export const getAuthors = () => {
  return client.get<Author[]>("/authors");
};

export const createBook = (newBook: Omit<Book, "id">) => {
  return client.post<Book>("/books", newBook);
};

export const updateBook = (id: number, updatedBook: Partial<Book>) => {
  return client.patch<Book>(`/books/${id}`, updatedBook);
};

export const removeBook = (id: number) => {
  return client.delete(`/books/${id}`);
};
