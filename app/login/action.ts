'use server';

type FormResponse = {
  errors?: string[];
  success?: {
    message: string;
  };
};

export default async function handleSubmit(
  prevState: FormResponse | null,
  formData: FormData,
): Promise<FormResponse> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const password = formData.get('password');
  if (password === '12345') {
    return {
      errors: ['wrong password'],
    };
  } else {
    return {
      success: {
        message: '로그인에 성공했습니다!',
      },
    };
  }
}
