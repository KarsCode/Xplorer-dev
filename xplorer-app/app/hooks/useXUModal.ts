import {create } from 'zustand';

interface XUStore{
    isOpen:boolean;
    onOpen:()=> void;
    onClose:()=> void;
}


const useXUModal = create<XUStore>((set)=>({
    isOpen : false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}));



export default useXUModal;