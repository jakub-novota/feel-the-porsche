"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    name: string;
    email: string;
    message: string;
}

function SendMailForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const response = await fetch('/api/mailersender', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log(result);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" onChange={handleInputChange} />
            </label>
            <label>
                Email:
                <input type="text" name="email" onChange={handleInputChange} />
            </label>
            <label>
                Message:
                <input type="text" name="message" onChange={handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default SendMailForm;
