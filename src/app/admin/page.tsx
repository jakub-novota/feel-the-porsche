"use client"
import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import List from "./dashboard/modules/carlist";
export default function LoginForm() {
    return (
        <>
            <List />
        </>
    );
}
