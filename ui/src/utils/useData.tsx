import { useSuspenseQuery } from "@tanstack/react-query";

export const useData = (endpoint: string) => {
  return useSuspenseQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/contributions/${endpoint}`
      ); // in a production app I will say the base URL in a environment vairiable.
      if (!response.ok) {
        throw new Error("Network response was not ok"); //In a production app I will pass this to sentry or any monitoring tool used by the company.
      }
      return response.json();
    },
  });
};
