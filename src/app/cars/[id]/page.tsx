"use client"
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { usePathname } from 'next/navigation'

export default function Page() {
    const params = useParams();
    const pathname = usePathname()

    return (
        <>
            <div className='relative w-full h-[990px] top-[-180px]'>
                <Image fill priority quality={100} src="/Detail/image6.png" alt="Image"/>
            </div>
            <h1>My Page </h1>
            <p>Current pathname: {pathname}</p>
            {params.id}
        </>
    )



}