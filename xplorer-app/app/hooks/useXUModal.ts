import {create } from 'zustand';

interface XUModalStore{
    isOpen:boolean;
    onOpen:()=> void;
    onClose:()=> void;
}


const useXUModal = create<XUModalStore>((set)=>({
    isOpen : false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}));



export default useXUModal;