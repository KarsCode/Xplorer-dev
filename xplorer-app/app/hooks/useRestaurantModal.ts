import {create } from 'zustand';

interface RestaurantModalStore{
    isOpen:boolean;
    onOpen:()=> void;
    onClose:()=> void;
}


const useRestaurantModal = create<RestaurantModalStore>((set)=>({
    isOpen : false   ,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}));



export default useRestaurantModal;