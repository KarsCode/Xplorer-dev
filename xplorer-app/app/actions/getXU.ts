'use client';
import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const getXU = (userId: string, friendId: string) => {
    const url = `/api/XU?userId=${userId}&friendId=${friendId}`;
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  
    return {
      data,
      error,
      isLoading,
      mutate
    };
  };
  
  export default getXU;
