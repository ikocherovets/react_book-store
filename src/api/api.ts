import { Book, Author } from '../types';
import { client } from '../utils/fetchClient';

// Получение списка книг
export const getBooks = () => {
  return client.get<Book[]>('/books');
};

// Получение списка авторов
export const getAuthors = () => {
  return client.get<Author[]>('/authors');
};

// Добавление новой книги
export const createBook = (newBook: Omit<Book, 'id'>) => {
  return client.post<Book>('/books', newBook);
};

// Редактирование книги
export const updateBook = (id: number, updatedBook: Partial<Book>) => {
  return client.patch<Book>(`/books/${id}`, updatedBook);
};

// Удаление книги
export const removeBook = (id: number) => {
  return client.delete(`/books/${id}`);
};
