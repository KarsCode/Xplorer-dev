
import React from 'react';

interface ButtonProps {
  title: string;
  icon: string; // Provide the path to your icon image
}

const Button: React.FC<ButtonProps> = ({ title, icon }) => {
  return (
    <div className="button">
      <img src={icon} alt={title} />
      <span>{title}</span>
      
    </div>
  );
};

export default Button;


/*import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;*/