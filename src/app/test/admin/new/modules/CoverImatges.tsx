import { useState, ChangeEvent, useEffect } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

interface CoverImageProps {
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function CoverImage({ formData, handleChange }: CoverImageProps): JSX.Element {
    const [selectedImages, setSelectedImages] = useState<Record<string, File | null>>({
        '1': null,
        '2': null,
        '3': null,
        '4': null,
    });
    const [previewImages, setPreviewImages] = useState<Record<string, string | null>>({
        '1': null,
        '2': null,
        '3': null,
        '4': null,
    });
    const [uploadStatus, setUploadStatus] = useState<Record<string, 'uploading' | 'success' | 'error' | 'deleted' | null>>({
        '1': null,
        '2': null,
        '3': null,
        '4': null,
    });
    const [uploadError, setUploadError] = useState<Record<string, string | null>>({
        '1': null,
        '2': null,
        '3': null,
        '4': null,
    });

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>, imageKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadStatus(prev => ({ ...prev, [imageKey]: 'uploading' }));

            setSelectedImages(prevSelectedImages => ({
                ...prevSelectedImages,
                [imageKey]: file,
            }));

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImages(prevPreviewImages => ({
                    ...prevPreviewImages,
                    [imageKey]: e.target?.result as string,
                }));
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
                    setUploadStatus(prev => ({ ...prev, [imageKey]: 'success' }));

                    const uploadedImage = await response.json();
                    const updatedImageCars = { ...formData.image_cars, [imageKey]: '/uploads/' + renamedFile.name };
                    handleChange({
                        target: {
                            name: 'image_cars',
                            value: updatedImageCars,
                        },
                    } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                } else {
                    setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
                    setUploadError(prev => ({ ...prev, [imageKey]: 'Failed to upload image.' }));
                }
            } catch (error) {
                setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
                setUploadError(prev => ({ ...prev, [imageKey]: `Error uploading image: ${error}` }));
            }
        }
    };

    const handleImageDelete = async (event: React.MouseEvent<HTMLButtonElement>, imageKey: string, imageUrl: string) => {
        event.preventDefault();

        setUploadStatus(prev => ({ ...prev, [imageKey]: 'uploading' }));

        setSelectedImages(prev => ({ ...prev, [imageKey]: null }));
        setPreviewImages(prev => ({ ...prev, [imageKey]: null }));

        try {
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });

            if (response.ok) {
                setUploadStatus(prev => ({ ...prev, [imageKey]: 'deleted' }));

                const updatedImageCars = { ...formData.image_cars };
                updatedImageCars[imageKey as keyof typeof updatedImageCars] = '';
                handleChange({
                    target: {
                        name: 'image_cars',
                        value: updatedImageCars,
                    },
                } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
            } else {
                setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
                setUploadError(prev => ({ ...prev, [imageKey]: 'Failed to delete image.' }));
            }
        } catch (error) {
            setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
            setUploadError(prev => ({ ...prev, [imageKey]: `Error deleting image: ${error}` }));
        }
    };

    useEffect(() => {
        const handleBeforeUnload = async () => {
            const imageKeys = Object.keys(uploadStatus);
            for (const imageKey of imageKeys) {
                if (uploadStatus[imageKey] === 'success') {
                    const imageUrl = formData.image_cars[imageKey as keyof typeof formData.image_cars] || '';
                    try {
                        const response = await fetch('/api/upload', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ imageUrl }),
                        });

                        if (response.ok) {
                            console.log(`Image ${imageKey} deleted successfully`);
                        } else {
                            console.error(`Failed to delete image ${imageKey}`);
                        }
                    } catch (error) {
                        console.error(`Error deleting image ${imageKey}:`, error);
                    }
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [uploadStatus, formData]);

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Cover Images</h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {Object.keys(formData.image_cars).map(imageKey => {
                    const imageUrl = formData.image_cars[imageKey as keyof typeof formData.image_cars] || '';
                    const selectedImage = selectedImages[imageKey];
                    const previewImage = previewImages[imageKey];
                    const currentUploadStatus = uploadStatus[imageKey];
                    const currentUploadError = uploadError[imageKey];

                    return (
                        <div key={imageKey} className="flex flex-col items-center  relative">
                            <div className="relative w-full h-32">
                                {(imageUrl || previewImage) ? (
                                    <div className="relative w-full h-full">
                                        {imageUrl && !selectedImage && (
                                            <Image
                                                src={imageUrl.startsWith('/uploads/') ? imageUrl : `/uploads/${imageUrl}`}
                                                alt={`Image ${imageKey}`}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded"
                                                onError={(e) => { (e.target as any).src = '/images/fallback.png'; }}
                                            />
                                        )}
                                        {previewImage && (
                                            <Image
                                                src={previewImage}
                                                alt="Selected Image"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full bg-gray-200 rounded flex items-center justify-center">
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
                                    </div>
                                )}
                                {(imageUrl || previewImage) && (
                                    <button
                                        onClick={(event) => handleImageDelete(event, imageKey, imageUrl)}
                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 transition duration-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-center text-red-400">
                                {currentUploadStatus === 'uploading' && <p className="text-xs mt-2 text-center text-blue-400">Uploading...</p>}
                                {currentUploadStatus === 'success' && <p className="text-xs mt-2 text-center text-green-400">Uploaded successfully</p>}
                                {currentUploadStatus === 'deleted' && <p className="text-xs mt-2 text-center text-green-400">Deleted successfully</p>}
                                {currentUploadStatus === 'error' && `Error: ${currentUploadError}`}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
