// pages/index.js
import React from 'react';
import LeftSide from '@/components/LeftSide';
import TestText from '@/components/RightSide';
import TestBox from '@/components/TestBox';
import {tweets} from '@/app/timeline'
import Tweet from '@/components/Tweet';
import RightSide from '@/components/RightSide';

const HomePage = () => {
  return (
    <div className='container'>
        <div className="left-component">
      <LeftSide />
      </div>
      <div className="middle-component">
      <div className="twitter-timeline">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          username={tweet.username}
          content={tweet.content}
          imageUrl={tweet.imageUrl}
        />
      ))}
    </div>

      </div>
  
      <div className="right-component">
      <RightSide/>
      </div>
      </div>
  );
};

export default HomePage;