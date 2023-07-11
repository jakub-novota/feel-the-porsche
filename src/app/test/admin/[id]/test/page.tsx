import { ChangeEvent, useState } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';

interface TestProps {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function Test({ car, formData, handleChange }: TestProps): JSX.Element {
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
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        handleChange({ target: { name, value } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
    };

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>, imageKey: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImages((prevSelectedImages) => ({
                ...prevSelectedImages,
                [imageKey]: file,
            }));
            setPreviewImages((prevPreviewImages) => ({
                ...prevPreviewImages,
                [imageKey]: URL.createObjectURL(file),
            }));

            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const uploadedImage = await response.json();
                    handleChange({ target: { name: 'image_cars', value: { ...car.image_cars, [imageKey]: '/uploads/' + uploadedImage.files[0].name } } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                    setUploadStatus('Upload successful');
                } else {
                    setUploadStatus('Upload failed');
                    console.error('Failed to upload image.');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setUploadStatus('Upload failed');
            }
        }
    };

    const handleImageDelete = (imageKey: string) => {
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
        handleChange({ target: { name: 'image_cars', value: updatedImageCars } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
        setShowImages((prevShowImages) => ({
            ...prevShowImages,
            [imageKey]: false,
        }));
    };

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Cover Images</h3>
            <div className="border border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {Array.from(Array(4).keys()).map((index) => {
                        const imageKey = (index + 1).toString();
                        const imageUrl = car.image_cars?.[imageKey as keyof typeof car.image_cars];
                        const showImage = showImages[imageKey];
                        const selectedImage = selectedImages[imageKey];
                        const previewImage = previewImages[imageKey];
                        return (
                            <div key={imageKey} className="relative">
                                {showImage && imageUrl ? (
                                    <>
                                        <div className="relative aspect-w-1 aspect-h-1 w-[150px] h-[100px] bg-gray-200 rounded">
                                            <Image src={imageUrl} alt={`Image ${imageKey}`} layout="fill" objectFit="cover" className="rounded" />
                                        </div>
                                        <button
                                            onClick={() => handleImageDelete(imageKey)}
                                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {previewImage ? (
                                            <div className='relative h-[100px] w-[150px] bg-gray-200 rounded'>
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
                            </div>
                        );
                    })}
                </div>
                {uploadStatus && <p>{uploadStatus}</p>}
            </div>
        </div>
    );
}
