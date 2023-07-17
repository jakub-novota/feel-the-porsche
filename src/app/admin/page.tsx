"use client"
import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import List from './dashboard/modules/carlist';
import Link from 'next/link';

export default function LoginForm() {
    const { data: session } = useSession();


    return (
        <div className="flex h-screen">
            <div className="w-[10vw]  p-4 flex flex-col">
                <div className=' space-x-[20px] flex justify-center'>
                    <Link
                        href={"/"}
                        className="w-1/3 border rounded-[8px] flex justify-center items-center  py-[10px] px-[10px]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" /></svg>
                    </Link>
                    <button
                        className="w-1/3 border rounded-[8px] flex justify-center items-center  py-[10px] px-[10px]"
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
                <List />
            </div>
        </div>
    );
}
