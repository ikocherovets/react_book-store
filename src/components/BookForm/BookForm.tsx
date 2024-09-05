import React, { useRef, useEffect } from 'react';
import { Author, Book } from '../../types';
import { fetchAuthors } from '../../api';


interface BookFormProps {
  bookToEdit?: Book | null;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  onClearForm: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ bookToEdit, onSubmit, onClearForm }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const [authors, setAuthors] = React.useState<Author[]>([]);

  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const authorsData = await fetchAuthors();
        setAuthors(authorsData);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthorsData();
  }, []);

  useEffect(() => {
    if (bookToEdit) {
      if (titleRef.current) titleRef.current.value = bookToEdit.title;
      if (authorRef.current) authorRef.current.value = bookToEdit.author;
    } else {
      if (titleRef.current) titleRef.current.value = '';
      if (authorRef.current) authorRef.current.value = '';
    }
  }, [bookToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value || '';
    const author = authorRef.current?.value || '';

    onSubmit({ title, author });

    if (titleRef.current) titleRef.current.value = '';
    if (authorRef.current) authorRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2 className="title is-4">{bookToEdit ? 'Update Book' : 'Add New Book'}</h2>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            ref={titleRef}
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
            ref={authorRef}
            placeholder="Enter author name"
            required
          />
        </div>
      </div>
      <div className="control">
        <button type="submit" className={`button ${bookToEdit ? 'is-warning' : 'is-success'}`}>
          {bookToEdit ? 'Update Book' : 'Add Book'}
        </button>
        {bookToEdit && (
          <button
            type="button"
            className="button is-light ml-2"
            onClick={() => onClearForm()}
          >
            Add New Book
          </button>
        )}
      </div>
    </form>
  );
};

