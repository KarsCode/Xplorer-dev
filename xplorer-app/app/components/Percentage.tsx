import React from 'react';

interface PercentageComponentProps {
  percentage: number;
  sentences: string[];
}

const PercentageComponent: React.FC<PercentageComponentProps> = ({ percentage, sentences }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl text-white text-center font-bold mb-4">{percentage}%</div>
      <div className="text-lg text-left text-white">
        {sentences.map((sentence, index) => (
          <p key={index} className="mb-2">
            {sentence}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PercentageComponent;
