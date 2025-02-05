'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className='w-full h-full bg-black flex flex-col'>
      <div className='flex gap-10 w-3/4 min-w-fit h-full mx-auto'>
        <div className='flex flex-col gap-5 items-center justify-center h-full w-1/2 text-white'>
          <span className='font-semibold text-5xl'>Welcome to</span>
          <span className='font-extrabold text-9xl'>X</span>
        </div>
        <div className='flex flex-col gap-3 items-start justify-center w-1/2 text-white'>
          <span className='font-extrabold text-lg'>지금 가입하세요.</span>
          <Link
            href='/create-account'
            className='w-full p-3 bg-sky-500 rounded-3xl font-extrabold text-center'>
            계정 만들기
          </Link>
          <span className='font-extrabold text-lg'>
            이미 계정이 있으신가요?
          </span>
          <Link
            href='/login'
            className='w-full p-3 text-sky-500 rounded-3xl border-2 font-extrabold text-center'>
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
}
