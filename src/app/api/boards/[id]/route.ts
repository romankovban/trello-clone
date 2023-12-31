import { NextResponse } from 'next/server';
import { prisma } from '@/core/prisma';
import { updateBoardDto } from '../dto';

export interface BoardRouteContext {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: BoardRouteContext) {
  const { id } = params;

  const board = await prisma.boards.findUnique({
    where: {
      id,
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
    return NextResponse.json([
      { code: 'not_found', message: 'Board not found' },
    ]);
  }

  return NextResponse.json(board);
}

export async function PATCH(req: Request, { params }: BoardRouteContext) {
  const { id } = params;
  const bodyRaw = await req.json();
  const validatedBody = updateBoardDto.safeParse(bodyRaw);

  if (!validatedBody.success) {
    return NextResponse.json(
      { issues: validatedBody.error.issues },
      { status: 400 }
    );
  }

  const findBoard = await prisma.boards.findUnique({
    where: {
      id,
    },
  });

  if (!findBoard) {
    return NextResponse.json([
      { code: 'not_found', message: 'Board not found' },
    ]);
  }

  const updatedBoard = await prisma.boards.update({
    where: {
      id,
    },
    data: {
      ...validatedBody.data,
    },
  });

  return NextResponse.json(updatedBoard);
}

export async function DELETE(req: Request, { params }: BoardRouteContext) {
  const { id } = params;

  const findBoard = await prisma.boards.findUnique({
    where: {
      id,
    },
  });

  if (!findBoard) {
    return NextResponse.json([
      { code: 'not_found', message: 'Board not found' },
      { status: 400 },
    ]);
  }

  await prisma.boards.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
