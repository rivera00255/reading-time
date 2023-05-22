'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import Notifications from '../Notifications';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const SelectedLayout = ({ children }: { children: React.ReactNode }) => {
  const segment = useSelectedLayoutSegment();
  const notification = useSelector((state: RootState) => state.notify);

  if (segment === 'login')
    return (
      <>
        {notification.isNotify && <Notifications />}
        {children}
      </>
    );
  return (
    <>
      <Header />
      {notification.isNotify && <Notifications />}
      {children}
      <Footer />
    </>
  );
};

export default SelectedLayout;
