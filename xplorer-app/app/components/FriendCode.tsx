"use client"
import React, { useState } from 'react';
import Button from './Button';

interface StringInputProps {
  onSubmit: (string: string) => void;
}

const StringInput: React.FC<StringInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  return (
    <div className="eigth p-4 rounded-lg shadow-md flex flex-col gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Friend Code"
        className="w-full p-2 rounded border-one focus:outline-none focus:border-indigo-200 bg-black text-white"
      />
      <Button
        onClick={()=>onSubmit(inputValue)}
        label="Enter"
        secondary
      />
    </div>
  );
};

export default StringInput;