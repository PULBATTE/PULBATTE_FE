import React from 'react';
/* eslint import/newline-after-import: "off" */
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Router from './router/Router';

const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </div>
  );
}
