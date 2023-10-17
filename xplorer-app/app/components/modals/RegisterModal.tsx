'use client';
import axios from 'axios';
import { useCallback,useState } from 'react';
import{
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from '../Modal';
import Input from '../Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import sendEmail from '@/app/actions/sendEmail';


const RegisterModal = () => {
    const loginModal= useLoginModal();
    const registerModal = useRegisterModal();
    const[isLoading , setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            name:'',
            username:'',
            password:'',
        }
    });

    const onToggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    }, [loginModal, registerModal])

    const onSubmit: SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);

        axios.post('/api/register',data)
            .then(()=>{
                data
                sendEmail(data.email,"Welcome to the Xplorer Family ","Hope you enjoy your stay here");
                registerModal.onClose()
            })
            .catch((error)=>{
                toast.error("Something Went Wrong");
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
          <Input
           id='email'
           label='Email'
           type='email'
           disabled={isLoading}
           register={register}
           errors={errors}
           required
          />
          <Input
           id='name'
           label='Name'
           disabled={isLoading}
           register={register}
           errors={errors}
           required
          />
          <Input
           id='username'
           label='Username'
           disabled={isLoading}
           register={register}
           errors={errors}
           required
          />
          <Input
           id='password'
           type='password'
           label='Password'
           disabled={isLoading}
           register={register}
           errors={errors}
           required
          />
          
        </div>
      )

      const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
          <p>Already have an account?
            <span 
              onClick={onToggle} 
              className="
                text-white 
                cursor-pointer 
                hover:underline
              "
              > Sign in</span>
          </p>
        </div>
      )
    return ( 
        <Modal  
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Create an account'
        actionLabel='Register'
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)} 
        body={bodyContent}
        footer={footerContent}

        />
     );
}
 
export default RegisterModal;