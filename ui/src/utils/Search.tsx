import type { ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBoxProps {
  searchTerm: string;
  selectedField: string;
  onSearch: () => void;
  onFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  selectedField,
  onSearch,
  onFieldChange,
  onSearchInputChange,
}: SearchBoxProps) => {
  return (
    <div className="flex items-center rounded-md overflow-hidden w-full  sm:max-w-[560px] mx-auto">
      <select
        aria-label="Search filter"
        className="bg-gray-200 h-12 sm:w-36 px-4 sm:text-lg border-none w-24 text-[0.8rem]"
        value={selectedField}
        onChange={onFieldChange}
      >
        <option value="">filter</option>
        <option value="title">Title</option>
        <option value="owner">Contributor</option>
        <option value="description">Description</option>
      </select>

      <input
        type="text"
        name="search"
        placeholder="Search for a video..."
        className="sm:w-96 h-12 px-4 sm:text-lg text-sm border-gray-200 border-y bg-white focus:outline-none w-76"
        value={searchTerm}
        onChange={onSearchInputChange}
        autoComplete="off"
        aria-label="Search input"
      />

      <button
        type="button"
        className="h-12 sm:w-12 bg-amber-500 flex items-center justify-center text-white hover:bg-amber-600 transition cursor-pointer"
        onClick={onSearch}
        aria-label="Execute search"
      >
        <BiSearch size={24} />
      </button>
    </div>
  );
};
