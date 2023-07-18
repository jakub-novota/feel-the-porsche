"use client"
import React, { useState, FormEvent } from "react";
import Link from "next/link";


const App: React.FC = () => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [message, setMessage] = useState("");

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, text }),
            });

            if (response.ok) {
                setMessage("Post Created");
                setName("");
                setText("");
            } else {
                setMessage("Failed to create post");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-4">
                <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'./'}>
                    <div className="w-[40px] h-[40px] border rounded-[5px] mr-[10px] flex justify-center items-center">
                        <p className="text-gray-400">←</p>
                    </div>
                </Link>
                <div className="flex flex-col">
                    <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'./'}>
                        Go Back
                    </Link>
                    <h1 className="text-3xl font-bold">New Data</h1>
                </div>
            </div>
            <div className="px-[20px] pt-[20px] pb-[20px]">
                <div className="w-full bg-white border rounded-[8px] shadow-md p-8 px-[20px]">
                    <h1 className="text-3xl text-center mb-6">Edit Post</h1>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 mb-2">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="text" className="block text-gray-700 mb-2">
                                Text:
                            </label>
                            <textarea
                                id="text"
                                className="w-full min-h-[800px] px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-indigo-500"
                                rows={6}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-[220px] py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                        >
                            Create Post
                        </button>
                    </form>
                    {message && <p className="text-center text-green-600 mt-4">{message}</p>}
                </div>
            </div>
        </div>

    );
};

export default App;
