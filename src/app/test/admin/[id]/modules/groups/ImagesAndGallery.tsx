import { ChangeEvent, useState } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';

interface ImagesAndGalleryProps {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function ImagesAndGallery({ car }: ImagesAndGalleryProps): JSX.Element {
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    const handleImageClick = (image: string) => {
        setEnlargedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseImage = () => {
        setEnlargedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Details and Description</h2>
            <div className="border border-gray-300 rounded p-4">
                <h2 className="text-lg font-semibold mb-2">Images and Gallery</h2>
                <div className="mb-4">
                    <h3 className="text-md font-semibold mb-2">Frontpage Image</h3>
                    <div className="w-24 h-24 relative">
                        <img
                            src={car.image}
                            alt="Frontpage Image"
                            className="w-full h-full object-cover rounded cursor-pointer"
                            onClick={() => handleImageClick(car.image)}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-md font-semibold mb-2">Cover Images</h3>
                    <div className="flex flex-wrap">
                        {Object.entries(car.image_cars).map(([key, image]) => (
                            <div key={key} className="w-24 h-24 m-2 relative">
                                <img
                                    src={image}
                                    alt={`Cover Image ${key}`}
                                    className="w-full h-full object-cover rounded cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-md font-semibold mb-2">Gallery Images</h3>
                    <div className="flex flex-wrap">
                        {Object.entries(car.gallery).map(([key, image]) => (
                            <div key={key} className="w-24 h-24 m-2 relative">
                                <img
                                    src={image}
                                    alt={`Gallery Image ${key}`}
                                    className="w-full h-full object-cover rounded cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {enlargedImage && (
                    <div
                        className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50"
                        onClick={handleCloseImage}
                    >
                        <img src={enlargedImage} alt="Enlarged Image" className="max-w-full max-h-full cursor-pointer" />
                    </div>
                )}
            </div>
        </div>
    );
}
