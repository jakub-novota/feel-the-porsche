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
            callbackUrl: "/admin"
        })
    };




    return (
        <>
            {!session?.user ? (
                <>
                    <div className="flex justify-center pt-[20vh] max-h-screen ">
                        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-[8px] px-[60px] pt-6 pb-8 mb-4">
                            <h1 className='text-center uppercase text-[25px] font-sohogothicpro font-bold italic'>Login</h1>
                            <div className='mt-[20px]'>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-sohogothicpro mb-2" htmlFor="username">
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
                                    <label className="block text-gray-700 text-sm font-sohogothicpro mb-2" htmlFor="password">
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
            ) : (
                <>
                    <div className="flex justify-center pt-[20vh] max-h-screen">
                        <div className="bg-white shadow-2xl rounded-[8px] px-[60px] pt-6 pb-8 mb-4">
                            <h1 className="text-center uppercase text-[25px] font-sohogothicpro font-bold italic">
                                Already Logged In
                            </h1>
                            <button
                                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={() => signOut()}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </>
            )}

        </>
    );
}
