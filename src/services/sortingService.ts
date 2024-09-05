import { Book } from '../types';

export const sortBooks = (
  books: Book[],
  sortField: keyof Book,
  sortOrder: 'asc' | 'desc'
): Book[] => {
  return [...books].sort((a, b) => {
    const fieldA = a[sortField].toString().toLowerCase();
    const fieldB = b[sortField].toString().toLowerCase();

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterBooksByAuthor = (books: Book[], selectedAuthor: string): Book[] => {
  return selectedAuthor ? books.filter((book) => book.author === selectedAuthor) : books;
};
