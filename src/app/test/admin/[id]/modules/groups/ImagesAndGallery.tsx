import { ChangeEvent, useState } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';
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

    const getImageContainerStyle = () => {
        if (enlargedImage) {
            return {
                cursor: 'default',
            };
        }
        return {
            cursor: 'pointer',
        };
    };

    return (
        <div className="border border-gray-300 rounded-[10px] p-[20px]">
            <h2 className="text-lg font-semibold mb-2">Images and Gallery</h2>
            <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Frontpage Image</h3>
                <div
                    className="w-24 h-24 relative"
                    style={getImageContainerStyle()}
                    onClick={() => handleImageClick(car.image)}
                >
                    <img src={car.image} alt="Frontpage Image" className="w-full h-full object-cover rounded" />
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Cover Images</h3>
                <div className="flex flex-wrap">
                    {Object.entries(car.image_cars).map(([key, image]) => (
                        <div
                            key={key}
                            className="w-24 h-24 m-2 relative"
                            style={getImageContainerStyle()}
                            onClick={() => handleImageClick(image)}
                        >
                            <Image src={image} fill alt={`Cover Image ${key}`} className="w-full h-full object-cover rounded" />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-md font-semibold mb-2">Gallery Images</h3>
                <div className="flex flex-wrap">
                    {Object.entries(car.gallery).map(([key, image]) => (
                        <div
                            key={key}
                            className="w-24 h-24 m-2 relative"
                            style={getImageContainerStyle()}
                            onClick={() => handleImageClick(image)}
                        >
                            <Image src={image} fill alt={`Gallery Image ${key}`} className="w-full h-full object-cover rounded" />
                        </div>
                    ))}
                </div>
            </div>
            {enlargedImage && (
                <div
                    className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-[0.7] z-50"
                    onClick={handleCloseImage}
                >
                    <Image src={enlargedImage}
                        width={800}
                        height={0}
                        alt="Enlarged Image"
                    />
                </div>
            )}
        </div>
    );
}
