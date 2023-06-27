import Image from "next/image"
import VideoPlayer from "./Modules/VidePlayer"
import HowItWorks from "./Modules/HowItWorks"
import PickCar from './Modules/PickCar';
import Services from "./Modules/Services";
import FAQ from "./Modules/Faq";
import ContactUs from './Modules/ContactUs/ContactUs';

export default function Home() {

  return (
    <>
      <div className="">
        <VideoPlayer />
      </div>
      <div className="hidden lg:block">
        <HowItWorks />
      </div>
      <div className="mt-[128px] mb-[126px] hidden lg:block">
        <PickCar />
      </div>
      <div className="hidden lg:block">
        <Services />
      </div>
      <div className="mt-[103px] hidden lg:block">
        <FAQ />
      </div>
      <div className="mt-[127px] hidden lg:block">
        <ContactUs />
      </div>
    </>
  )
}