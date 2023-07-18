"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";

const App: React.FC = () => {
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/data");
            const data = await response.json();
            setPostData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (postId: string) => {
        try {
            const response = await fetch(`/api/data?id=${postId}`, { method: "DELETE" });
            fetchPosts(); // Refresh the post data after deletion
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleEdit = (postId: string) => {
        console.log("Edit post with ID:", postId);
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-4">
                <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'/admin'}>
                    <div className="w-[40px] h-[40px] border rounded-[5px] mr-[10px] flex justify-center items-center">
                        <p className="text-gray-400">←</p>
                    </div>
                </Link>
                <div className="flex flex-col">
                    <Link className="text-[#00b300] hover:text-[#008000] text-[14px] cursor-pointer" href={'/admin'}>
                        Back To Admin
                    </Link>
                    <h1 className="text-3xl font-bold ">Data</h1>
                </div>
            </div>
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
                <div className="flex items-center justify-between bg-indigo-500 px-6 py-4 rounded-t-lg">
                    <h1 className="text-xl font-semibold text-white">Data</h1>
                    <button
                        className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
                        onClick={fetchPosts}
                    >
                        Refresh
                    </button>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {postData.map((post: any) => (
                            <tr key={post._id} className="border-b">
                                <td className="py-2 px-4">{post.name}</td>
                                <td className="py-2 px-4">{post._id}</td>
                                <td className="py-2 px-4">
                                    <Link
                                        href={`/admin/data/${post._id}`}
                                    >
                                        <button className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 mr-2">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                                        onClick={() => handleDelete(post._id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end px-6 py-4">
                    <Link href={"/admin/data/new"} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                        New
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default App;
