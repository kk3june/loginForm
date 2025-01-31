'use client';

import handleSubmit from '@/app/login/action';
import FormButton from '@/components/buttons/form-button';
import Email from '@/components/icons/Email';
import Key from '@/components/icons/Key';
import User from '@/components/icons/User';
import FormInput from '@/components/input/form-input';
import { useActionState, useEffect, useState } from 'react';

function Page() {
  const [state, action] = useActionState(handleSubmit, null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!state?.fieldErrors) {
      setIsSuccess(true);
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <form className='flex flex-col gap-3 w-3/5 mx-auto mt-32' action={action}>
      <FormInput
        name='email'
        type='email'
        required={true}
        placeholder='Email'
        errors={state?.fieldErrors?.email}
        icon={<Email size={'1.2rem'} />}
      />
      <FormInput
        name='username'
        type='string'
        required={true}
        placeholder='User'
        errors={state?.fieldErrors?.username}
        icon={<User size={'1.2rem'} />}
      />
      <FormInput
        name='password'
        type='string'
        required={true}
        placeholder='Password'
        errors={state?.fieldErrors?.password}
        icon={<Key size={'1.2rem'} />}
      />
      <FormButton label='Login' />
      {isSuccess && (
        <span className='w-full px-5 py-2 bg-green-600 rounded-2xl font-semibold'>
          Welcome back
        </span>
      )}
    </form>
  );
}

export default Page;
