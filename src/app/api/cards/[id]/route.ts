import { NextResponse } from 'next/server';
import { prisma } from '@/core/prisma';
import { updateCardDto } from '../dto';

interface CardRouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(req: Request, { params }: CardRouteContext) {
  const { id } = params;
  const bodyRaw = await req.json();
  const validatedBody = updateCardDto.safeParse(bodyRaw);

  if (!validatedBody.success) {
    return NextResponse.json(
      { issues: validatedBody.error.issues },
      { status: 400 }
    );
  }

  const findCard = await prisma.cards.findUnique({
    where: {
      id,
    },
  });

  if (!findCard) {
    return NextResponse.json([
      { code: 'not_found', message: 'Card not found' },
    ]);
  }

  const updatedCard = await prisma.cards.update({
    where: {
      id,
    },
    data: validatedBody.data,
  });

  return NextResponse.json(updatedCard);
}

export async function DELETE(req: Request, { params }: CardRouteContext) {
  const { id } = params;

  const findCard = await prisma.cards.findUnique({
    where: {
      id,
    },
  });

  if (!findCard) {
    return NextResponse.json([
      { code: 'not_found', message: 'Card not found' },
    ]);
  }

  await prisma.cards.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
