import {create } from 'zustand';

interface RestModalStore{
    isOpen:boolean;
    onOpen:()=> void;
    onClose:()=> void;
}


const useRestModal = create<RestModalStore>((set)=>({
    isOpen : false   ,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}));



export default useRestModal;