"use client"
import React from 'react';
import CarFormContent from './CarFormContent';

const CarForm: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Car Form</h1>
      <CarFormContent />
    </div>
  );
};

export default CarForm;
