'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex justify-center gap-2 mt-8'>
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className='px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700'>
          이전
        </Link>
      )}

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className='px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700'>
          다음
        </Link>
      )}
    </div>
  );
}
