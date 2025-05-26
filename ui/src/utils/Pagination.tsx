import React from "react";

type PaginationProps = {
  page: number;
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({
  page,
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
}) => {
  return (
    <div className="flex justify-between items-center my-4">
      <button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {page + 1}</span>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
