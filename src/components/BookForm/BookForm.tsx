import React, { useState, useEffect } from "react";
import { Author, Book } from "../../types";
import { getAuthors } from "../../api";

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
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthorsData();
  }, []);

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
    onSubmit({ title, author });
    if (!bookToEdit) {
      setTitle("");
      setAuthor("");
    }
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
          {bookToEdit ? (
            <div className="select">
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              >
                <option value="">Select an author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <input
              className="input"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
            />
          )}
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
            Add New Book
          </button>
        )}
      </div>
    </form>
  );
};
