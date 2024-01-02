import { BoardCard } from '@/components';

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <BoardCard id={'dfdsfs'} title="Board" />
      </div>
    </div>
  );
}
