import { ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Link from 'next/link';

interface Description {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function Description({ car, formData, handleChange }: Description): JSX.Element {
    return (
        <>
            <div>
                <h2 className="text-[24px]  mb-[10px]">Description</h2>
                <div className="border border-gray-300 rounded-[10px] p-[20px]">
                    <div className="mb-4">
                        <label htmlFor="cylinder_capacity" className="text-[#313131]  ">
                            Car Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-[10px] px-3 py-2 w-full mt-[10px]"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="text-[#313131] font-medium">
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full min-h-[200px] mt-[10px]"
                        />
                    </div>
                    <div className='flex justify-center'>
                        <div className=" p-4 text-[14px] grid grid-cols-3 ">

                            <div className='flex justify-center'>
                                <div className='flex flex-col items-end  '>
                                    <div className='mb-2 '>
                                        <p>&lt;p&gt;:</p>
                                    </div>
                                    <div className='mb-2'>
                                        <p>&lt;strong&gt; or &lt;b&gt;:</p>
                                    </div>
                                    <div className='mb-2'>
                                        <p>&lt;em&gt; or &lt;i&gt;:</p>
                                    </div>
                                    <div className='mb-2'>
                                        <p>&lt;u&gt;:</p>
                                    </div>
                                    <div className='mb-2'>
                                        <p>&lt;Link href=""&gt;:</p>
                                    </div>
                                    <div className='mb-2'>
                                        <p>&lt;br&gt;:</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 ">
                                    Defines a paragraph.
                                </p>
                                <p className="mb-2 ">
                                    Defines bold text.
                                </p>
                                <p className="mb-2 ">
                                    Defines italicized text.
                                </p>
                                <p className="mb-2">
                                    Defines underlined text.
                                </p>
                                <p className="mb-2 ">
                                    Defines a hyperlink.
                                </p>
                                <p className="mb-2 ">
                                    Inserts a line break.
                                </p>
                            </div>


                            <div>
                                <div className='text-start mb-2'>
                                    <p className="ml-2 ">This is a paragraph.</p>
                                </div>
                                <div className=' mb-2'>
                                    <strong className="ml-2">This is bold text.</strong>
                                </div>
                                <div className='mb-2'>
                                    <em className="ml-2 ">This is italicized text.</em>
                                </div>
                                <div className='mb-2'>
                                    <u className="ml-2 ">This is underlined text.</u>
                                </div>
                                <div className='mb-2'>
                                    <Link href="" className="ml-2">This is a link</Link>
                                </div>
                                <div className='mb-2'>
                                    <p className="ml-2">This is the first line.<br />This is the second line.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
