import React from "react";
import { Book } from "../../types";
import { createBook, removeBook, updateBook } from "../../api";
import { BookForm } from "../BookForm";
import { BookList } from "../BookList";

import { sortBooks, filterBooksByAuthor } from "../../services/sortingService";
import AuthorFilter from "../AuthorFilter/AuthorFilter";
import { SortControl } from "../SortControl/SortControl";
import { useFetchBooksAndAuthors } from "../../hooks/useFetchBooksAndAuthors"; 

export const BookApp: React.FC = () => {
  const { books, setBooks, authors, loading, error } = useFetchBooksAndAuthors(); 
  const [bookToEdit, setBookToEdit] = React.useState<Book | null>(null);
  const [selectedAuthor, setSelectedAuthor] = React.useState('');
  const [sortField, setSortField] = React.useState<keyof Book>('title');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

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

  const filteredBooks = filterBooksByAuthor(books, selectedAuthor);
  const sortedBooks = sortBooks(filteredBooks, sortField, sortOrder);

  if (loading) return <div>Loading...</div>;  
  if (error) return <div>{error}</div>;  

  return (
    <div className="container">
      <div className="box mb-6">
        <BookForm
          bookToEdit={bookToEdit}
          onSubmit={bookToEdit ? handleEditBook : handleAddBook}
          onClearForm={handleClearForm}
        />
      </div>

      <div className="box mb-6">
        <div className="columns">
          <div className="column is-half">
            <AuthorFilter
              authors={authors}
              selectedAuthor={selectedAuthor}
              onChange={(author) => setSelectedAuthor(author)}
            />
          </div>
          <div className="column is-half">
            <SortControl
              sortField={sortField}
              sortOrder={sortOrder}
              onSortFieldChange={(field) => setSortField(field)}
              onSortOrderChange={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            />
          </div>
        </div>
      </div>

      <BookList
        books={sortedBooks} 
        onEdit={setBookToEdit}
        onDelete={handleDeleteBook}
      />
    </div>
  );
};
