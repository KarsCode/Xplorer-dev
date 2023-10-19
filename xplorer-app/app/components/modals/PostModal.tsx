"use client"

import React, { useMemo, useState } from 'react'
import Modal from '../Modal'
import usePostModal from '@/app/hooks/usePostModal'
import Heading from '../Heading'
import { categories } from '@/app/constants/Categories'
import TagInput from '../TagInput'
import { FieldValues, useForm } from 'react-hook-form'
import CountrySelect from '../CountrySelect'
enum STEPS{
    TAG =  0,
    LOCATION = 1, 
    INFO = 2, 
    IMAGES = 3,


}


  

const PostModal = () => {
    const postModal = usePostModal();
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
          location: null,
          image: '',
          title: '',
          description: '',
        }
      });
    
      const tag = watch('tag')
      const loaction = watch('location')
      const setCustomValue = (id: string, value: any) =>{
        setValue(id,value,{
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
      }

    const [step,setStep] = useState(STEPS.TAG)

    const onBack = () =>{
        setStep((value)=>value-1)
    }

    const onNext = () =>{
        setStep((value)=>value+1)
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
        <div className="flex flex-col gap-8">
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
        bodyContent =(
            <div className="flex flex-col gap-8 text-white">
            <Heading
              title="Where is your event happening?"
              subtitle="Help guests Xplore!"
            />
            <CountrySelect
              
              onChange={()=>{}} 
            />
            
            {/* <Map center={location?.latlng} /> */}
          </div>
        )
      }


  return (
    <Modal
        isOpen={postModal.isOpen}
        onClose={postModal.onClose}
        onSubmit={onNext}
        title='Xplore Away'
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction = {step === STEPS.TAG ?undefined : onBack}
        body = {bodyContent}
    />
  )
}

export default PostModal
