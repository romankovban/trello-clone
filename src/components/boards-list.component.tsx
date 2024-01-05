'use client';

import { Boards } from '@prisma/client';
import { BoardCard, CreateBoard } from '.';
import { useBoardsQuery } from '@/hooks';

interface BoardsListProps {
  initialData: Boards[];
}

export function BoardsList({ initialData }: BoardsListProps) {
  const { data: boards } = useBoardsQuery({ initialData });

  return (
    <div className="grid grid-cols-1 px-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {boards.map((board) => (
        <BoardCard key={board.id} id={board.id} title={board.title} />
      ))}
      <CreateBoard />
    </div>
  );
}
