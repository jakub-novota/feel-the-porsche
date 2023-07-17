"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
interface UserFormData {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export default function CreateUser() {
    const [formData, setFormData] = useState<UserFormData>({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // Handle the success response
            } else {
                throw new Error('Request failed');
            }
        } catch (error) {
            console.error(error);
            // Handle the error response
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">

            <div className="flex items-center mb-4">
                <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'/admin'}>
                    <div className="w-[40px] h-[40px] border rounded-[5px] mr-[10px] flex justify-center items-center">
                        <p className="text-gray-400">←</p>
                    </div>
                </Link>
                <div className="flex flex-col">
                    <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'/admin'}>
                        Back To Admin
                    </Link>
                    <h1 className="text-3xl font-bold ">Edit Car</h1>
                </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Create User</h1>
            <div className='flex flex-col justify-center items-center'>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="firstName">
                            First Name:
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="lastName">
                            Last Name:
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        type="submit"
                    >
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
}
