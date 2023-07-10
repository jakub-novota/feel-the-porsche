import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

interface FrontpageImageProps {
    image: string | null;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleImageClick: () => void;
    handleDeleteImage: () => void;
}

export default function FrontpageImage({
    image,
    handleChange,
    handleImageClick,
    handleDeleteImage,
}: FrontpageImageProps): JSX.Element {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [postUploadImages, setPostUploadImages] = useState<string[]>([]);

    const handleDeleteClick = () => {
        handleDeleteImage();
        setUploadStatus('');
        setPostUploadImages([]);
        handleChange({ target: { name: 'image', value: null } } as unknown as ChangeEvent<HTMLInputElement>);
    };


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type !== 'image/png') {
            setErrorMessage('Only PNG images are allowed.');
            return;
        }
        setSelectedImage(file || null);
        setErrorMessage('');
        handleChange(event); // Forward the file change event to the parent component
    };

    const handleImageUpload = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault(); // Prevent form submission
        if (!selectedImage) {
            setErrorMessage('No image selected.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedImage);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const uploadedImage = await response.json();
                setUploadStatus('Upload successful');
                setSelectedImage(null);
                handleChange({
                    target: { name: 'image', value: '/uploads/' + uploadedImage.files[0].name },
                } as ChangeEvent<HTMLInputElement>);
                console.log('Image uploaded successfully.');

                const uploadedImageName = uploadedImage.files[0].name;
                console.log('Post-upload Image:', uploadedImageName);
                setPostUploadImages(prevImages => [...prevImages, uploadedImageName]);
            } else {
                setUploadStatus('Upload failed');
                console.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('Upload failed');
        }
    };

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Frontpage Image</h3>
            {image ? (
                <div>
                    <div
                        className="w-24 h-24 relative cursor-pointer rounded overflow-hidden"
                        onClick={handleImageClick}
                    >
                        <Image
                            src={image}
                            alt="Frontpage Image"
                            fill
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <button
                        type="button" // Set the button type to prevent form submission
                        className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </button>
                </div>
            ) : (
                <div className="mt-[20px]">
                    {uploadStatus ? (
                        <div>
                            <h4>Image uploaded successfully!</h4>
                            {postUploadImages.length > 0 ? (
                                postUploadImages.map((uploadedImageName, index) => (
                                    <Image
                                        key={index}
                                        src={'/uploads/' + uploadedImageName}
                                        alt="Uploaded Image"
                                        width={200}
                                        height={200}
                                    />
                                ))
                            ) : (
                                <p>No uploaded images available.</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            {selectedImage ? (
                                <div
                                    className="w-24 h-24 relative cursor-pointer rounded overflow-hidden"
                                    onClick={handleImageClick}
                                >
                                    <Image
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Frontpage Image"
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/png"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="frontpage-image-input"
                                    />
                                    <label
                                        htmlFor="frontpage-image-input"
                                        className="block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                                    >
                                        Select Image
                                    </label>
                                </div>
                            )}
                            {errorMessage && (
                                <p className="text-red-500">{errorMessage}</p>
                            )}
                            {selectedImage && (
                                <button
                                    type="button" // Set the button type to prevent form submission
                                    className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600"
                                    onClick={handleImageUpload}
                                >
                                    Upload Image
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
            {postUploadImages.length > 0 && !uploadStatus && (
                <div>
                    <h4>Post-upload Images:</h4>
                    <ul>
                        {postUploadImages.map((imageName, index) => (
                            <li key={index}>{imageName}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
