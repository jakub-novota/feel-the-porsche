"use client"
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import List from './dashboard/modules/carlist';
import Link from 'next/link';

export default function LoginForm() {
    const { data: session } = useSession();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleToggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="flex h-screen">
            <div className={`w-[10vw] p-4 flex flex-col ${isNavOpen ? '' : 'hidden'}`}>
                <div className='space-x-[20px] flex justify-center'>
                    <Link
                        href={"/"}
                        className="w-1/3 border rounded-[8px] flex justify-center items-center py-[10px] px-[10px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" /></svg>
                    </Link>
                    <button
                        className="w-1/3 border rounded-[8px] flex justify-center items-center py-[10px] px-[10px]"
                        onClick={() => signOut()}
                    >
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z" /></svg>
                    </button>
                </div>
                <div className='w-full text-center mt-[10px]'>
                    <p className='text-red-400'>{session?.user?.email}</p>
                </div>
                <ul className="space-y-2 mt-[20px]">
                    <li>
                        <Link href="/admin/newuser" className="text-blue-500 hover:text-blue-600">
                            Create a New User
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile" className="text-blue-500 hover:text-blue-600">
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full p-4 bg-gray-100">
                <button
                    className="w-10 h-10 rounded-full bg-blue-500 text-white flex justify-center items-center focus:outline-none"
                    onClick={handleToggleNav}
                >
                    {isNavOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-14v-2h14v2zm2-8v6h-2v-6h2zm0 12v6h-2v-6h2zm2-10v14h-2v-14h2zm-22 0h14v2h-14v-2zm0 4h14v2h-14v-2zm0 4h14v2h-14v-2zm0 4h14v2h-14v-2z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 6h14v2h-14v-2zm0 4h14v2h-14v-2zm0 4h14v2h-14v-2zm0 4h14v2h-14v-2z" /></svg>
                    )}
                </button>
                <List />
            </div>
        </div>
    );
}
