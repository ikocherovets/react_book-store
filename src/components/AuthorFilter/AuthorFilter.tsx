import React from 'react';
import { Author } from '../../types';

interface AuthorFilterProps {
  authors: Author[];
  selectedAuthor: string;
  onChange: (author: string) => void;
}

const AuthorFilter: React.FC<AuthorFilterProps> = ({ authors, selectedAuthor, onChange }) => {
  return (
    <div className="field">
      <label className="label">Filter by Author</label>
      <div className="control">
        <div className="select is-fullwidth">
          <select value={selectedAuthor} onChange={(e) => onChange(e.target.value)}>
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
  );
};

export default AuthorFilter;
