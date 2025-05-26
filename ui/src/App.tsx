import { Card, type CardProps } from "./component/Card";
import "./App.css";
import { Suspense, useState, type ChangeEvent, useEffect } from "react";
import { SearchBox } from "./utils/Search";
import { localizedDate, localeTime } from "./utils/formattedDateAndTime";
import { useData } from "./utils/useData";
import { Pagination } from "./utils/Pagination";

const LIMIT = 14;

function App() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0); // pagination page
  const skip = page * LIMIT;

  const { data, isPending, isSuccess, refetch } = useData(
    `?skip=${skip}&limit=${LIMIT}&order_by=id&${filter ?? ""}=${
      searchTerm ?? ""
    }`
  );

  const [contributorsData, setContributorsData] = useState<CardProps[]>([]);

  useEffect(() => {
    if (data?.contributions) {
      setContributorsData(data.contributions);
    }
  }, [data]);

  const handleChangeSelectedOption = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleChangeinput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setPage(0); // reset to first page
    refetch().then((result) => {
      setContributorsData(result.data?.contributions || []);
    });
  };

  useEffect(() => {
    window.document.title = `${filter} ${searchTerm}`;
    console.log(window.document.title);
  }, [filter]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    refetch().then((result) => {
      setContributorsData(result.data?.contributions || []);
    });
  }, [page]);

  const showStatus = (startTime: string) => {
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const currentDate = formatDate(new Date());
    const showDate = formatDate(new Date(startTime));
    let status = "";
    if (currentDate > showDate) {
      status = "Completed";
    } else if (currentDate === showDate) {
      status = "Active";
    } else {
      status = "Scheduled";
    }
    return status;
  };

  return (
    <div className="p-6">
      <SearchBox
        selectedField={filter}
        searchTerm={searchTerm}
        onSearch={handleSearchClick}
        onFieldChange={handleChangeSelectedOption}
        onSearchInputChange={handleChangeinput}
      />

      <Pagination
        page={page}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        isNextDisabled={contributorsData.length < LIMIT}
        isPreviousDisabled={page === 0}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 m-4 py-4 max-w-9xl mx-auto">
        <Suspense fallback={"Loading ..."}>
          {contributorsData?.map((item: CardProps) => {
            const { id, title, description, owner, startTime, endTime } = item;
            const localeStartTime = localizedDate({ date: startTime });
            const localeEndTime = localizedDate({ date: endTime });
            const formattedStartTime = localeTime(startTime);
            const formattedEndTime = localeTime(endTime);
            return (
              <div key={id}>
                <Card
                  title={title}
                  description={description}
                  startTime={formattedStartTime}
                  endTime={
                    formattedStartTime === formattedEndTime
                      ? ""
                      : formattedEndTime
                  }
                  owner={owner}
                  showStatus={showStatus(startTime)}
                  startDate={localeStartTime}
                  endDate={
                    localeStartTime === localeEndTime ? "" : localeEndTime
                  }
                />
              </div>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
