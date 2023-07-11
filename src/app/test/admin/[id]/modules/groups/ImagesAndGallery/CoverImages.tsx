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
    const [showImages, setShowImages] = useState<Record<string, boolean>>({
        "1": Object.keys(car.image_cars || {}).includes("1"),
        "2": Object.keys(car.image_cars || {}).includes("2"),
        "3": Object.keys(car.image_cars || {}).includes("3"),
        "4": Object.keys(car.image_cars || {}).includes("4"),
    });
    const [uploadStatus, setUploadStatus] = useState<Record<string, string | null>>({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
    });
    const [hasChanges, setHasChanges] = useState<boolean>(false);
    const [warningMessage, setWarningMessage] = useState<string>("");

    useEffect(() => {
        const hasImageChanges = Object.values(uploadStatus).some((status) => status !== null);
        const hasImageDeletion = Object.values(showImages).some((showImage) => !showImage);
        const hasImageUpload = Object.values(selectedImages).some((selectedImage) => selectedImage !== null);

        if ((hasImageChanges || hasImageDeletion || hasImageUpload) && !hasChanges) {
            setWarningMessage("Please save the changes to avoid losing them.");
        } else if (Object.values(showImages).filter(Boolean).length < 2) {
            setWarningMessage("You need to upload at least 2 images.");
        } else {
            setWarningMessage("Everything seems to be okay.");
        }
    }, [uploadStatus, showImages, selectedImages, hasChanges]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        handleChange({ target: { name, value } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
        setHasChanges(true);
    };

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>, imageKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            const renamedFile = new File([file], `${uuidv4()}.${file.name.split('.').pop()}`, { type: file.type });

            setSelectedImages((prevSelectedImages) => ({
                ...prevSelectedImages,
                [imageKey]: renamedFile,
            }));
            setPreviewImages((prevPreviewImages) => ({
                ...prevPreviewImages,
                [imageKey]: URL.createObjectURL(renamedFile),
            }));

            try {
                const formData = new FormData();
                formData.append('file', renamedFile);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const uploadedImage = await response.json();
                    handleChange({
                        target: {
                            name: 'image_cars',
                            value: { ...car.image_cars, [imageKey]: '/uploads/' + uploadedImage.files[0].name },
                        },
                    } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                    setUploadStatus((prevUploadStatus) => ({
                        ...prevUploadStatus,
                        [imageKey]: 'Upload successful',
                    }));
                    setHasChanges(true);
                } else {
                    setUploadStatus((prevUploadStatus) => ({
                        ...prevUploadStatus,
                        [imageKey]: 'Upload failed',
                    }));
                    console.error('Failed to upload image.');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setUploadStatus((prevUploadStatus) => ({
                    ...prevUploadStatus,
                    [imageKey]: 'Upload failed',
                }));
            }
        }
    };

    const handleImageDelete = (imageKey: string, imageUrl: string) => {
        setSelectedImages((prevSelectedImages) => ({
            ...prevSelectedImages,
            [imageKey]: null,
        }));
        setPreviewImages((prevPreviewImages) => ({
            ...prevPreviewImages,
            [imageKey]: null,
        }));
        const updatedImageCars = { ...car.image_cars };
        delete updatedImageCars[imageKey as keyof typeof updatedImageCars];
        handleChange({
            target: { name: 'image_cars', value: updatedImageCars },
        } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
        setShowImages((prevShowImages) => ({
            ...prevShowImages,
            [imageKey]: false,
        }));
        setUploadStatus((prevUploadStatus) => ({
            ...prevUploadStatus,
            [imageKey]: null,
        }));
        setHasChanges(true);

        handleDeleteImage(imageUrl, imageKey);
    };

    const handleDeleteImage = (imageUrl: string, imageKey: string) => {
        fetch(imageUrl)
            .then((response) => {
                if (response.ok) {
                    // Image exists, proceed with the deletion
                    fetch('/api/upload', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ imageUrl }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.success) {
                                setShowImages((prevShowImages) => ({
                                    ...prevShowImages,
                                    [imageKey]: false,
                                }));
                                console.log('Image deleted:', imageUrl);
                            } else {
                                console.error('Error deleting image:', data.message);
                            }
                        })
                        .catch((error) => {
                            console.error('Error deleting image:', error);
                        });
                } else {
                    // Image does not exist, remove it from the array
                    const updatedImageCars = { ...car.image_cars };
                    delete updatedImageCars[imageKey as keyof typeof updatedImageCars];
                    handleChange({
                        target: { name: 'image_cars', value: updatedImageCars },
                    } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                    setShowImages((prevShowImages) => ({
                        ...prevShowImages,
                        [imageKey]: false,
                    }));
                    console.log('Image not found:', imageUrl);
                }
            })
            .catch((error) => {
                console.error('Error checking image existence:', error);
            });
    };

    const getBorderStyle = (imageKey: string): string => {
        if (hasChanges) {
            return 'border-orange-500';
        } else if (
            uploadStatus[imageKey] === 'Upload failed' ||
            Object.values(uploadStatus).some((status) => status === 'Upload failed')
        ) {
            return 'border-red-500';
        } else {
            return 'border-green-500';
        }
    };

    const globalBorderStyle = Object.values(showImages).filter(Boolean).length < 2 ? 'border-red-500' : '';

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Cover Images</h3>
            <div className={`border ${globalBorderStyle} rounded-lg p-4`}>
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {Array.from(Array(4).keys()).map((index) => {
                        const imageKey = (index + 1).toString();
                        const imageUrl = car.image_cars?.[imageKey as keyof typeof car.image_cars];
                        const showImage = showImages[imageKey];
                        const selectedImage = selectedImages[imageKey];
                        const previewImage = previewImages[imageKey];
                        const status = uploadStatus[imageKey];

                        const divBorderStyle = getBorderStyle(imageKey);

                        useEffect(() => {
                            const checkExistence = async () => {
                                if (imageUrl) {
                                    try {
                                        const response = await fetch(imageUrl);
                                        if (!response.ok) {
                                            setShowImages((prevShowImages) => ({
                                                ...prevShowImages,
                                                [imageKey]: false,
                                            }));
                                            handleDeleteImage(imageUrl, imageKey);
                                        }
                                    } catch (error) {
                                        setShowImages((prevShowImages) => ({
                                            ...prevShowImages,
                                            [imageKey]: false,
                                        }));
                                        handleDeleteImage(imageUrl, imageKey);
                                    }
                                }
                            };
                            checkExistence();
                        }, [imageUrl, imageKey]);

                        return (
                            <div key={imageKey} className={`relative ${divBorderStyle}`}>
                                {showImage && imageUrl ? (
                                    <>
                                        <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                                            <Image src={imageUrl} alt={`Image ${imageKey}`} layout="fill" objectFit="cover" className="rounded" />
                                        </div>
                                        <button
                                            onClick={() => handleImageDelete(imageKey, imageUrl)}
                                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {previewImage ? (
                                            <div className="relative h-[100px] w-[150px] bg-gray-200 rounded">
                                                <Image src={previewImage} alt="Selected Image" layout="fill" objectFit="cover" />
                                            </div>
                                        ) : (
                                            <div className="relative h-[100px] w-[150px] bg-gray-200 rounded flex items-center justify-center">
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
                                    </>
                                )}
                                {status && <p className="mt-2">{status}</p>}
                            </div>
                        );
                    })}
                </div>
                {warningMessage && <p className="mt-4">{warningMessage}</p>}
            </div>
        </div>
    );
}
