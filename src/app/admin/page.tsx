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

            <div className="w-full p-4 ">
                <div className=''>
                    <ul className="flex justify-center space-x-[20px] ">
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
                <List />

            </div>
        </div >
    );
}
