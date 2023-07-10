import { ChangeEvent, useState } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';

interface FrontPageImage {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function FrontPageImage({ car, formData, handleChange }: FrontPageImage): JSX.Element {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showImage, setShowImage] = useState<boolean>(car.image ? true : false);
    const [imageChanged, setImageChanged] = useState<boolean>(false);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [postUploadImages, setPostUploadImages] = useState<string[]>([]);


    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setUploadStatus('Uploading...');
            setPreviewImage(URL.createObjectURL(file));

            try {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const uploadedImage = await response.json();
                    setUploadStatus('Upload successful');
                    setSelectedImage(null);
                    handleChange({ target: { name: 'image', value: '/uploads/' + uploadedImage.files[0].name } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
                    setPostUploadImages([uploadedImage.files[0].name]);
                    setShowImage(true); // Show the uploaded image
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

    const handleImageDelete = () => {
        setSelectedImage(null);
        setPreviewImage(null);
        handleChange({ target: { name: 'image', value: '' } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
        setShowImage(false);
        setImageChanged(true);
        setPostUploadImages([]);
    };

    return (
        <>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Front Page Image</h3>
                <div className={`border rounded-lg p-4 ${imageChanged ? 'border-orange-500' : 'border-green-500'}`}>
                    <div className="mb-4">
                        <label htmlFor="image" className="text-gray-700 font-medium">Dir:</label>
                        <p className={`border focus:border-blue-500 rounded-md px-3 py-2 min-h-[40px] w-full ${!formData.image && 'border-red-500'}`}>
                            {formData.image}
                        </p>
                        {imageChanged && <p className="text-orange-500 mt-1">Please save the changes.</p>}
                    </div>
                    <div>
                        {showImage ? (
                            <div className="mb-4">
                                {previewImage && (
                                    <div>
                                        <p className="text-gray-700 font-medium">Selected Image:</p>
                                        <Image src={previewImage} alt="Selected Image" width={200} height={200} />
                                    </div>
                                )}
                                {car.image && !previewImage && (
                                    <div>
                                        <p className="text-gray-700 font-medium">Current Image:</p>
                                        <Image src={car.image} alt="Current Image" width={200} height={200} />
                                    </div>
                                )}
                                <button
                                    onClick={handleImageDelete}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <label htmlFor="file-upload" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                                    Choose File
                                </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept="image/png, image/jpeg"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>
                        )}
                        {uploadStatus && <p className="text-gray-700">{uploadStatus}</p>}
                        {postUploadImages.length > 0 && (
                            <div>
                                <h4 className="text-gray-700 font-medium">Post-upload Images:</h4>
                                <ul>
                                    {postUploadImages.map((imageName, index) => (
                                        <li key={index}>{imageName}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
