'use client';
import NotFound from '@/components/NotFound';
import useAuth from '@/hooks/useAuth';
import { AuthContext } from '@/lib/Supabase/AuthProvider';
import { supabase } from '@/lib/Supabase/supabaseClient';
import { create } from '@/store/slices/notifySlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const Profile = () => {
  // const { loading, auth } = useAuth();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState({ url: '', file: new Blob() });
  // console.log(imageUrl.indexOf(`${userId}/profile`));
  // console.log(imageUrl.slice(74));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const updateUser: SubmitHandler<any> = async ({ password }: { password: string }) => {
    // const { data, error } = await supabase.auth.admin.updateUserById(`${userId}`, { password });
    const { data, error } = await supabase.auth.updateUser({ password });
    if (!error) {
      reset();
      dispatch(create({ message: '비밀번호가 변경되었습니다.' }));
      setIsEdit(false);
    }
    // console.log(data);
    // console.log(error);
  };

  const getProfile = async (id: string) => {
    try {
      let filename = '';
      const { data, error } = await supabase.storage.from('profile').list(`${id}`, {
        search: 'profile',
      });
      if (data && data.length > 0) {
        filename = data[data.length - 1].name;
        const { data: image } = supabase.storage.from('profile').getPublicUrl(`${id}/${filename}`);
        image && setImageUrl(image.publicUrl);
      }
      // const { data, error } = await supabase.storage.from('profile').list(`${id}`, {
      //   search: 'profile',
      // });
      // if (data && data.length > 0) {
      //   const { data } = supabase.storage.from('profile').getPublicUrl(`${id}/profile`);
      //   data && setImageUrl(data.publicUrl);
      // }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setFile({ url, file });
    }
  };

  const deleteProfile = async (imageUrl: string) => {
    const { data, error } = await supabase.storage
      .from('profile')
      .remove([`${imageUrl.slice(imageUrl.indexOf(`${userId}/profile`))}`]);
    // console.log(data);
    if (!error) setImageUrl('');
    // dispatch(create({ message: '프로필 이미지가 삭제되었습니다.' }));
  };

  const editProfile = async () => {
    if (file.url !== '') {
      imageUrl !== '' && deleteProfile(imageUrl);
      const { data, error } = await supabase.storage
        .from('profile')
        .upload(`${userId}/profile${new Date().getTime()}`, file.file);
      // console.log(data?.path?.split('/')[1]);
      if (data) {
        URL.revokeObjectURL(file.url);
        const { data: profileImage } = supabase.storage
          .from('profile')
          .getPublicUrl(`${userId}/${data.path.split('/')[1]}`);
        if (profileImage) {
          setImageUrl(profileImage.publicUrl);
          setFile({ url: '', file: new Blob() });
          dispatch(create({ message: '프로필 이미지 등록 완료' }));
        }
      }
    }
  };

  const deleteUser = async (id: string) => {
    const { data, error } = await supabase.auth.updateUser({ data: { status: false } });
    if (!error) {
      const { error: dbError } = await supabase.from('bookreport').delete().eq('user', `${auth?.user.email}`);
      const { data, error: storageError } = await supabase.storage.from('profile').remove([`${id}/profile`]);
      const { error } = await supabase.auth.signOut();
      !error && router.replace('/');
    }
  };

  useEffect(() => {
    if (auth) setUserId(auth.user.id);
  }, [auth]);

  useEffect(() => {
    userId !== '' && getProfile(userId);
  }, [userId]);

  // if (!auth) return <NotFound />;
  return (
    <main>
      <section className="container xl mx-auto px-4 mt-8 mb-12 min-h-50vh">
        <div className="flex flex-col items-center mt-8 mb-4">
          <div className="w-32 h-32 bg-violet-200 rounded-full drop-shadow-sm relative">
            {imageUrl !== '' && (
              <Image src={imageUrl} alt="profile" fill={true} sizes="100%" className="rounded-full" />
            )}
            {file.url !== '' && (
              <Image src={file.url} alt="profile" fill={true} sizes="100%" className="rounded-full" />
            )}
            {imageUrl !== '' && (
              <button
                className="absolute top-0 right-0"
                onClick={() => {
                  if (file.url !== '') {
                    setFile({ url: '', file: new Blob() });
                    return;
                  } else {
                    if (imageUrl !== '') deleteProfile(imageUrl);
                  }
                }}>
                ✕
              </button>
            )}
          </div>
          <label className="inline-block mt-4 text-xs text-zinc-500 px-4 py-1 rounded bg-violet-50">
            + 프로필 이미지
            <input
              type="file"
              accept="image/*"
              className="absoulte w-0 h-0 p-0 overflow-hidden hidden"
              onChange={handleFile}
            />
          </label>
          {file.url !== '' && (
            <button
              className="text-sm text-zinc-600 px-4 py-1 rounded bg-violet-100 mt-2"
              onClick={() => editProfile()}>
              프로필 등록
            </button>
          )}
        </div>
        <div className="flex flex-col items-center mt-8 mb-4">
          {!isEdit ? (
            <button className="text-sm text-zinc-500 px-4 py-1 rounded bg-violet-100" onClick={() => setIsEdit(true)}>
              회원정보 수정
            </button>
          ) : (
            <div className="border p-4 rounded w-96">
              <form className="flex flex-col items-center my-2" onSubmit={handleSubmit(updateUser)}>
                {/* <input type="password" className="border p-2 rounded my-1 text-sm w-3/4" placeholder="현재 비밀번호" /> */}
                <input
                  type="password"
                  className="border p-2 rounded my-1 text-sm w-3/4"
                  placeholder="새로운 비밀번호 (영문 대소문자, 숫자 6자리 이상 12자리 이하)"
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
                <button className="text-sm px-4 py-1 rounded bg-violet-100 mt-1">비밀번호 변경</button>
              </form>
              <div className="flex items-center justify-center mt-4">
                <button
                  className="text-xs text-zinc-600 px-4 py-1 rounded bg-violet-100"
                  onClick={() => {
                    if (confirm('정말 탈퇴하시겠습니까?')) deleteUser(userId);
                  }}>
                  회원탈퇴
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
