'use client';
import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const getFriends = (userId: String) => {
  const { data, error, isLoading, mutate } = useSWR(userId ? `/api/friendUsers/${userId}` : null, fetcher);
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default getFriends;