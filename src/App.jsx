import React from 'react';
/* eslint import/newline-after-import: "off" */
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import Router from './router/Router';

const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
      <ToastContainer
        position="bottom-center" // 알람 위치 지정
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        theme="colored"
        limit={2} // 알람 개수 제한
      />
    </div>
  );
}
