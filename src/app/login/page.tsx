const Login = () => {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-480 border rounded px-8 py-12 drop-shadow-sm">
        <h3 className="text-center font-bold text-lg mb-8">로그인</h3>
        <div className="flex flex-col">
          <input className="border p-4 rounded mb-2 text-sm" type="text" placeholder="이메일" />
          <input className="border p-4 rounded mb-2 text-sm" type="password" placeholder="비밀번호" />
          <button className="bg-zinc-100 py-2 rounded my-2 drop-shadow-sm hover:bg-zinc-300">로그인</button>
        </div>
        <button className="text-sm text-zinc-400 hover:text-zinc-500">회원가입</button>
      </div>
    </main>
  );
};

export default Login;
