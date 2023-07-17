"use client"
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { data: session } = useSession()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await signIn("credentials", {
            username: username,
            password: password,
            redirect: true,
            callbackUrl: "/admin/dashboard"
        })
    };


    if (session?.user) {
        redirect('/admin/dashboard')
    }


    return (
        <>
            {session?.user ? (
                <>
                    <h1>Alredy logged in</h1>
                </>
            ) : (
                <>
                    <div className="flex justify-center items-center h-screen ">
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}

        </>
    );
}
