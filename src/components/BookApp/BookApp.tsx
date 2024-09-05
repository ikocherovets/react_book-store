import React, { useState, useEffect } from "react";
import { Book, Author } from "../../types";
import { getBooks, createBook, removeBook, updateBook, getAuthors } from "../../api";
import { BookForm } from "../BookForm";
import { BookList } from "../BookList";

export const BookApp: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]); 
  const [selectedAuthor, setSelectedAuthor] = useState(''); 

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    const fetchAuthorsData = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchBookData();
    fetchAuthorsData();
  }, []);

  const handleAddBook = async (newBook: Omit<Book, "id">) => {
    try {
      const addedBook = await createBook(newBook);
      setBooks([...books, addedBook]);
    } catch (error) {
      console.error("Error adding book", error);
    }
  };

  const handleEditBook = async (editedBook: Omit<Book, "id">) => {
    if (bookToEdit) {
      try {
        const updatedBook = await updateBook(bookToEdit.id, editedBook);
        setBooks(
          books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
        );
        setBookToEdit(null);
      } catch (error) {
        console.error("Error updating book", error);
      }
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await removeBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };

  const handleClearForm = () => {
    setBookToEdit(null);
  };

  
  const filteredBooks = selectedAuthor
    ? books.filter((book) => book.author === selectedAuthor)
    : books;

  return (
    <div className="container">
      <div className="field">
        <label className="label">Filter by Author</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <option value="">All Authors</option>
              {authors.map((author) => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <BookForm
        bookToEdit={bookToEdit}
        onSubmit={bookToEdit ? handleEditBook : handleAddBook}
        onClearForm={handleClearForm}
      />
      <BookList
        books={filteredBooks} 
        onEdit={setBookToEdit}
        onDelete={handleDeleteBook}
      />
    </div>
  );
};
