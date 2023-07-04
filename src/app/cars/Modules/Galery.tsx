import Image from 'next/image';

interface GaleryProps {
  carGalleryURL: string; // Update prop name and type to receive a single string
}

export default function Galery({ carGalleryURL }: GaleryProps) {
  let imageUrls: string[] = [];
  try {
    const parsedCarImagesURL = JSON.parse(carGalleryURL);
    if (Array.isArray(parsedCarImagesURL)) {
      imageUrls = parsedCarImagesURL;
    } else if (typeof parsedCarImagesURL === 'object' && parsedCarImagesURL !== null) {
      imageUrls = Object.values(parsedCarImagesURL);
    }
  } catch (error) {
    console.error('Error parsing carImagesURL:', error);
  }

  //console.log(imageUrls)
  if (!carGalleryURL) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap">
        {imageUrls.map((imageUrl, index) => (
          <div className="w-full md:w-1/2" key={index}>
            <div className="bg-white relative w-full h-[275px] sm:h-[503px]">
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                priority
                quality={100}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
