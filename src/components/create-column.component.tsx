'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input } from '.';
import { useCreateColumnMutation } from '@/hooks';

const createColumnSchema = z.object({
  title: z.string().min(1).max(32),
});

type CreateColumnValues = z.infer<typeof createColumnSchema>;

interface CreateColumnProps {
  boardId: string;
}

export function CreateColumn({ boardId }: CreateColumnProps) {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateColumnValues>({
    resolver: zodResolver(createColumnSchema),
  });

  const { mutateAsync } = useCreateColumnMutation({ boardId });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({
      ...data,
      boardId,
    });
    setIsFormOpened(false);
  });

  const openForm = () => setIsFormOpened(true);

  return (
    <div
      className="block h-fit min-w-[12.5rem] w-[12.5rem] p-4 rounded-lg shadow cursor-pointer bg-gray-800 border-gray-700 hover:bg-gray-700"
      onClick={openForm}
    >
      {isFormOpened ? (
        <form onSubmit={onSubmit} className="relative">
          <Input
            {...register('title')}
            placeholder="Enter your column title"
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
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          + Create a new column
        </h5>
      )}
    </div>
  );
}
