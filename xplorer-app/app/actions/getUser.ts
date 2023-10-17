'use client';
import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const getUser = (userId: String) => {
  const { data, error, isLoading, mutate } = useSWR(userId ? `/user/${userId}` : null, fetcher);
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default getUser;