"use client";
import React from 'react';

const EmailButton = () => {
  const handleSendEmail = async () => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send Email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <h1>Send an email:</h1>
      <button onClick={handleSendEmail}>Here We Go</button>
    </div>
  );
};

export default EmailButton;
