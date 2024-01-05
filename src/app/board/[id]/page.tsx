import { ColumnsList } from '@/components';
import { api } from '@/core/api';
import { prisma } from '@/core/prisma';
import { Boards } from '@prisma/client';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 0;

// export const metadata: Metadata = {
//   title: '| Trello clone',
//   description: 'Trello clone created with Next.js and Supabase',
// };

interface PageParams {
  id: string;
}

interface BoardPageProps {
  params: PageParams;
}

export async function generateMetadata({
  params,
}: BoardPageProps): Promise<Metadata> {
  const id = params.id;
  const { data: metadata } = await api.get<Boards>(
    `/api/boards/${id}/metadata`
  );

  return {
    title: `${metadata.title} | Trello clone`,
  };
}

export default async function BoardPage(props: BoardPageProps) {
  const board = await prisma.boards.findUnique({
    where: {
      id: props.params.id,
    },
    include: {
      columns: {
        orderBy: {
          order: 'asc',
        },
        include: {
          cards: true,
        },
      },
    },
  });

  if (!board) {
    return notFound();
  }

  return (
    <>
      <ColumnsList board={board} />
    </>
  );
}
