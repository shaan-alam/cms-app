"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
