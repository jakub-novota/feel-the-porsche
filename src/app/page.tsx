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
      <VideoPlayer />
      <div>
        <HowItWorks />
      </div>
      <div className="mt-[128px] mb-[126px]">
        <PickCar />
      </div>
      <div className="">
        <Services />
      </div>
      <div className="mt-[103px]">
        <FAQ/>
      </div>
      <div>
        <ContactUs />
      </div>
    </>
  )
}