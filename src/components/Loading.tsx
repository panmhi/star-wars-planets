const Loading = () => {
  return (
    <div className='flex gap-1'>
      <div className='h-2 w-2 animate-pulse rounded-full bg-blue-600'></div>
      <div className='h-2 w-2 animate-pulse rounded-full bg-blue-600'></div>
      <div className='h-2 w-2 animate-pulse rounded-full bg-blue-600'></div>
    </div>
  );
};

export default Loading;
