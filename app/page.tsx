import TweetListContainer from '@/components/tweets/twee-list-container';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function TweetsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const session = await getSession();
  if (!session.id) {
    redirect('/login');
  }

  const currentPage = Number(searchParams.page) || 1;
  const tweetsPerPage = 10;

  const tweets = await db.tweet.findMany({
    skip: (currentPage - 1) * tweetsPerPage,
    take: tweetsPerPage,
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
        },
      },
    },
  });

  const totalTweets = await db.tweet.count();
  const totalPages = Math.ceil(totalTweets / tweetsPerPage);

  return (
    <main className='max-w-2xl mx-auto mt-8 px-4'>
      <TweetListContainer
        tweets={tweets}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
