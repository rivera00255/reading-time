'use client';
import { supabase } from '@/lib/Supabase/supabaseClient';
import { create } from '@/store/slices/notifySlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(error);
        return;
      }
      if (data.user?.user_metadata.status === false) {
        alert('탈퇴한 계정입니다. 다른 계정으로 다시 회원가입한 후 이용해주세요.');
        const { error } = await supabase.auth.signOut();
        return;
      }
      // console.log(data);
      router.replace('/');
      // alert('로그인되었습니다.');
      dispatch(create({ message: '로그인되었습니다.' }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSignup = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { status: true } } });
      if (error) {
        alert(error);
        return;
      }
      console.log(data);
      alert('회원가입이 완료되었습니다. 이메일 인증 후 로그인해주세요.');
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit: SubmitHandler<any> = (data: { email: string; password: string }) => {
    // console.log(data);
    isLogin ? handleLogin(data) : handleSignup(data);
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-480 border rounded px-8 py-12 drop-shadow-sm relative">
        <button className="absolute top-4 left-4 px-2 rounded bg-zinc-100 text-zinc-400" onClick={() => router.back()}>
          &lt;
        </button>
        <h3 className="text-center font-bold text-lg mb-8">{isLogin ? '로그인' : '회원가입'}</h3>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            className={
              !errors.email ? 'border p-4 rounded my-1 text-sm' : 'border border-orange-300 p-4 rounded my-1 text-sm'
            }
            type="text"
            placeholder="이메일"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors.email && <div className="text-xs text-zinc-600 pl-1 pb-2">올바른 이메일 주소를 입력해주세요</div>}
          <input
            className={
              !errors.password ? 'border p-4 rounded my-1 text-sm' : 'border border-orange-300 p-4 rounded my-1 text-sm'
            }
            type="password"
            placeholder="비밀번호 (영문 대소문자, 숫자 6자리 이상 12자리 이하)"
            {...register('password', {
              required: true,
              pattern: /^[a-zA-Z0-9]{6,12}$/,
            })}
          />
          {errors.password && (
            <div className="text-xs text-zinc-600 pl-1 pb-2">
              영문 대소문자, 숫자 6자리 이상 12자리 이하로 입력해주세요
            </div>
          )}
          <button
            className="bg-zinc-100 py-2 rounded my-2 drop-shadow-sm hover:bg-zinc-300 disabled:text-zinc-200 disabled:hover:bg-zinc-100"
            disabled={!isDirty || !isValid}>
            {isLogin ? '로그인' : '회원가입'}
          </button>
        </form>
        <button className="text-sm text-zinc-400 hover:text-zinc-500" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '회원가입' : '로그인'}
        </button>
      </div>
    </main>
  );
};

export default Login;
