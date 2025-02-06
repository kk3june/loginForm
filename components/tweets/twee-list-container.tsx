'use client';

import Pagination from '@/components/pagination';
import TweetList, { Tweet } from '@/components/tweets/tweet-list';

interface TweetListContainerProps {
  tweets: Tweet[];
  currentPage: number;
  totalPages: number;
}

export default function TweetListContainer({
  tweets,
  currentPage,
  totalPages,
}: TweetListContainerProps) {
  return (
    <>
      <TweetList tweets={tweets} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
