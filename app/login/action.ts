'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export async function logIn(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      password: true,
      username: true,
    },
  });

  if (!user) {
    return {
      fieldErrors: {
        email: ['존재하지 않는 이메일입니다'],
      },
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      fieldErrors: {
        password: ['비밀번호가 일치하지 않습니다'],
      },
    };
  }

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect('/');
}
