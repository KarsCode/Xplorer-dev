'use client'
// pages/index.js
import React from 'react';
import LeftSide from '@/components/LeftSide';
import TestText from '@/components/RightSide';
import TestBox from '@/components/TestBox';
import {tweets} from '@/app/timeline'
import Tweet from '@/components/Tweet';
import RightSide from '@/components/RightSide';
import RightPanel from '@/components/RightPanel/RightPanel';

const HomePage = () => {
  return (
    <div className='flex max-h-screen'>
      <LeftSide />
      <div className='flex-1 max-h-screen overflow-y-auto'>
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          username={tweet.username}
          content={tweet.content}
          imageUrl={tweet.imageUrl}
        />
      ))}
      </div>
      <RightPanel />
      </div>
  );
};

export default HomePage;