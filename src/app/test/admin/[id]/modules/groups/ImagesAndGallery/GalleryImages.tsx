import { ChangeEvent } from 'react';
import Image from 'next/image';

interface GalleryImagesProps {
    gallery: Record<string, string>;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleImageClick: (image: string) => void;
    handleDeleteImage: (key: string) => void;
}

export default function GalleryImages({ gallery, handleChange, handleImageClick, handleDeleteImage }: GalleryImagesProps): JSX.Element {
    const imageCount = Object.keys(gallery).length;
    const isMinimumImages = imageCount >= 4;

    const handleDeleteClick = (key: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent form submission
        handleDeleteImage(key);
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Gallery Images</h3>
            {isMinimumImages ? (
                <div className="flex flex-wrap">
                    {Object.entries(gallery).map(([key, image]) => (
                        <div key={key} className="relative w-24 h-24 m-2 cursor-pointer rounded overflow-hidden">
                            <Image src={image} alt={`Gallery Image ${key}`} fill className="object-cover w-full h-full" />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                                onClick={(event) => handleDeleteClick(key, event)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-red-500 mb-[20px]">Minimum of 4 images required</div>
            )}
            <div>
                <label htmlFor="galleryImages" className="mt-2 cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Upload Images
                    <input
                        type="file"
                        id="galleryImages"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
}
