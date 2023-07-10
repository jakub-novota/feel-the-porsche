"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageUploadFormProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploadForm({ handleChange }: ImageUploadFormProps): JSX.Element {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [uploadingFiles, setUploadingFiles] = useState<{ fileName: string; status: string }[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [invalidFiles, setInvalidFiles] = useState<string[]>([]);
    const [showUploadButton, setShowUploadButton] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(filesArray);
            setErrorMessage('');
            setShowUploadButton(true); // Show the upload button when files are selected
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            setErrorMessage('No files selected.');
            return;
        }

        try {
            const validFiles: File[] = [];
            const invalidFiles: string[] = [];

            selectedFiles.forEach((file) => {
                if (file.type.startsWith('image/') && !file.type.includes('svg')) {
                    validFiles.push(file);
                    setUploadingFiles((prevFiles) => [
                        ...prevFiles,
                        { fileName: file.name, status: 'Uploading' },
                    ]);
                } else {
                    invalidFiles.push(file.name);
                }
                resetForm();
            });

            if (validFiles.length === 0) {
                setErrorMessage('No valid files selected.');
                return;
            }

            const formData = new FormData();
            validFiles.forEach((file) => formData.append('file', file));

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    setUploadStatus('Upload successful');
                    setUploadedFiles((prevFiles) => [
                        ...prevFiles,
                        ...validFiles.map((file) => file.name),
                    ]);
                    setUploadingFiles((prevFiles) =>
                        prevFiles.map((file) => ({
                            ...file,
                            status: 'Uploaded',
                        }))
                    );
                    setShowUploadButton(false);
                } else {
                    setUploadStatus('Upload failed');
                }
            } catch (error) {
                console.error('Error uploading files:', error);
                setUploadStatus('Upload failed');
            }

            if (invalidFiles.length > 0) {
                setErrorMessage(
                    `Invalid file format: ${invalidFiles.join(', ')}. Only image files (excluding SVG) are allowed.`
                );
                setInvalidFiles(invalidFiles);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            setUploadStatus('Upload failed');
        }
    };

    const resetForm = () => {
        setSelectedFiles([]);
        setUploadProgress(0);
        setUploadStatus('');
        setErrorMessage('');
        setUploadingFiles([]);
        setUploadedFiles([]);
        setInvalidFiles([]);
        setShowUploadButton(false);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleUpload();
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Image Upload Form</h1>
            <div className="mb-4">
                <input
                    type="file"
                    name="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Select Files
                </label>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="relative w-[150px] h-[150px]">
                        <Image
                            src={URL.createObjectURL(file)}
                            alt={`Selected Image ${index + 1}`}
                            fill
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                            <p>{file.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            {showUploadButton && (
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpload}>
                    Upload
                </button>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {uploadProgress > 0 && (
                <div className="mt-4">
                    <div className="bg-gray-200 rounded">
                        <div className="bg-blue-500 h-2 rounded" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{uploadProgress}% Uploaded</p>
                </div>
            )}
            {uploadStatus && <p className="text-green-500">{uploadStatus}</p>}
            {uploadingFiles.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Uploading Files:</h3>
                    <ul className="list-disc ml-6">
                        {uploadingFiles.map((file, index) => (
                            <li key={index} className="text-gray-700">
                                {file.fileName} - {file.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {uploadedFiles.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Uploaded Files:</h3>
                    <ul className="list-disc ml-6">
                        {uploadedFiles.map((fileName, index) => (
                            <li key={index} className="text-gray-700">
                                {fileName} - Uploaded
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {invalidFiles.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Invalid Files:</h3>
                    <ul className="list-disc ml-6">
                        {invalidFiles.map((fileName, index) => (
                            <li key={index} className="text-red-500">
                                {fileName} - Invalid file format
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

}
