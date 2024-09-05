import { useState, useEffect } from 'react';
import { Book, Author } from '../types';
import { getBooks, getAuthors } from '../api';

export const useFetchBooksAndAuthors = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooksAndAuthors = async () => {
      try {
        const [booksData, authorsData] = await Promise.all([getBooks(), getAuthors()]);
        setBooks(booksData);
        setAuthors(authorsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchBooksAndAuthors();
  }, []);

  return { books, setBooks, authors, loading, error };
};
