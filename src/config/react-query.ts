import { QueryClient } from "@tanstack/react-query";

export const reactQueryClient = new QueryClient({
    defaultOptions: { 
      queries: { 
        refetchOnMount: false, 
        refetchOnWindowFocus: false, 
        refetchOnReconnect: false
      } 
    } 
  })