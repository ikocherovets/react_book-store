import React from "react";
import { Book } from "../../types";
import { SortOrder } from "../../types/SortOrder";

interface Props {
  sortField: keyof Book;
  sortOrder: SortOrder.ASC | SortOrder.DESC;
  onSortFieldChange: (field: keyof Book) => void;
  onSortOrderChange: () => void;
}

export const SortControl: React.FC<Props> = ({
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
          className={`button ${sortOrder === SortOrder.ASC ? "is-info" : "is-warning"}`}
          onClick={onSortOrderChange}
        >
          {sortOrder === SortOrder.ASC ? "Ascending" : "Descending"}
        </button>
      </div>
    </div>
  );
};
