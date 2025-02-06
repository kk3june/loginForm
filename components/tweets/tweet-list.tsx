'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface Tweet {
  id: number;
  tweet: string;
  userId: number;
  created_at: Date;
  updated_at: Date | null;
  user: {
    username: string;
  };
  likes: {
    id: number;
    userId: number;
  }[];
}

export default function TweetList({ tweets }: { tweets: Tweet[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='space-y-4'>Loading...</div>;
  }

  return (
    <div className='space-y-4'>
      {tweets.map((tweet) => (
        <Link
          key={tweet.id}
          href={`/tweets/${tweet.id}`}
          className='block p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors'>
          <div className='flex justify-between items-start'>
            <span className='font-bold text-white'>{tweet.user.username}</span>
            <span className='text-sm text-gray-400'>
              {new Date(tweet.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className='mt-2 text-white'>{tweet.tweet}</p>
          <div className='mt-2 text-sm text-gray-400'>
            좋아요 {tweet.likes.length}개
          </div>
        </Link>
      ))}
    </div>
  );
}
