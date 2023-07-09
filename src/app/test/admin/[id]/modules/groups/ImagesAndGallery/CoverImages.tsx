import { ChangeEvent } from 'react';
import Image from 'next/image';

interface CoverImagesProps {
    imageCars: Record<string, string>;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleImageClick: (image: string) => void;
    handleDeleteImage: (key: string) => void;
}

export default function CoverImages({
    imageCars,
    handleChange,
    handleImageClick,
    handleDeleteImage,
}: CoverImagesProps): JSX.Element {
    const handleDelete = (key: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent form submission
        handleDeleteImage(key);
    };

    const imageCount = Object.keys(imageCars).length;
    const isMinimumImages = imageCount >= 2;

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Cover Images</h3>
            {isMinimumImages ? (
                <div className="flex flex-wrap">
                    {Object.entries(imageCars).map(([key, image]) => (
                        <div key={key} className="flex flex-col items-center">
                            <div className="w-24 h-24 m-2 relative cursor-pointer rounded overflow-hidden" onClick={() => handleImageClick(image)}>
                                <Image src={image} alt={`Cover Image ${key}`} fill className="object-cover w-full h-full" />
                            </div>
                            <button
                                className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                                onClick={(event) => handleDelete(key, event)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-red-500">Minimum of 2 cover images required</div>
            )}
            <div className="mt-4">
                <label htmlFor="coverImages" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    Upload Images
                    <input type="file" id="coverImages" accept="image/*" multiple onChange={handleChange} className="hidden" />
                </label>
            </div>
        </div>
    );
}
