import { api } from '@/core/api';
import { Boards } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const getBoardsQueryFn = async () => {
  const { data } = await api.get<Boards[]>('/api/boards');

  return data;
};

interface UseBoardsQueryOptions {
  initialData: Boards[];
}

export const useBoardsQueryKey = ['boards'];

export const useBoardsQuery = ({ initialData }: UseBoardsQueryOptions) => {
  const query = useQuery({
    queryKey: useBoardsQueryKey,
    queryFn: getBoardsQueryFn,
    initialData,
  });

  return query;
};
