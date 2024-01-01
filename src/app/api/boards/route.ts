import { NextResponse } from 'next/server';
import { prisma } from '@/core/prisma';
import { createBoardDto } from '@/app/api/boards/dto';

export async function GET(req: Request) {
  const boards = await prisma.boards.findMany();

  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validatedBody = createBoardDto.safeParse(bodyRaw);

  if (!validatedBody.success) {
    return NextResponse.json(
      { issues: validatedBody.error.issues },
      { status: 400 }
    );
  }

  const newBoard = await prisma.boards.create({
    data: {
      ...validatedBody.data,
    },
  });

  return NextResponse.json({ board: newBoard });
}
