import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const getResturants = (userId?: string) => {
  const url = userId ? `/api/resturants?userId=${userId}` : '/api/restaurants';
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default getResturants;