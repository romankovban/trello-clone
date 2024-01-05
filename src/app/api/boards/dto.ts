import { z } from 'zod';

export const createBoardDto = z.object({
  title: z.string().min(1).max(32),
});

export type CreateBoardDto = z.infer<typeof createBoardDto>;

export const updateBoardDto = createBoardDto.partial();

export type UpdateBoardDto = z.infer<typeof updateBoardDto>;
