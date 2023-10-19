"use client"
import React, { useState } from 'react';
import Button from './Button';

interface NumberInputProps {
  onSubmit: (number: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      onSubmit(parsedValue);
      setInputValue('');
    } else {
      alert('Please enter a valid number.');
    }
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Friend Code"
        className="w-full p-2 rounded border-one focus:outline-none focus:border-indigo-200 bg-black text-white"
      />
      <Button
        onClick={handleSubmit}
        label="Enter"
        secondary
        small

      />
    </div>
  );
};

export default NumberInput;