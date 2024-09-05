import React from "react";
import { Book } from "../../types";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onEdit,
  onDelete,
}) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id} className="box">
          <div className="columns">
            <div className="column is-three-quarters">
              <strong>{book.title}</strong> by {book.author}
            </div>
            <div className="column">
              <button
                className="button is-info is-small"
                onClick={() => onEdit(book)}
              >
                Edit
              </button>
              <button
                className="button is-danger is-small ml-2"
                onClick={() => onDelete(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
