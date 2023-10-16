'use client';
import axios from 'axios';
import { useCallback,useState } from 'react';
import{
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from '../Modal';
import Input from '../Input';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import getCurrentUser from '@/app/actions/getCurrentUser';
import postUserLocation from '@/app/actions/postuserLocation';





const LoginModal = () => {

    const router = useRouter();
    const loginModal = useLoginModal();
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
            password:'',
        }
    });

    const onSubmit: SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        
        signIn('credentials',{
            ...data,
            redirect:false,

        })
        .then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged In');
                router.refresh();
                loginModal.onClose();
                postUserLocation(data.email);

            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }
    const onToggle = useCallback(() => {
      loginModal.onClose();
      registerModal.onOpen();
    }, [loginModal, registerModal])

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
          <p>First Time?
            <span 
              onClick={onToggle} 
              className="
                text-white 
                cursor-pointer 
                hover:underline
              "
              > Sign Up!</span>
          </p>
        </div>
      )
    return ( 
        <Modal  
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title='Login'
        actionLabel='Continue'
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)} 
        body={bodyContent}
        footer={footerContent}

        />
     );
}
 
export default LoginModal;