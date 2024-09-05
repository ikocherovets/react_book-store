import React, { useState, useEffect } from "react";
import { Book } from "../../types";

interface BookFormProps {
  bookToEdit?: Book | null;
  onSubmit: (book: Omit<Book, "id">) => void;
  onClearForm: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({
  bookToEdit,
  onSubmit,
  onClearForm,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
    } else {
      setTitle("");
      setAuthor("");
    }
  }, [bookToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !author) {
      return;
    }

    onSubmit({ title, author });

    setTitle("");
    setAuthor("");
    onClearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2 className="title is-4">
        {bookToEdit ? "Update Book" : "Add New Book"}
      </h2>

      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Author</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            required
          />
        </div>
      </div>

      <div className="control">
        <button
          type="submit"
          className={`button ${bookToEdit ? "is-warning" : "is-success"}`}
        >
          {bookToEdit ? "Update Book" : "Add Book"}
        </button>
        {bookToEdit && (
          <button
            type="button"
            className="button is-light ml-2"
            onClick={onClearForm}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
};
