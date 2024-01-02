import { prisma } from '@/core/prisma';
import { BoardsList } from '@/components';

export default async function Home() {
  const boards = await prisma.boards.findMany();

  return (
    <div className="container mx-auto">
      <BoardsList initialData={boards} />
    </div>
  );
}
