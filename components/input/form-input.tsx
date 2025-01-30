'use client';

interface FormInputProps {
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
  icon: React.ReactElement;
  errors?: string[];
}

function FormInput({
  name,
  type,
  required,
  placeholder,
  icon,
  errors,
}: FormInputProps) {
  return (
    <>
      <div className='relative flex flex-col justify-center'>
        <div className='absolute ml-4'>{icon}</div>
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className='w-full border-stone-200 border-2 px-10 py-2 rounded-3xl'
        />
      </div>
      {errors?.map((error, index) => (
        <span key={index} className='text-red-500 font-medium'>
          {error}
        </span>
      ))}
    </>
  );
}

export default FormInput;
