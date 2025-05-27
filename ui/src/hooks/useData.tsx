import { useSuspenseQuery } from "@tanstack/react-query";

export const useData = (endpoint: string) => {
  return useSuspenseQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/contributions/${endpoint}`
      ); // should be saved in .env file
      if (!response.ok) {
        throw new Error("Network response was not ok"); // pass this to sentry or any monitoring tool used by the organization.
      }
      return response.json();
    },
  });
};
