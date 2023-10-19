
"use client"
import React from 'react';
import NumberInput from './FriendCode';

export default function AddFriend() {
  const handleNumberSubmit = (number: number) => {
    alert(`Submitted number: ${number}`);
  };

  return (
    <div>
      {/* Other content */}
      <NumberInput onSubmit={handleNumberSubmit} />
      {/* Other content */}
    </div>
  );
}
