import { ChangeEvent, useEffect, useState } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';
import API_BASE_URL from '@/app/config';

interface GalleryImagesProps {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function GalleryImages({ car, formData, handleChange }: GalleryImagesProps): JSX.Element {
    const [previewImages, setPreviewImages] = useState<Record<string, string | null>>({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
    });
    const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({
        "1": false,
        "2": false,
        "3": false,
        "4": false,
    });
    const [uploadStatus, setUploadStatus] = useState<Record<string, 'uploading' | 'success' | 'deleted' | 'error' | null>>({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
    });
    const [uploadError, setUploadError] = useState<Record<string, string | null>>({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
    });

    const handleImageError = (imageKey: string) => {
        setImageLoadError(prev => ({ ...prev, [imageKey]: true }));

        const imageUrl = formData.gallery?.[imageKey as keyof typeof formData.gallery] || '';
        const updatedImageCars = { ...formData.gallery };
        delete updatedImageCars[imageKey as keyof typeof updatedImageCars];
        handleChange({
            target: {
                name: 'gallery',
                value: updatedImageCars,
            },
        } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
    };


    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>, imageKey: string) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadStatus(prev => ({ ...prev, [imageKey]: 'uploading' }));
        setUploadError(prev => ({ ...prev, [imageKey]: null }));

        try {
            const uploadData = new FormData();
            uploadData.append('photo', file);

            const response = await fetch(`${API_BASE_URL}/photos/upload`, {
                method: 'POST',
                body: uploadData,
            });

            if (response.ok) {
                const { fileName } = await response.json();
                const updatedImageCars = { ...formData.gallery, [imageKey]: fileName };
                handleChange({
                    target: {
                        name: 'gallery',
                        value: updatedImageCars,
                    },
                } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                setUploadStatus(prev => ({ ...prev, [imageKey]: 'success' }));
                setPreviewImages(prev => ({ ...prev, [imageKey]: URL.createObjectURL(file) }));
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
            setUploadError(prev => ({ ...prev, [imageKey]: `Error uploading image: ${error}` }));
        }
    };

    const handleImageDelete = async (imageKey: string) => {
        const imageUrl = formData.gallery?.[imageKey as keyof typeof formData.gallery];
        if (!imageUrl) return;

        try {
            setUploadStatus(prev => ({ ...prev, [imageKey]: 'uploading' }));
            setUploadError(prev => ({ ...prev, [imageKey]: null }));

            const response = await fetch(`${API_BASE_URL}/photos/${encodeURIComponent(imageUrl)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedImageCars = { ...formData.gallery };
                delete updatedImageCars[imageKey as keyof typeof updatedImageCars];
                handleChange({
                    target: {
                        name: 'gallery',
                        value: updatedImageCars,
                    },
                } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                setUploadStatus(prev => ({ ...prev, [imageKey]: 'deleted' }));
                setPreviewImages(prev => ({ ...prev, [imageKey]: null }));
            } else {
                throw new Error('Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
            setUploadError(prev => ({ ...prev, [imageKey]: 'Failed to delete image' }));
        }
    };


    useEffect(() => {
        const fetchPreviewImages = async () => {
            const imageKeys = Object.keys(formData.gallery);
            const previewImagesData: Record<string, string | null> = {};
            for (const imageKey of imageKeys) {
                const imageUrl = formData.gallery[imageKey as keyof typeof formData.gallery];
                try {
                    if (imageUrl) {
                        const response = await fetch(`${API_BASE_URL}/photos/${encodeURIComponent(imageUrl)}`);
                        if (response.ok) {
                            previewImagesData[imageKey] = URL.createObjectURL(await response.blob());
                        } else {
                            previewImagesData[imageKey] = null;
                        }
                    } else {
                        previewImagesData[imageKey] = null;
                    }
                } catch (error) {
                    console.error(`Error fetching image ${imageKey}:`, error);
                    previewImagesData[imageKey] = null;
                }
            }
            setPreviewImages(previewImagesData);
        };

        fetchPreviewImages();
    }, [formData.gallery, uploadStatus]); // added uploadStatus as a dependency


    const renderImage = (imageKey: string) => {
        const imageUrl = formData.gallery?.[imageKey as keyof typeof formData.gallery];
        const previewUrl = previewImages[imageKey];

        if (previewUrl) {
            return (
                <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                    <Image
                        src={previewUrl}
                        alt={`Image ${imageKey}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                        unoptimized={true}
                        onError={() => handleImageError(imageKey)}
                    />
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={() => handleImageDelete(imageKey)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            type="button" // Set button type to "button"
                        >
                            Delete
                        </button>
                    </div>

                </div>
            );
        } else {
            return (
                <div className="w-[150px]">
                    <div className="relative h-[100px] w-[150px] bg-gray-200 rounded flex flex-col items-center justify-center">
                        <input
                            id={`image-upload-${imageKey}`}
                            type="file"
                            accept="image/png, image/jpeg"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(event) => handleImageUpload(event, imageKey)}
                        />
                        <label htmlFor={`image-upload-${imageKey}`} className="cursor-pointer">
                            Choose Image
                        </label>
                        <p className="text-xs mt-2 text-center">Image {imageKey}</p>
                    </div>

                </div>
            );
        }
    };

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Cover Images</h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {Array.from(Array(4).keys()).map(index => {
                    const imageKey = (index + 1).toString();
                    return (
                        <div key={imageKey} className="relative ">
                            <div className="flex flex-col items-center">
                                {renderImage(imageKey)}
                                {imageLoadError[imageKey] && <p className="text-xs mt-2 text-center text-red-500">Image was not loaded correctly. Please upload a new one.</p>}
                                {uploadStatus[imageKey] && (
                                    <p className="mt-2 text-xs text-center">
                                        {uploadStatus[imageKey] === 'uploading' && <span className="text-blue-400">Uploading...</span>}
                                        {uploadStatus[imageKey] === 'success' && <span className="text-green-400">Uploaded successfully</span>}
                                        {uploadStatus[imageKey] === 'deleted' && <span className="text-green-400">Deleted successfully</span>}
                                        {uploadStatus[imageKey] === 'error' && <span className="text-red-500">Error: {uploadError[imageKey]}</span>}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
