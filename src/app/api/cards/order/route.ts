import { NextResponse } from 'next/server';
import { prisma } from '@/core/prisma';
import { updateCardsOrderDto } from '../dto';

export async function PATCH(req: Request) {
  const bodyRaw = await req.json();
  const validatedBody = updateCardsOrderDto.safeParse(bodyRaw);

  if (!validatedBody.success) {
    return NextResponse.json(
      { issues: validatedBody.error.issues },
      { status: 400 }
    );
  }

  const queries = validatedBody.data.map(({ id, order }) =>
    prisma.cards.update({
      where: {
        id,
      },
      data: {
        order,
      },
    })
  );

  await prisma.$transaction(queries);

  return NextResponse.json({}, { status: 200 });
}
