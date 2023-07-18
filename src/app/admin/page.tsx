"use client"
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import List from './dashboard/modules/carlist';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginForm() {
    const { data: session } = useSession();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleToggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    const navVariants = {
        open: { x: 0 },
        closed: { x: '-100%' }
    };

    return (
        <div className="flex h-screen">
            <div className={`w-[10vw] p-4 flex flex-col duration-500  ${isNavOpen ? '' : 'hidden'}`}>
                <div className='space-x-[20px] flex justify-center '>
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
                        <Link href="/admin/profile" className="text-blue-500 hover:text-blue-600">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/data" className="text-blue-500 hover:text-blue-600">
                            Data
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full p-4 ">
                <button
                    className="w-10 h-10 rounded-full  border text-white flex justify-center items-center focus:outline-none"
                    onClick={handleToggleNav}
                >
                    {isNavOpen ? (
                        <svg clip-rule="evenodd" className='w-[25px] h-[25px]' fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>
                    ) : (
                        <svg clip-rule="evenodd" className='w-[25px] h-[25px]' fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero" /></svg>
                    )}
                </button>
                <List />
            </div>
        </div >
    );
}
