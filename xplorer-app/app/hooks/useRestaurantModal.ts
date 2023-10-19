import {create } from 'zustand';

interface RestaurantModalStore{
    isOpen:boolean;
    onOpen:()=> void;
    onClose:()=> void;
}


const useRestaurantModal = create<RestaurantModalStore>((set)=>({
    isOpen : true   ,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}));



export default useRestaurantModal;