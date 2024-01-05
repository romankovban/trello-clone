'use client';

import { CreateColumn, Column } from '.';
import { useBoardQuery } from '@/hooks';
import type { BoardPayload } from '@/hooks';

interface ColumnsListProps {
  board: BoardPayload;
}

export function ColumnsList({ board }: ColumnsListProps) {
  const { data } = useBoardQuery({ initialData: board });

  return (
    <div className="flex flex-1 gap-12 overflow-x-auto w-full h-context px-12 pb-5">
      {data.columns.map((column) => (
        <Column key={`column-${column.id}`} column={column} />
      ))}
      <CreateColumn boardId={board.id} />
    </div>
  );
}
