// pages/index.js
import React from 'react';
import LeftSide from '@/components/LeftSide';
import TestText from '@/components/TestText';
import TestBox from '@/components/TestBox';

const HomePage = () => {
  return (
    <div className='container'>
        <div className="left-component">
      <LeftSide />
      </div>
      <div className="middle-component">
      <TestBox/>
      <TestBox/>
      <TestBox/>
      <TestBox/>
      </div>
      <div className="right-component">
      <TestText/>
      </div>
      </div>
  );
};

export default HomePage;