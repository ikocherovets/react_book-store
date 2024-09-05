import React, { useRef, useEffect, useState } from 'react';
import { Author, Book } from '../../types';
import { getAuthors } from '../../api';

interface BookFormProps {
  bookToEdit?: Book | null;
  onSubmit: (book: Omit<Book, 'id'>) => void;
  onClearForm: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ bookToEdit, onSubmit, onClearForm }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);
  const authorSelectRef = useRef<HTMLSelectElement>(null);
  const [authors, setAuthors] = useState<Author[]>([]);

  // Загружаем список авторов при монтировании компонента
  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const authorsData = await getAuthors();
        setAuthors(authorsData);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthorsData();
  }, []);

  // Заполняем поля, если книга редактируется
  useEffect(() => {
    if (bookToEdit) {
      if (titleRef.current) titleRef.current.value = bookToEdit.title;
      if (authorInputRef.current) authorInputRef.current.value = bookToEdit.author;
    } else {
      if (titleRef.current) titleRef.current.value = '';
      if (authorInputRef.current) authorInputRef.current.value = '';
    }
  }, [bookToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value || '';
    let author = '';

    if (bookToEdit) {
      // При редактировании используем значение из select
      author = authorSelectRef.current?.value || '';
    } else {
      // При добавлении новой книги используем значение из input
      author = authorInputRef.current?.value || '';
    }

    onSubmit({ title, author });

    // Очищаем поля формы
    if (!bookToEdit) {
      if (titleRef.current) titleRef.current.value = '';
      if (authorInputRef.current) authorInputRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2 className="title is-4">{bookToEdit ? 'Update Book' : 'Add New Book'}</h2>

      {/* Поле ввода названия книги */}
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

      {/* Поле для ввода или выбора автора */}
      <div className="field">
        <label className="label">Author</label>
        <div className="control">
          {bookToEdit ? (
            // При редактировании используем select для выбора автора
            <div className="select">
              <select ref={authorSelectRef} defaultValue={bookToEdit.author} required>
                <option value="">Select an author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // При добавлении книги используем input для ввода нового автора
            <input
              className="input"
              type="text"
              ref={authorInputRef}
              placeholder="Enter author name"
              required
            />
          )}
        </div>
      </div>

      {/* Кнопки для добавления/редактирования и очистки формы */}
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
