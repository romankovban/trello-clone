import { NextResponse } from 'next/server';
import { prisma } from '@/core/prisma';
import { updateColumnDto } from '../dto';

interface ColumnRouteContext {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;

  const column = await prisma.columns.findUnique({
    where: {
      id,
    },
    include: {
      cards: true,
    },
  });

  if (!column) {
    return NextResponse.json([
      { code: 'not_found', message: 'Column not found' },
      { status: 400 },
    ]);
  }

  return NextResponse.json(column);
}

export async function PATCH(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;
  const bodyRaw = await req.json();
  const validatedBody = updateColumnDto.safeParse(bodyRaw);

  if (!validatedBody.success) {
    return NextResponse.json(
      { issues: validatedBody.error.issues },
      { status: 400 }
    );
  }

  const findColumn = await prisma.columns.findUnique({
    where: {
      id,
    },
  });

  if (!findColumn) {
    return NextResponse.json([
      { code: 'not_found', message: 'Column not found' },
      { status: 400 },
    ]);
  }

  const updatedColumn = await prisma.columns.update({
    where: {
      id,
    },
    data: validatedBody.data,
  });

  return NextResponse.json(updatedColumn);
}

export async function DELETE(req: Request, { params }: ColumnRouteContext) {
  const { id } = params;

  const findColumn = await prisma.columns.findUnique({
    where: {
      id,
    },
  });

  if (!findColumn) {
    return NextResponse.json([
      { code: 'not_found', message: 'Column not found' },
      { status: 400 },
    ]);
  }

  await prisma.columns.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
