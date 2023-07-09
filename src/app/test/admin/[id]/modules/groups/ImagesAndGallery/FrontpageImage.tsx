import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

interface FrontpageImageProps {
    image: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleImageClick: () => void;
    handleDeleteImage: () => void;
}

export default function FrontpageImage({ image, handleChange, handleImageClick, handleDeleteImage }: FrontpageImageProps): JSX.Element {
    const [isImageVisible, setIsImageVisible] = useState(true);

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent form submission
        handleDeleteImage();
        setIsImageVisible(false);
    };

    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Frontpage Image</h3>
            {isImageVisible ? (
                <div>
                    <div className="w-24 h-24 relative cursor-pointer rounded overflow-hidden" onClick={handleImageClick}>
                        <Image src={image} alt="Frontpage Image" fill className="object-cover w-full h-full" />
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
                    <label htmlFor="frontpageImage" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                        Upload Image
                        <input
                            type="file"
                            id="frontpageImage"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            required
                            min="1"
                            max="1"
                        />
                    </label>
                    <div className="text-red-500">Exactly one frontpage image is required</div>
                </div>
            )}
        </div>
    );
}
