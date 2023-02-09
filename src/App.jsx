import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import Router from './router/Router';
import Header from './components/common/header/Header';

const queryClient = new QueryClient();
export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Router />
        <ToastContainer
          position="bottom-center" // 알람 위치 지정
          closeOnClick // 클릭으로 알람 닫기
          rtl={false} // 알림 좌우 반전
          theme="colored"
          limit={1} // 알람 개수 제한
          autoClose={3000}
        />
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
