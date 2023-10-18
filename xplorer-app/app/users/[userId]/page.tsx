import React, { useEffect, useState } from 'react';
import UserPage from '../../components/users/UserPage';
import getCurrentUser from '@/app/actions/getCurrentUser';

const ParentComponent = async () => {


  const currentUser =( await getCurrentUser())?.currentUser;

  return (
    <UserPage currentUser={currentUser}  />
  );
};

export default ParentComponent;