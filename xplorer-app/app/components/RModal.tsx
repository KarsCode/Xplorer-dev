import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const RModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled }) => {
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
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
  }, [onSubmit, disabled]);

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
          bg-neutral-800
          bg-opacity-70
        "
      >
        <div className="relative w-full lg:w-2/6 h-full pt-3 pb-3 max-w-md">
          {/*content*/}
          <div
            className="
              h-fit
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
            {/*header*/}
            <div
              className="
                flex 
                items-center 
                justify-between 
                p-10
                rounded-t
              "
            >
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                className="
                  p-0 
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
            {/*body*/}
            <div className="relative p-10 rounded-full flex-auto">{body}</div>
            {/*footer*/}
            <div className="pl-6 pb-5">
            <Button label={actionLabel} onClick={()=>{}}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RModal;
