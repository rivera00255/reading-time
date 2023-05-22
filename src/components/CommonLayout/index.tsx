'use client';
import QueryProvider from '@/lib/Provider';
import { Provider } from 'react-redux';
import store from '@/store';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  );
};

export default CommonLayout;
