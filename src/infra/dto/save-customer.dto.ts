import * as z from 'zod';

export const saveCustomerDto = z.object({
  name: z.string(),
  document: z.number(),
});
