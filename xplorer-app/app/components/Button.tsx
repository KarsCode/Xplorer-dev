'use client';

interface ButtonProps{
    label: string;
    secondary?: boolean;
    fullWidth? :boolean;
    large?:    boolean;
    onClick:()=>void;
    disabled?: boolean;
    outline?:boolean;
}


const Button: React.FC<ButtonProps> = ({ 
    label, 
    secondary, 
    fullWidth, 
    onClick, 
    large, 
    disabled, 
    outline 
  }) => {
    return ( 
      <button
        disabled={disabled}
        onClick={onClick}
        className={`
          disabled:opacity-70f
          disabled:cursor-not-allowed
          rounded-xl
          font-semibold
<<<<<<< HEAD
          hover:opacity-80
          hover:text-yellow-400
=======
          hover:text-yellow-500
          hover:border-8
          hover:border-yellow-500
>>>>>>> 83ef0b58a9b72ba329cff507c3b079ea76703245
          transition
          border-2
          ${fullWidth ? 'w-full' : 'w-fit'}
          ${secondary ? 'bg-white' : 'bg-yellow-500'}
          ${secondary ? 'text-black' : 'text-black'}
          ${secondary ? 'border-black' : 'border-yellow-500'}
          ${large ? 'text-xl' : 'text-md'}
          ${large ? 'px-5' : 'px-4'}
          ${large ? 'py-3' : 'py-2'}
          ${outline ? 'bg-transparent' : ''}
          ${outline ? 'border-white' : ''}
          ${outline ? 'text-black ' : ''}
        `}
      >
        {label}
      </button>
     );
  }
   
  export default Button;