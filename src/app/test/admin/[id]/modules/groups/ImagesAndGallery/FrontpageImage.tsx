import { useState, ChangeEvent, useEffect } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

interface FrontPageImageProps {
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    car: Car;
}

export default function FrontPageImage({ formData, handleChange, car }: FrontPageImageProps): JSX.Element {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<'uploading' | 'success' | 'deleted' | 'error' | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [imageLoadError, setImageLoadError] = useState<boolean>(false);

    const handleImageError = () => {
        setImageLoadError(true);
    };

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
                uploadData.append('file', renamedFile);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadData,
                });

                if (response.ok) {
                    setUploadStatus('success');
                    const uploadedImage = await response.json();
                    handleChange({
                        target: {
                            name: 'image',
                            value: '/uploads/' + renamedFile.name,
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

    const handleImageDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent form submission
        setUploadStatus('uploading');

        try {
            const imageUrl = formData.image || car.image || '';
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
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
                setUploadStatus('error');
                setUploadError('No Image was found. Please upload an image.');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            setUploadStatus('error');
            setUploadError('No Image was found. Please upload an image.');
        }
    };


    useEffect(() => {
        const handleBeforeUnload = async () => {
            if (uploadStatus === 'success') {
                // Delete the uploaded image when the user refreshes the page
                const imageUrl = formData.image || car.image || '';
                try {
                    const response = await fetch(`/api/upload?imageUrl=${encodeURIComponent(imageUrl)}`, {
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
    }, [uploadStatus, formData.image, car.image]);

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Front Page Image</h3>
            <div className="mt-4">
                {previewImage && uploadStatus !== 'deleted' ? (
                    <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                        <Image
                            src={previewImage}
                            alt="Selected Image"
                            fill
                            className="w-full h-full object-cover rounded"
                            unoptimized={true}   // Add this line
                        />
                        <button
                            onClick={handleImageDelete}
                            className="mt-2 bg-red-500 hover:bg-red-700 transition duration-500 text-white px-2 py-1 rounded absolute bottom-2 right-2"
                        >
                            Delete
                        </button>
                    </div>
                ) : formData.image || car.image ? (
                    imageLoadError ? (
                        <>
                            <div className="relative h-[100px] w-[150px] bg-gray-200 rounded flex items-center justify-center mt-4">
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
                            <div className="relative aspect-w-1 runded flex items-center justify-center">
                                <span>No Image was found. Please upload an image.</span>
                            </div>
                        </>
                    ) : (
                        <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                            <Image
                                src={formData.image || car.image}
                                onError={handleImageError}
                                fill
                                alt="Existing Image"
                                className="w-full h-full object-cover rounded"
                                unoptimized={true}   // Add this line
                            />
                            <button
                                onClick={handleImageDelete}
                                className="mt-2 bg-red-500 hover:bg-red-700 transition duration-500 text-white px-2 py-1 rounded absolute bottom-2 right-2"
                            >
                                Delete
                            </button>
                        </div>
                    )
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
                {uploadStatus && (
                    <p className="mt-2 text-xs text-center text-red-400">
                        {uploadStatus === 'uploading' && <p className="text-xs mt-2 text-center text-blue-400">Uploading...</p>}
                        {uploadStatus === 'success' && <p className="text-xs mt-2 text-center text-green-400">Uploaded successfully</p>}
                        {uploadStatus === 'deleted' && <p className="text-xs mt-2 text-center text-green-400">Deleted successfully</p>}
                        {uploadStatus === 'error' && <p className="text-xs mt-2 text-center text-red-500">Error: {uploadError}</p>}
                    </p>
                )}
            </div>
        </div>
    );
}
