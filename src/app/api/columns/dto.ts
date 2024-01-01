import { z } from 'zod';

export const createColumnDto = z.object({
  title: z.string().min(1).max(32),
  boardId: z.string().uuid(),
  width: z.number().min(50).default(50),
});

export const updateColumnDto = createColumnDto
  .omit({ boardId: true })
  .partial();
