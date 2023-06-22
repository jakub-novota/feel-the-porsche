"use client"
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
    const params = useParams();

    return (
        <>
            <div className='relative w-full h-[990px]'>
                <Image fill priority quality={100} src="/Detail/image6.png" alt="Image"/>
            </div>
            <h1>My Page </h1>
            {params.id}
        </>
    )



}