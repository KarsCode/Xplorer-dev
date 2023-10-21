'use client';
import { AiOutlineClose } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";

interface RModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  secondaryActionLabel?: string
  disabled?: boolean;
  secondaryAction?: () => void;
}

const RModal: React.FC<RModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  footer, 
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);


  if (!isOpen) {
    return null;
  }

  return (
    <>
    <div
      className="
        justify-center 
        items-center 
        flex 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-600
        bg-opacity-20
      "
    >
      <div className="relative  min-w-md  lg:w-2/6 my-6 mx-auto max-w-md h-fit">
        {/* {/content/} */}
        <div className="
          h-full
          lg:h-auto
          border-0 
          rounded-lg 
          shadow-lg 
          relative 
          flex 
          flex-col 
          w-full 
          bg-black 
          outline-none 
          focus:outline-none
          "
        >
          {/* {/header/} */}
          <div className="
            flex 
            items-center 
            justify-between 
            p-10 
            rounded-t
            "
          >
            <h3 className="text-3xl font-semibold text-white">
              {/* {title} */}
            </h3>
            <button
              className="
                p-1 
                ml-auto
                border-0 
                text-white
                hover:opacity-70
                transition
              "
              onClick={handleClose}
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          {/* {/body/} */}
          <div className="relative p-10 flex-auto">
            {body}
          </div>
          {/* {/footer/} */}
          {/* <div className="flex flex-col gap-2 p-10">
          {secondaryAction && secondaryActionLabel && (
                    <Button 
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                      outline
                    />  
                  )}
            //<Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
            
            {footer}
          </div> */}
          <div className="flex flex-col gap-2 p-6">
                <div 
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                    text-white
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button 
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                      secondary fullWidth large
                      outline
                    />  
                  )}
                  <Button 
                    disabled={disabled} 
                    label={actionLabel} 
                    onClick={handleSubmit}
                    secondary fullWidth large
                  />
                </div>
                {footer}
              </div>
          
        </div>
        
      </div>
    </div>
  </>
);
}

export default RModal;