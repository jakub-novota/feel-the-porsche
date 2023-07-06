"use client"
import { useState } from 'react';
import { ImageGallery } from './Images';

export default function ImageUploadForm() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(filesArray);
            setErrorMessage('');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedFiles.length === 0) {
            setErrorMessage('No files selected.');
            return;
        }

        try {
            const formData = new FormData();
            const invalidFiles: string[] = [];

            selectedFiles.forEach((file) => {
                // Check if the file is an image and not an SVG
                if (file.type.startsWith('image/') && !file.type.includes('svg')) {
                    formData.append('file', file);
                    setUploadingFiles((prevFiles) => [...prevFiles, file.name]);
                } else {
                    invalidFiles.push(file.name);
                }
            });

            if (invalidFiles.length > 0) {
                const errorMessage = `Invalid file format: ${invalidFiles.join(', ')}. Only image files (excluding SVG) are allowed.`;
                setErrorMessage(errorMessage);
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (event) => {
                const progress = Math.round((event.loaded / event.total) * 100);
                setUploadProgress(progress);
            });

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        console.log('Files uploaded successfully.');
                        setUploadStatus('Upload successful');
                    } else {
                        console.error('Error uploading files:', xhr.responseText);
                        setUploadStatus('Upload failed');
                    }
                    setUploadingFiles([]);
                }
            };

            xhr.open('POST', '/api/upload');
            xhr.send(formData);
        } catch (error) {
            console.error('Error uploading files:', error);
            setUploadStatus('Upload failed');
            setUploadingFiles([]);
        }
    };

    return (
        <div>
            <h1>Image Upload Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" multiple onChange={handleFileChange} accept="image/*" />
                <button type="submit">Upload</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {uploadProgress > 0 && <progress value={uploadProgress} max={100} />}
            {uploadStatus && <p>{uploadStatus}</p>}
            {uploadingFiles.length > 0 && (
                <ul>
                    {uploadingFiles.map((fileName, index) => (
                        <li key={index}>
                            {fileName} - {uploadStatus ? 'Uploaded' : 'Error'}
                        </li>
                    ))}
                </ul>
            )}
            <ImageGallery />
        </div>
    );
}
