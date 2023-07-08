import { ChangeEvent, useState } from 'react';
import { Car } from '@/app/cars/Modules/CarInterface';
import Image from 'next/image';
import FrontpageImage from './ImagesAndGallery/FrontpageImage';
import CoverImages from './ImagesAndGallery/CoverImages';
import GalleryImages from './ImagesAndGallery/GalleryImages';

interface ImagesAndGalleryProps {
    car: Car;
    formData: Car;
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}


export default function ImagesAndGallery({
    car,
    formData,
    handleChange,
}: ImagesAndGalleryProps): JSX.Element {
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

    const handleImageClick = (image: string) => {
        setEnlargedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseImage = () => {
        setEnlargedImage(null);
        document.body.style.overflow = 'auto';
    };

    const handleDeleteFrontpageImage = () => {
        const updatedFormData: Car = { ...formData };
        updatedFormData.image = '';
        handleChange({ target: { name: 'image', value: '' } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
    };

    const handleDeleteCoverImage = (key: string) => {
        const updatedFormData: Car = { ...formData };
        delete updatedFormData.image_cars[key as keyof typeof updatedFormData.image_cars];
        
        handleChange({ target: { name: 'image_cars', value: updatedFormData.image_cars } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
    };

    const handleDeleteGalleryImage = (key: string) => {
        const updatedFormData: Car = { ...formData };
        delete updatedFormData.gallery[key as keyof typeof updatedFormData.gallery];
        handleChange({ target: { name: 'gallery', value: updatedFormData.gallery } } as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Images and Gallery</h2>
            <div className="border border-gray-300 rounded-lg p-4">
                <FrontpageImage
                    image={car.image}
                    handleChange={handleChange}
                    handleImageClick={() => handleImageClick(car.image)}
                    handleDeleteImage={handleDeleteFrontpageImage}
                />
                <CoverImages
                    imageCars={car.image_cars}
                    handleChange={handleChange}
                    handleImageClick={handleImageClick}
                    handleDeleteImage={handleDeleteCoverImage}
                />
                <GalleryImages
                    gallery={car.gallery}
                    handleChange={handleChange}
                    handleImageClick={handleImageClick}
                    handleDeleteImage={handleDeleteGalleryImage}
                />
                {enlargedImage && (
                    <div
                        className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50"
                        onClick={handleCloseImage}
                    >
                        <Image src={enlargedImage} width={800} height={0} alt="Enlarged Image" />
                    </div>
                )}
            </div>
        </div>
    );
}
