import { z } from 'zod';

export const createAnswerSchema = z.object({
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
  response: z.string().refine((value) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }, { message: 'Response must be a valid JSON string' }),
  statusCode: z.number().int().min(100).max(599)
});

export const updateAnswerSchema = createAnswerSchema.partial();

export type CreateAnswerInput = z.infer<typeof createAnswerSchema>;
export type UpdateAnswerInput = z.infer<typeof updateAnswerSchema>;