'use client';

import { CreateColumn } from '@/components/create-column.component';
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
        <div
          key={column.id}
          style={{ minWidth: column.width, width: column.width }}
          className="block w-full p-4 border  rounded-lg shadow bg-gray-800 border-gray-700"
        >
          <div>
            <h5 className="text-lg font-bold tracking-tight text-white">
              {column.title}
            </h5>
          </div>
        </div>
      ))}
      <CreateColumn boardId={board.id} />
    </div>
  );
}
