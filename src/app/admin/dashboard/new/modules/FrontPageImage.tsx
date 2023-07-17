import { useState, ChangeEvent, useEffect } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import API_BASE_URL from '@/app/config';


interface FrontPageImageProps {
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function FrontPageImage({ formData, handleChange }: FrontPageImageProps): JSX.Element {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'uploading' | 'success' | 'error' | 'deleted' | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadStatus('uploading');
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            try {
                const renamedFile = new File([file], `${uuidv4()}.${file.name.split('.').pop()}`, { type: file.type });
                const uploadData = new FormData();
                uploadData.append('photo', renamedFile);

                const response = await fetch(`${API_BASE_URL}/photos/upload`, {
                    method: 'POST',
                    body: uploadData,
                });

                if (response.ok) {
                    setUploadStatus('success');
                    const uploadedImage = await response.json();
                    handleChange({
                        target: {
                            name: 'image',
                            value: uploadedImage.fileName,
                        },
                    } as unknown as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                } else {
                    setUploadStatus('error');
                    setUploadError('Failed to upload image.');
                }
            } catch (error) {
                setUploadStatus('error');
                setUploadError(`Error uploading image: ${error}`);
            }
        }
    };


    const handleImageDelete = async () => {
        setUploadStatus('uploading');
        setSelectedImage(null);
        setPreviewImage(null);
        try {
            const imageUrl = formData.image || '';
            //console.log("The URL of the image ", imageUrl)
            const response = await fetch(`${API_BASE_URL}/photos/${imageUrl}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setUploadStatus('deleted');
                handleChange({
                    target: {
                        name: 'image',
                        value: '',
                    },
                } as unknown as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
            } else {
                const errorData = await response.json();
                setUploadStatus('error');
                setUploadError(errorData.message || 'Failed to delete image.');
            }
        } catch (error) {
            setUploadStatus('error');
            setUploadError(`Error deleting image: ${error}`);
        }
    };



    useEffect(() => {
        const handleBeforeUnload = async () => {
            if (uploadStatus === 'success') {
                const imageUrl = formData.image || '';
                try {
                    const response = await fetch(`${API_BASE_URL}/photos/${imageUrl}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        console.log('Image deleted successfully');
                    } else {
                        console.error('Failed to delete image');
                    }
                } catch (error) {
                    console.error('Error deleting image:', error);
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [uploadStatus, formData.image]);

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Gallery Image</h3>
            <div className="mt-4">
                {previewImage ? (
                    <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                        <Image
                            src={previewImage}
                            alt="Selected Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded"
                        />
                    </div>
                ) : (
                    <div className="relative h-[100px] w-[150px] bg-gray-200 rounded flex items-center justify-center">
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                            Choose Image
                        </label>
                    </div>
                )}
                {previewImage && (
                    <button
                        onClick={handleImageDelete}
                        className="mt-2 bg-red-500 hover:bg-red-700 transition duration-500 text-white px-2 py-1 rounded"
                    >
                        Delete
                    </button>
                )}
                {uploadStatus && (
                    <div className="mt-2 text-xs text-center text-red-400">
                        {uploadStatus === 'uploading' && <p className="text-xs mt-2 text-blue-400">Uploading...</p>}
                        {uploadStatus === 'success' && <p className="text-xs mt-2 text-green-400">Uploaded successfully</p>}
                        {uploadStatus === 'deleted' && <p className="text-xs mt-2 text-green-400">Deleted successfully</p>}
                        {uploadStatus === 'error' && <p className="text-xs mt-2 text-red-500">Error: {uploadError}</p>}
                    </div>
                )}
            </div>
        </div>

    );
}
