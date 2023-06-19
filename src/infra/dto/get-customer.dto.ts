import * as z from 'zod';

export const getCustomerDto = z.object({
  id: z.string(),
});
