'use client';
import { useFormStatus } from 'react-dom';

interface Props {
  label: string;
}

function FormButton({ label }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      className='w-full py-2 bg-gray-200 font-bold rounded-3xl hover:bg-gray-300 transition-colors'
      disabled={pending}>
      {pending ? '로딩 중' : label}
    </button>
  );
}

export default FormButton;
