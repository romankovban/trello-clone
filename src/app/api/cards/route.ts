import { NextResponse } from 'next/server';
import { prisma } from '@/core/prisma';
import { createCardDto } from './dto';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const columnId = searchParams.get('columnId');

  if (!columnId) {
    return NextResponse.json(
      [
        {
          code: 'missing_query_param',
          field: 'columnId',
          message: 'Query param columnId is required',
        },
      ],
      { status: 400 }
    );
  }

  const columns = await prisma.columns.findUnique({
    where: {
      id: columnId,
    },
  });

  if (!columns) {
    return NextResponse.json(
      [
        {
          code: 'not_found',
          message: 'Column not found',
        },
      ],
      { status: 400 }
    );
  }

  const cards = await prisma.cards.findMany({
    where: {
      columnId,
    },
    orderBy: {
      order: 'asc',
    },
  });

  return NextResponse.json(cards);
}

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validatedBody = createCardDto.safeParse(bodyRaw);

  if (!validatedBody.success) {
    return NextResponse.json(
      { issues: validatedBody.error.issues },
      { status: 400 }
    );
  }

  const lastCard = await prisma.cards.findFirst({
    where: {
      columnId: validatedBody.data.columnId,
    },
    orderBy: {
      order: 'desc',
    },
  });

  const newCard = await prisma.cards.create({
    data: {
      ...validatedBody.data,
      order: lastCard ? lastCard.order + 1 : 0,
    },
  });

  return NextResponse.json(newCard);
}
