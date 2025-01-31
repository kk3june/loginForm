'use server';
import { z } from 'zod';

type FormResponse = {
  fieldErrors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  success?: boolean;
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .regex(/@zod\.com$/, 'Only @zod.com emails are allowed'),
  username: z.string().min(5),
  password: z
    .string()
    .min(10, 'Password must be at least 10 characters')
    .regex(/.*\d.*/, 'Password must contain at least one number'),
});

export default async function handleSubmit(
  prevState: FormResponse | null,
  formData: FormData,
): Promise<FormResponse> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      fieldErrors: result.error.formErrors.fieldErrors,
    };
  }

  return { success: true };
}
