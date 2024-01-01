import { updateColumnsOrderDto } from '@/app/api/columns/dto';
import { prisma } from '@/core/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const bodyRaw = await req.json();
  const validatedBody = updateColumnsOrderDto.safeParse(bodyRaw);

  if (!validatedBody.success) {
    return NextResponse.json(
      { issues: validatedBody.error.issues },
      { status: 400 }
    );
  }

  const queries = validatedBody.data.map(({ id, order }) =>
    prisma.columns.update({
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
