import * as z from 'zod';

export const updateCustomerDto = z.object({
  id: z.string(),
  name: z.string(),
  document: z.number(),
});
