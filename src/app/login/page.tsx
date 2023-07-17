"use client"
import React, { useState } from 'react';
import crypto from 'crypto';

export default function CreateUserForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [secret, setSecret] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email,
                firstName,
                lastName,
                secret
            })
        });

        const data = await response.json();
        console.log(data);
    };

    const generateSecret = () => {
        const newSecret = crypto.randomBytes(64).toString('hex');
        setSecret(newSecret);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
            </label>
            <label className="block">
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
            </label>
            <label className="block">
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
            </label>
            <label className="block">
                First Name:
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
            </label>
            <label className="block">
                Last Name:
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
            </label>
            <label className="block">
                Secret:
                <div className="flex items-center mt-1">
                    <input type="text" readOnly value={secret} className="block w-full rounded-md shadow-sm" />
                    <button type="button" onClick={generateSecret} className="ml-2 px-4 py-2 rounded-md bg-green-500 text-white">Generate</button>
                </div>
            </label>
            <input type="submit" value="Submit" className="w-full px-4 py-2 rounded-md bg-blue-500 text-white" />
        </form>
    );
}
