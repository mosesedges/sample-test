import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const renderWithQueryClient = (ui: ReactNode) => {
  return <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>;
};
