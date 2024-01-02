'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '@/components';
import { useCreateBoard } from '@/hooks/use-create-board';

const createBoardSchema = z.object({
  title: z.string().min(1).max(32),
});

type CreateBoardValues = z.infer<typeof createBoardSchema>;

export function CreateBoard() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateBoardValues>({
    resolver: zodResolver(createBoardSchema),
  });

  const { mutateAsync } = useCreateBoard();

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
    setIsFormOpened(false);
  });

  const openForm = () => setIsFormOpened(true);

  return (
    <div
      className="block max-full p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      onClick={openForm}
    >
      {isFormOpened ? (
        <form onSubmit={onSubmit} className="relative">
          <Input
            {...register('title')}
            placeholder="Enter your board title"
            error={errors.title?.message}
            disabled={isSubmitting}
            className="pr-20"
          />
          <Button
            size="xsmall"
            className="absolute right-[5px] top-[5px]"
            type="submit"
            isLoading={isSubmitting}
          >
            Create
          </Button>
        </form>
      ) : (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          + Create a new board
        </h5>
      )}
    </div>
  );
}
