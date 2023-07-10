import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

interface FrontpageImageProps {
    image: string | null; // Update the image prop type to accept null
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
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleDeleteClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault(); // Prevent form submission
        handleDeleteImage();
        setIsImageVisible(false);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.type !== 'image/png') {
                setErrorMessage('Only PNG images are allowed.');
                return;
            }
            setSelectedImage(file);
            setErrorMessage('');
            handleChange(event); // Forward the file change event to the parent component
        }
    };

    const handleImageUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
                // Handle successful upload
                const uploadedImage = await response.json(); // Assuming the response contains the uploaded image URL
                setUploadedImageUrl(uploadedImage.url); // Store the uploaded image URL
                setUploadStatus('Upload successful');
                setIsImageVisible(false);
                setSelectedImage(null); // Clear the selected image
                handleChange(event as unknown as ChangeEvent<HTMLInputElement>); // Forward the file change event to the parent component
                console.log('Image uploaded successfully.');
            } else {
                // Handle upload failure
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
            {isImageVisible ? (
                <div>
                    <div
                        className="w-24 h-24 relative cursor-pointer rounded overflow-hidden"
                        onClick={handleImageClick}
                    >
                        {image || uploadedImageUrl ? (
                            <Image
                                src={image || uploadedImageUrl}
                                alt="Frontpage Image"
                                fill
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div>Image Placeholder</div>
                        )}
                    </div>
                    <button
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
                            {uploadedImageUrl && (
                                <Image src={uploadedImageUrl} alt="Uploaded Image" width={200} height={200} />
                            )}
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
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            {selectedImage && (
                                <button
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
        </div>
    );
}
