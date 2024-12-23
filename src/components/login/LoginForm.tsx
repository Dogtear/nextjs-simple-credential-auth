'use client';

import React, { useActionState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { login } from '@/server/auth-action';
import { useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form
      action={loginAction}
      className="flex flex-col gap-5 mt-36  p-5 border-2 border-blue-300 border-solid"
    >
      <div className=" flex flex-col justify-center align-middle">
        <label>email</label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          variant="primary"
          className="bg-blue-200 border-black p-2"
        />
      </div>

      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}

      <div className=" flex flex-col justify-center align-middle">
        <label>password</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          variant="primary"
          className="bg-blue-200 border-black p-2"
        />
      </div>

      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant="primary" type="submit">
      Login
    </Button>
  );
}
