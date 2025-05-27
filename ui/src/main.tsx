import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 60 * 1000, // since I am dealing with a static data from my local server. I have intentionaly set to refetch it every 20 minutes.
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div>
          <p className="sm:font-extrabold sm:text-9xl text-4xl flex justify-center items-center pt-[16rem]">
            404
          </p>
          <p className="flex justify-center items-center mx-auto sm:text-4xl text-[1rem]">
            An error occured Please refresh the page
          </p>
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <h1 className="flex justify-center items-center h-screen sm:text-6xl text-[1.5rem]">
              Loading...
            </h1>
          }
        >
          <App />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
