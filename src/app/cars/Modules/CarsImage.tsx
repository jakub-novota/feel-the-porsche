import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image';
import "swiper/css";
import SwiperCore, { Pagination } from "swiper";
import Status from "../../Modules/Svg_Module/Status";

// Initialize Swiper modules
SwiperCore.use([Pagination]);

interface CarImagesProps {
  carImagesURL: string;
}

const CarImages: React.FC<CarImagesProps> = ({ carImagesURL }) => {
  let imageUrls: string[] = [];

  try {
    const parsedCarImagesURL = JSON.parse(carImagesURL);
    if (Array.isArray(parsedCarImagesURL)) {
      imageUrls = parsedCarImagesURL;
    } else if (typeof parsedCarImagesURL === 'object' && parsedCarImagesURL !== null) {
      imageUrls = Object.values(parsedCarImagesURL);
    }
  } catch (error) {
    console.error('Error parsing carImagesURL:', error);
  }

  const totalImages = imageUrls.length;
  const activeIndexRef = React.useRef<number>(0);

  const handleSlideChange = (swiper: any) => {
    activeIndexRef.current = swiper.activeIndex;
    // Force update to reflect the active index change
    forceUpdate();
  };

  const forceUpdate = () => {
    // Dummy state update to trigger a re-render
    setActiveIndex(activeIndexRef.current);
  };

  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <>
      <div className='relative'>
        <Swiper slidesPerView={1} onSlideChange={handleSlideChange}>
          {imageUrls.map((imageUrl, index) => (
            <React.Fragment key={index}>
              <SwiperSlide key={index}>
                <div className="relative w-[353px] h-[280px] sm:w-[573px] sm:h-[401px]">
                  <Image
                    fill
                    priority
                    quality={100}
                    src={imageUrl}
                    alt={`Image ${index}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </SwiperSlide>
            </React.Fragment>
          ))}
        </Swiper>
        <div className='absolute bottom-0 left-0 z-10 ml-[32px] mb-[24px]'>
          <Status quantity={totalImages} activePosition={activeIndex} />
        </div>
      </div>
    </>
  );
};

export default CarImages;
