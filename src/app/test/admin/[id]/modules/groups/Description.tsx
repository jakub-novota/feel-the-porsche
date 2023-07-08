import { useState } from 'react';
import { ChangeEvent } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Link from 'next/link';

interface Description {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function Description({ car, formData, handleChange }: Description): JSX.Element {
    const [showExamples, setShowExamples] = useState(false);

    const handleToggle = () => {
        setShowExamples(!showExamples);
    };

    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <div className="border border-gray-300 rounded-lg p-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="text-[#313131]">
                            Car Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full mt-2"
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
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full min-h-[200px] mt-2"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="toggleExamples"
                            checked={showExamples}
                            onChange={handleToggle}
                            className="mr-2"
                        />
                        <label htmlFor="toggleExamples" className="text-[#313131]">
                            Show Examples
                        </label>
                    </div>

                    {showExamples && (
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="mb-2">&lt;p&gt;:</p>
                                <p className="mb-2">&lt;strong&gt; or &lt;b&gt;:</p>
                                <p className="mb-2">&lt;em&gt; or &lt;i&gt;:</p>
                                <p className="mb-2">&lt;u&gt;:</p>
                                <p className="mb-2">&lt;Link href=""&gt;:</p>
                                <p className="mb-2">&lt;br&gt;:</p>
                            </div>

                            <div>
                                <p className="mb-2">Defines a paragraph.</p>
                                <p className="mb-2">Defines bold text.</p>
                                <p className="mb-2">Defines italicized text.</p>
                                <p className="mb-2">Defines underlined text.</p>
                                <p className="mb-2">Defines a hyperlink.</p>
                                <p className="mb-2">Inserts a line break.</p>
                            </div>

                            <div>
                                <div className="mb-2">
                                    <p>This is a paragraph.</p>
                                </div>
                                <div className="mb-2">
                                    <strong>This is bold text.</strong>
                                </div>
                                <div className="mb-2">
                                    <em>This is italicized text.</em>
                                </div>
                                <div className="mb-2">
                                    <u>This is underlined text.</u>
                                </div>
                                <div className="mb-2">
                                    <Link href="">This is a link</Link>
                                </div>
                                <div className="mb-2">
                                    <p>
                                        This is the first line.
                                        <br />
                                        This is the second line.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
