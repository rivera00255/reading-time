const BookPreview = () => {
  return (
    <div className="w-40 h-60 bg-slate-100 drop-shadow flex justify-center items-center relative">
      <div className="w-96.0 h-96.0 bg-slate-200"></div>
      <div className="absolute -bottom-2 bg-white px-4 rounded-2xl">
        <p className="text-center">book title</p>
      </div>
    </div>
  );
};

export default BookPreview;
