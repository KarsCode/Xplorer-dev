'use client';
import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const getPosts = (userId?: string) => {
  const url = '/api/posts';
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default getPosts;