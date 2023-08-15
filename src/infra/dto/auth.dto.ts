import * as z from 'zod';

export const authDto = z.object({
  username: z.string(),
  password: z.string(),
});
