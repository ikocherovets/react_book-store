import { Author, Book } from "../types";

const BASE_URL = 'http://localhost:3000';

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchAuthors = async (): Promise<Author[]> => {
  try {
    const response = await fetch(`${BASE_URL}/authors`);
    if (!response.ok) {
      throw new Error('Failed to fetch authors');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

export const addBook = async (newBook: Omit<Book, 'id'>): Promise<Book> => {
  try {
    const response = await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error('Failed to add book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const editBook = async (id: number, updatedBook: Omit<Book, 'id'>): Promise<Book> => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });
    if (!response.ok) {
      throw new Error('Failed to update book');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
