// I left this file to show the progress I made trying to implement "Persisting  searches and pagination within the URL"

/*import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const LIMIT = 14;

export function usePersistedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const getParam = (key: string, fallback: string) =>
    searchParams.get(key) ?? fallback;

  const [filter, setFilter] = useState(getParam("filter", ""));
  const [searchTerm, setSearchTerm] = useState(getParam("search", ""));
  const [page, setPage] = useState(Number(getParam("page") || "0"));

  const skip = page * LIMIT;

  const updateURLParams = (
    newFilter = filter,
    newSearchTerm = searchTerm,
    newPage = page
  ) => {
    setSearchParams({
      filter: newFilter,
      search: newSearchTerm,
      page: newPage.toString(),
    });
  };

  useEffect(() => {
    setFilter(getParam("filter", ""));
    setSearchTerm(getParam("search", ""));
    setPage(Number(getParam("page") || "0"));
  }, []);

  const handleSearch = () => {
    setPage(0);
    updateURLParams(filter, searchTerm, 0);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    updateURLParams(filter, searchTerm, nextPage);
  };

  const handlePreviousPage = () => {
    const prevPage = Math.max(page - 1, 0);
    setPage(prevPage);
    updateURLParams(filter, searchTerm, prevPage);
  };

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    page,
    skip,
    handleSearch,
    handleNextPage,
    handlePreviousPage,
  };
}*/
