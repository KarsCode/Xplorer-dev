'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {label&&<p 
        className={`
        text-xl text-white font-semibold mb-2'}
        `}
      >
        {label}
      </p>}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
        w-full
        p-4 
        text-lg 
        bg-black 
        border-2
        border-neutral-800 
        rounded-md
        outline-none
        text-white
        focus:border-sky-500
        focus:border-2
        transition
        disabled:bg-neutral-900
        disabled:opacity-70
        disabled:cursor-not-allowed
        `}
      />
      
    </div>
   );
}
 
export default Input;