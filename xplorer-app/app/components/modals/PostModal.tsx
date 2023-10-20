'use client';

import React, { useMemo, useState } from 'react'
import Modal from '../Modal'
import usePostModal from '@/app/hooks/usePostModal'
import Heading from '../Heading'
import { categories } from '@/app/constants/Categories'
import TagInput from '../TagInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../CountrySelect'
import dynamic from 'next/dynamic'
import Map from '../widgets/postmap/MapWithMarker'
import DescriptionInput from '../DescriptionInput'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ImageUpload from '../ImageUpload'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { User } from '@prisma/client'
enum STEPS{
    TAG =  0,
    LOCATION = 1, 
    INFO = 2, 
    IMAGES = 3,


}
interface PostModalProps{
  currentUser: User
}

const PostModal:React.FC<PostModalProps> = ({currentUser}) => {
    const postModal = usePostModal();
    const router = useRouter();
    const { 
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: {
          errors,
        },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          tag: '',
          latitude: null,
          longitude:null,
          eventImage: '',
          title: '',
          description: '',
          date:'',
        }
      });

    
      const tag = watch('tag')
      const location = watch('location')
      const setCustomValue = (id: string, value: any) =>{
        setValue(id,value,{
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
      }

      const Map = useMemo(() => dynamic(() => import('../widgets/postmap/MapWithMarker'), { 
        ssr: false 
      }), [location]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [eventImage, setEventImage] = useState('');
    const [step,setStep] = useState(STEPS.TAG)
    const [isLoading, setIsLoading] = useState(false);
    const handleImageChange = (imageData: string) => {
      setEventImage(imageData);
      setValue('eventImage', imageData); // Update the form field value
    };
    


    const onBack = () =>{
        setStep((value)=>value-1)
    }

    const onNext = () =>{
        setStep((value)=>value+1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
        if(step != STEPS.IMAGES )
        {return onNext();}
        
        else{
            
            setIsLoading(true)
            axios.post('/api/post', data)
            .then(() => {
            toast.success('Post created!');
            router.refresh()
            reset();
            setStep(STEPS.TAG)
            
            })
            .catch(() => {
            toast.error('Something went wrong.');
            })
            .finally(() => {
            setIsLoading(false);
            postModal.onClose();
            })
                }
            }

    const actionLabel = useMemo (() => {
            if(step === STEPS.IMAGES )
            {
                return 'Post'
            }
            else
            {
                return 'Next'
            }
    },[step])

    const secondaryActionLabel =useMemo(()=>{
        if(step === STEPS.TAG)
        {
            return undefined
        }
        else
        {
            return 'Back'
        }
        
    },[step])

    let bodyContent = (
        <div className="flex flex-col gap-8 text-white">
          <Heading
            title="Which of these best describes your event?"
            subtitle="Pick a category"
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1 text-white  ">
                <TagInput   
                  onClick={(tag)=>setCustomValue('tag',tag)}
                  selected={tag === item.label}
                  label={item.label}
                  icon={item.icon}
                />
                
              </div>
            ))}
          </div>
        </div>
      )


      if(step === STEPS.LOCATION){
        const passValueToParent = (latlng: number[]) => {
          setValue('latitude', latlng[0]);
          setValue('longitude', latlng[1]);
        };
        bodyContent =(
            <div className="flex flex-col gap-8 text-white">
            <Heading
              title="Where is your event happening?"
              subtitle="Help guests Xplore!"
            />
            <CountrySelect
              value = {location}
              onChange={(value)=>setCustomValue('location',value)} 
            />
            <Map center={location?.latlng} passValueToParent={passValueToParent}/>
          </div>
        )
      }


      if(step === STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                 title = "Describe the Event"
                 subtitle = "Short and Sweet works best :)"
                />
                <DescriptionInput
                id="title"
                label="Title"
                disabled = {isLoading}
                register={register}
                errors={errors}
                required
                />

                <br/>

                <DescriptionInput
                id="description"
                label="Description"
                disabled = {isLoading}
                register={register}
                errors={errors}
                required
                />

                <br />

                <div className='flex flex-col gap-4'>
                    <label className='text-white'>Date and Time</label>
                    <DatePicker className='rounded-xl px-20 py-4 '
                        selected={selectedDate}
                        //@ts-ignore
                        onChange={(date) => {
                            //@ts-ignore
                            setSelectedDate(date);
                            setValue('date', date?.toString());
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        disabled={isLoading}
                        placeholderText='Select Date & Time'
                    />
                </div>

                

            </div>
        )


      }


      if (step === STEPS.IMAGES) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Add a photo of the event"
              subtitle="Show Xplorers what the event looks like!"
            />
            <div>
              <ImageUpload value={eventImage} disabled={isLoading} onChange={handleImageChange} label="Upload event image" />
            </div>
          </div>
        );
      }


  return (
    <Modal
        isOpen={postModal.isOpen}
        onClose={postModal.onClose} 
        onSubmit={handleSubmit(onSubmit)}
        title='Xplore Away'
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction = {step === STEPS.TAG ?undefined : onBack}
        body = {bodyContent}

    />
  )
}

export default PostModal
