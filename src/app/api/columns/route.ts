import { NextResponse } from 'next/server';
import { prisma } from '@/core/prisma';
import { createColumnDto } from '@/app/api/columns/dto';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const boardId = searchParams.get('boardId');

  if (!boardId) {
    return NextResponse.json(
      [
        {
          code: 'missing_query_param',
          field: 'boardId',
          message: 'Query param boardId is required',
        },
      ],
      { status: 400 }
    );
  }

  const columns = await prisma.columns.findMany({
    where: {
      boardId,
    },
    orderBy: {
      order: 'asc',
    },
  });

  return NextResponse.json(columns);
}

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validatedBody = createColumnDto.safeParse(bodyRaw);

  if (!validatedBody.success) {
    return NextResponse.json(
      { issues: validatedBody.error.issues },
      { status: 400 }
    );
  }

  const lastColumn = await prisma.columns.findFirst({
    where: {
      boardId: validatedBody.data.boardId,
    },
    orderBy: {
      order: 'desc',
    },
  });

  const newColumn = await prisma.columns.create({
    data: {
      order: lastColumn ? lastColumn.order + 1 : 0,
      ...validatedBody.data,
    },
  });

  return NextResponse.json(newColumn, { status: 200 });
}
