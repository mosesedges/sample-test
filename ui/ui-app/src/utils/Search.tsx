import { BiSearch } from "react-icons/bi";

interface SearchBoxProps {
  selectedOption: string;
  search: string;
  onClick: () => void;
  onChange: () => void;
}

export const SearchBox = ({
  selectedOption,
  search,
  onClick,
  onChange,
}: SearchBoxProps) => {
  // const [search, setSearch] = useState("");
  // const [selectedOption, setSelectedOption] = useState("");

  // const handleSearch = () => {
  //   return data?.filter((item) => {
  //     console.log(item?.owner?.toLowerCase()?.includes("studio"));
  //   });
  // };

  return (
    <div>
      <div className="flex m-auto w-[auto] justify-center items-center">
        <select
          className="bg-gray-200 border-y-2 border-l-2 rounded-tl-md rounded-bl-md h-[3rem] mt-10 w-[9rem] px-4 text-lg text-start"
          value={selectedOption}
          onChange={onChange}
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
          onChange={onChange}
          autoComplete="off"
        />
        <button
          className="w-[4rem] rounded-tr-md rounded-br-md h-[3rem] mt-10 border-y-2 border-r-2 bg-amber-500 px-4 flex items-center text-lg"
          onClick={onClick}
        >
          <BiSearch />
        </button>
      </div>
    </div>
  );
};
