import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  console.log('Session:', session); // 세션 데이터 확인

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    console.log('User data:', user); // user 데이터 확인

    if (user) {
      return user;
    } else {
      notFound();
    }
  }
}
const onClickLogOut = async () => {
  'use server';
  const session = await getSession();
  await session.destroy();
  redirect('/');
};

async function Profile() {
  const user = await getUser();

  console.log(user);

  return (
    <div className='flex flex-col items-center gap-3 w-3/5 mx-auto mt-32 text-white'>
      <span>환영합니다.</span>
      <button
        className='w-full p-3 bg-sky-500 rounded-3xl font-extrabold text-center'
        onClick={onClickLogOut}>
        로그아웃
      </button>
    </div>
  );
}

export default Profile;
