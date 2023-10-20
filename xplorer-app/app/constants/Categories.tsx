
  import {MdOutlineSportsBaseball,MdTheaterComedy,MdFestival,MdDiscount} from 'react-icons/md';
  import { IoFastFoodOutline } from 'react-icons/io5';
  import { PiLeafBold } from 'react-icons/pi';
  import { RiMusic2Fill } from 'react-icons/ri';
  import { BsTicketPerforatedFill } from 'react-icons/bs';   
  import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'; 

export const categories = [
    {
      label: 'Sports',
      icon: MdOutlineSportsBaseball,
      description: 'Game. Set. Match',
    },
    {
      label: 'Food&Drink',
      icon: IoFastFoodOutline,
      description: 'Yummy Yummy',
    },
    {
      label: 'Nature',
      icon: TbMountain,
      description: 'Touching Grass ?'
    },
    {
      label: 'Concerts',
      icon: RiMusic2Fill,
      description: 'Rock and Roll'
    },
    {
      label: 'Comedy&Theatre',
      icon: MdTheaterComedy,
      description: 'Own the Stage'
    },
    {
      label: 'Movies',
      icon: BsTicketPerforatedFill,
      description: 'Lights. Camera. Action'
    },
    {
      label: 'Festivals',
      icon: MdFestival,
      description: 'Cultural Extravaganza'
    },
    {
      label: 'Offers',
      icon: MdDiscount,
      description:'Love Saving'
    }
  ]