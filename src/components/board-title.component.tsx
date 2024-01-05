'use client';

import { useCachedBoardQuery } from '@/hooks';
import { useUpdateBoardMutation } from '@/hooks/use-update-board-mutation';
import { cn } from '@/utils/cn';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

interface BoardTitleProps {
  boardId: string;
}

export function BoardTitle({ boardId }: BoardTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { data } = useCachedBoardQuery({ boardId });
  const { mutate } = useUpdateBoardMutation();

  useEffect(() => {
    if (data?.title && titleRef.current) {
      titleRef.current.innerText = data.title;
    }
  }, [data?.title]);

  const turnOnEditing = () => {
    if (isEditing) {
      return;
    }
    setIsEditing(true);
  };

  const onBlur = () => {
    setIsEditing(false);
    mutate({
      boardId,
      data: {
        title: titleRef.current?.innerText || 'Untitled',
      },
    });
  };

  const titleClasses = clsx({
    'cursor-text bg-black/20 outline-none focus:outline-none': isEditing,
    'cursor-pointer': !isEditing,
  });

  return (
    <h1
      className={cn(
        'text-white text-4xl text-center font-bold mb-8 transition outline-none hover:bg-black/20',
        titleClasses
      )}
      contentEditable={isEditing}
      onClick={turnOnEditing}
      onBlur={onBlur}
      ref={titleRef}
    >
      {data?.title ?? ''}
    </h1>
  );
}
