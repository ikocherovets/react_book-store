import React from "react";
import { Book } from "../../types";
import { createBook, removeBook, updateBook } from "../../api";
import { BookForm } from "../BookForm";
import { BookList } from "../BookList";

import { sortBooks, filterBooksByAuthor } from "../../services/sortingService";
import AuthorFilter from "../AuthorFilter/AuthorFilter";
import { SortControl } from "../SortControl/SortControl";
import { useFetchBooksAndAuthors } from "../../hooks/useFetchBooksAndAuthors";

import { ErrorMessages } from "../../types/ErrorMessages";
import { SortOrder } from "../../types/SortOrder";
import { Loader } from "../Loader/Loader";

export const BookApp: React.FC = () => {
  const { books, setBooks, authors, loading, error } =
    useFetchBooksAndAuthors();
  const [bookToEdit, setBookToEdit] = React.useState<Book | null>(null);
  const [selectedAuthor, setSelectedAuthor] = React.useState("");
  const [sortField, setSortField] = React.useState<keyof Book>("title");
  const [sortOrder, setSortOrder] = React.useState<
    SortOrder.ASC | SortOrder.DESC
  >(SortOrder.ASC);

  const handleAddBook = async (newBook: Omit<Book, "id">) => {
    try {
      const addedBook = await createBook(newBook);
      setBooks([...books, addedBook]);
    } catch (error) {
      console.error(ErrorMessages.INVALID_INPUT);
    }
  };

  const handleEditBook = async (editedBook: Omit<Book, "id">) => {
    if (bookToEdit) {
      try {
        const updatedBook = await updateBook(bookToEdit.id, editedBook);
        setBooks(
          books.map((book) => (book.id === bookToEdit.id ? updatedBook : book))
        );
        setBookToEdit(null);
      } catch (error) {
        console.error(ErrorMessages.NOT_FOUND);
      }
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await removeBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error(ErrorMessages.SERVER_ERROR);
    }
  };

  const handleClearForm = () => {
    setBookToEdit(null);
  };

  const filteredBooks = filterBooksByAuthor(books, selectedAuthor);
  const sortedBooks = sortBooks(filteredBooks, sortField, sortOrder);

  if (loading) return <Loader />;

  if (error) return <div>{ErrorMessages.NETWORK_ERROR}</div>;

  return (
    <div className="container">
      <div className="mb-6">
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
              onSortOrderChange={() =>
                setSortOrder(
                  sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
                )
              }
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
