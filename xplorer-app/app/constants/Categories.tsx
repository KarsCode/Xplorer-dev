import { 
    GiBarn, 
    GiBoatFishing, 
    GiCactus, 
    GiCastle, 
    GiCaveEntrance, 
    GiForestCamp, 
    GiIsland,
    GiWindmill
  } from 'react-icons/gi';
  import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'; 

export const categories = [
    {
      label: 'Sports',
      icon: TbBeach,
      description: 'Game. Set. Match',
    },
    {
      label: 'Food&Drink',
      icon: GiWindmill,
      description: 'Yummy Yummy',
    },
    {
      label: 'Nature',
      icon: TbBeach,
      description: 'Touching Grass ?'
    },
    {
      label: 'Concerts',
      icon: TbMountain,
      description: 'Rock and Roll'
    },
    {
      label: 'Comedy&Theatre',
      icon: TbPool,
      description: 'Own the Stage'
    },
    {
      label: 'Movies',
      icon: GiIsland,
      description: 'Lights. Camera. Action'
    },
    {
      label: 'Festivals',
      icon: GiBoatFishing,
      description: 'Cultural Extravaganza'
    }
  ]