'use server';

import { testUserAuth } from '@/constants/utility-contants';
import { loginSchema } from './schema/auth-schema';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  if (email !== testUserAuth.email || password !== testUserAuth.password) {
    return {
      errors: {
        email: ['Invalid credentials, email or password'],
      },
    };
  }

  await createSession(testUserAuth.id);

  redirect('/dashboard');
}

export async function logout() {}
