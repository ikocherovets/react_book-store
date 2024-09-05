import React, { useState, useEffect } from "react";
import { Book } from "../../types";
import { getBooks, createBook, removeBook, updateBook } from "../../api";
import { BookForm } from "../BookForm";
import { BookList } from "../BookList";

export const BookApp: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBookData();
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

  return (
    <div className="container">
      <BookForm
        bookToEdit={bookToEdit}
        onSubmit={bookToEdit ? handleEditBook : handleAddBook}
        onClearForm={handleClearForm}
      />
      <BookList
        books={books}
        onEdit={setBookToEdit}
        onDelete={handleDeleteBook}
      />
    </div>
  );
};
