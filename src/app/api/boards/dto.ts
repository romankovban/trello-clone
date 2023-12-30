import { z } from 'zod';

export const createBoardDto = z.object({
  title: z.string().min(1).max(32),
});

export const updateBoardDto = createBoardDto.partial();
