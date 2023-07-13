import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';

interface CoverImageProps {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function CoverImage({ car, formData, handleChange }: CoverImageProps): JSX.Element {
    const [selectedImages, setSelectedImages] = useState<Record<string, File | null>>({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
    });
    const [previewImages, setPreviewImages] = useState<Record<string, string | null>>({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
    });
    const [uploadStatus, setUploadStatus] = useState<Record<string, string | null>>({
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
    const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({
        "1": false,
        "2": false,
        "3": false,
        "4": false,
    });
    const [cacheBuster, setCacheBuster] = useState<string | null>(null);


    const handleImageError = (imageKey: string) => {
        setImageLoadError(prev => ({ ...prev, [imageKey]: true }));
    };


    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>, imageKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            // Updating the uploadStatus state to 'uploading' when the image upload starts.
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
                    // Updating the uploadStatus state to 'success' when the image upload is successful.
                    setUploadStatus(prev => ({ ...prev, [imageKey]: 'success' }));

                    const uploadedImage = await response.json();
                    const updatedImageCars = { ...formData.image_cars, [imageKey]: '/uploads/' + renamedFile.name };
                    handleChange({
                        target: {
                            name: 'image_cars',
                            value: updatedImageCars,
                        },
                    } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                    setCacheBuster(uuidv4());
                } else {
                    // Updating the uploadStatus state to 'error' and uploadError state when the image upload fails.
                    setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
                    setUploadError(prev => ({ ...prev, [imageKey]: 'Failed to upload image.' }));
                }
            } catch (error) {
                // Updating the uploadStatus state to 'error' and uploadError state when there's an error during the image upload.
                setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
                setUploadError(prev => ({ ...prev, [imageKey]: `Error uploading image: ${error}` }));
            }
        }

    };

    const handleImageDelete = async (event: React.MouseEvent<HTMLButtonElement>, imageKey: string) => {
        event.preventDefault();
        // Clear selected image
        setSelectedImages(prevSelectedImages => ({
            ...prevSelectedImages,
            [imageKey]: null,
        }));

        // Clear preview image
        setPreviewImages(prevPreviewImages => ({
            ...prevPreviewImages,
            [imageKey]: null,
        }));

        // Set upload status to 'uploading'
        setUploadStatus(prevUploadStatus => ({
            ...prevUploadStatus,
            [imageKey]: 'uploading',
        }));

        // Clear upload error
        setUploadError(prevUploadError => ({
            ...prevUploadError,
            [imageKey]: null,
        }));

        // Clear image load error
        setImageLoadError(prevImageLoadError => ({
            ...prevImageLoadError,
            [imageKey]: false,
        }));

        const imageUrl = formData.image_cars?.[imageKey as keyof typeof formData.image_cars] || '';

        try {
            const response = await fetch('/api/upload', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });

            if (response.ok) {
                // Clear the image URL in formData
                const updatedImageCars = { ...formData.image_cars };
                delete updatedImageCars[imageKey as keyof typeof updatedImageCars];
                handleChange({
                    target: {
                        name: 'image_cars',
                        value: updatedImageCars,
                    },
                } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);

                // Set upload status to 'deleted'
                setUploadStatus(prevUploadStatus => ({
                    ...prevUploadStatus,
                    [imageKey]: 'deleted',
                }));

                // Reset error state for this image
                setImageLoadError(prev => ({ ...prev, [imageKey]: false }));

                // Add cache buster
                setCacheBuster(uuidv4());
            } else {
                throw new Error('Failed to delete image');
            }
        } catch (error) {
            // Set upload status to 'error'
            setUploadStatus(prevUploadStatus => ({
                ...prevUploadStatus,
                [imageKey]: 'error',
            }));

            // Set upload error
            setUploadError(prevUploadError => ({
                ...prevUploadError,
                [imageKey]: 'Failed to delete image. Please try again.',
            }));
        }
    };






    const renderImage = (imageKey: string) => {
        const imageUrl = formData.image_cars?.[imageKey as keyof typeof formData.image_cars];
        const imageExists = imageUrl !== undefined && imageUrl !== '';
        const previewUrl = previewImages[imageKey];

        if (imageLoadError[imageKey] && previewUrl) {
            return (
                <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                    <Image
                        src={`${imageUrl}?v=${cacheBuster}`}  // Add cache-busting query here
                        alt={`Image ${imageKey}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                        unoptimized={true}   // Add this line
                        onError={() => handleImageError(imageKey)}
                    />
                    <button
                        onClick={(event) => handleImageDelete(event, imageKey)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            );
        }

        if (imageExists && !imageLoadError[imageKey]) {
            return (
                <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                    <Image
                        src={`${imageUrl}?v=${cacheBuster}`}  // Add cache-busting query here
                        alt={`Image ${imageKey}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                        unoptimized={true}   // Add this line
                        onError={() => {
                            handleImageError(imageKey);
                            setCacheBuster(uuidv4()); // Add this line
                        }}
                    />
                    <button
                        onClick={(event) => handleImageDelete(event, imageKey)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            );
        } else {
            return (
                <>
                    <div className='  w-[150px]'>
                        <div className="relative  h-[100px] w-[150px] bg-gray-200 rounded flex flex-col items-center justify-center">
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
                        <div>
                            {imageLoadError[imageKey] && <p className="text-xs mt-2 text-center text-red-500">Image was not loaded correctly. Please upload a new one.</p>}
                        </div>
                    </div>
                </>
            );
        }
    };



    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Cover Images</h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {Array.from(Array(4).keys()).map((index) => {
                    const imageKey = (index + 1).toString();
                    return (
                        <div key={imageKey} className="relative ">
                            <div className='flex flex-col items-center'>
                                {renderImage(imageKey)}
                                {uploadStatus[imageKey] === 'uploading' && <p className="text-xs mt-2 text-center text-blue-400">Uploading...</p>}
                                {uploadStatus[imageKey] === 'success' && <p className="text-xs mt-2 text-center text-green-400">Uploaded successfully</p>}
                                {uploadStatus[imageKey] === 'deleted' && <p className="text-xs mt-2 text-center text-green-400">Deleted successfully</p>}
                                {uploadStatus[imageKey] === 'error' && <p className="text-xs mt-2 text-center text-red-500">Error: {uploadError[imageKey]}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
