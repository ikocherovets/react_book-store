import React from "react";
import { Book } from "../../types";

interface SortControlProps {
  sortField: keyof Book;
  sortOrder: "asc" | "desc";
  onSortFieldChange: (field: keyof Book) => void;
  onSortOrderChange: () => void;
}

export const SortControl: React.FC<SortControlProps> = ({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}) => {
  return (
    <div className="field">
      <label className="label">Sort By</label>
      <div className="control">
        <div className="select">
          <select
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value as keyof Book)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>
      </div>
      <div className="control mt-2">
        <button
          className={`button ${sortOrder === "asc" ? "is-info" : "is-warning"}`}
          onClick={onSortOrderChange}
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
    </div>
  );
};
