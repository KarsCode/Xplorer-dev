import React from 'react';
import MapComponent from '@/components/Map';
import LeftSide from '@/components/LeftSide';
import HomePage from '@/pages';

const YourPage: React.FC = () => {
  const locationToHighlight = { lat: -25.344, lng: 131.031 }; // Replace with your desired coordinates

  return (
    <div> 
      <HomePage/>
      
    </div>
  );
};

export default YourPage;
