import React, { useEffect, useState } from 'react';
import UserPage from '../components/users/UserPage';
import getCurrentUser from '@/app/actions/getCurrentUser';
import RestaurantsPage from '../components/restaurants/RestaurantsPage';

const ParentComponent = async () => {


  const currentUser =( await getCurrentUser())?.currentUser;

  return (
    <RestaurantsPage currentUser={currentUser}  />
  );
};

export default ParentComponent;