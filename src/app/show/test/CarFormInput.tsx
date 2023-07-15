import React from 'react';

interface CarFormInputProps {
    label: string;
    name: string;
    value: any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CarFormInput: React.FC<CarFormInputProps> = ({ label, name, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block mb-2">
                {label}:
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="mt-1 p-2 border rounded w-full"
                />
            </label>
        </div>
    );
};

export default CarFormInput;
