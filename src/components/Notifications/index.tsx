'use client';
import { RootState } from '@/store';
import { remove } from '@/store/slices/notifySlice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Notifications = () => {
  const timer = useRef<NodeJS.Timeout>(null);
  const notification = useSelector((state: RootState) => state.notify);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    const setTimer = setTimeout(() => {
      dispatch(remove());
    }, 2000);
  }, [dispatch]);

  return (
    <div className="fixed top-8 right-10 bg-white px-4 py-2 rounded text-sm drop-shadow-md flex items-center justify-between z-10">
      <p className="mr-4">{notification.message}</p>
      <button className="text-xs" onClick={() => dispatch(remove())}>
        ✕
      </button>
    </div>
  );
};

export default Notifications;
