import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import type { CardProps } from "../component/Card";

interface SearchBoxProps {
  data: CardProps[];
}

export const SearchBox = ({ data }: SearchBoxProps) => {
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSearch = () => {
    return data?.filter((item) => {
      console.log(item?.owner?.toLowerCase()?.includes("studio"));
    });
  };

  return (
    <div>
      <div className="flex m-auto w-[auto] justify-center items-center">
        <select
          className="bg-gray-200 border-y-2 border-l-2 rounded-tl-md rounded-bl-md h-[3rem] mt-10 w-[9rem] px-4 text-lg text-start"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value=""></option>
          <option value="title">Title</option>
          <option value="owner">contributor</option>
        </select>
        <input
          placeholder="Search for video"
          type="text"
          name="search"
          className="w-[28rem] h-[3rem] mt-10 border-y-2 border-r-2 bg-amber-500 px-4 flex items-center text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          //style={{ verticalAlign: "middle" }}
        />
        <button
          className="w-[4rem] rounded-tr-md rounded-br-md h-[3rem] mt-10 border-y-2 border-r-2 bg-amber-500 px-4 flex items-center text-lg"
          onClick={handleSearch}
        >
          <BiSearch />
        </button>
      </div>
    </div>
  );
};
