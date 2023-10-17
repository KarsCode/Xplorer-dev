// components/Tweet.js
import React from 'react';

interface TweetProps {
    username: string;
    content: string;
    imageUrl: string;
  }

  const Tweet: React.FC<TweetProps> = ({ username, content, imageUrl }) => {
  return (
    <div className="tweet">
      <div className="user-info">
        <img src={`profile.jpg`} alt={`${username}'s Profile`} />
        <div className="user-details">
          <strong>{username}</strong>
          <span>@{username}</span>
        </div>
      </div>
      <p>{content}</p>
      <img src={imageUrl} alt="Tweet Image" />
    </div> 
  );
};

export default Tweet;
