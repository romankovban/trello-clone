import { CreateBoardDto } from '@/app/api/boards/dto';
import { api } from '@/core/api';
import { useBoardsQueryKey } from '@/hooks';
import { Boards } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createBoardFn = async (board: CreateBoardDto) => {
  const { data } = await api.post<Boards>('/api/boards', board);

  return data;
};

export const useCreateBoardMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBoardFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: useBoardsQueryKey,
      });
    },
  });

  return mutation;
};
