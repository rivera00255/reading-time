'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';
import Notifications from '../Notifications';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import dynamic from 'next/dynamic';
// import AuthProvider from '@/lib/Supabase/AuthProvider';

const AuthProvider = dynamic(() => import('@/lib/Supabase/AuthProvider'));

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
    <AuthProvider>
      <Header />
      {notification.isNotify && <Notifications />}
      {children}
      <Footer />
    </AuthProvider>
  );
};

export default SelectedLayout;
