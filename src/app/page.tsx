import VideoPlayer from "./Modules/VidePlayer"
import HowItWorks from "./Modules/HowItWorks"
import PickCar from './Modules/PickCar/PickCar';
import Services from "./Modules/Services";
import FAQ from "./Modules/Faq";
import ContactUs from './Modules/ContactUs/ContactUs';
import HowItWorksMobil from "./Modules/HowItWorksMobil";
import ServicesMobile from "./Modules/ServicesMobile";

export default function Home() {

  return (
    <>
      <div className="" >
        <VideoPlayer />
      </div>
      <div className="hidden lg:block">
        <HowItWorks />
      </div>
      <div className="lg:hidden">
        <HowItWorksMobil />
      </div>
      <div className="mt-[53px] sm:mt-[128px] mb-[126px] ">
        <PickCar />
      </div>
      <div className="md:hidden">
        <ServicesMobile />
      </div>
      <div className="hidden md:block" id="service">
        <Services />
      </div>
      <div className="mt-[52px] md:mt-[103px] " id="faq">
        <FAQ />
      </div>
      <div className="mt-[97px] " id="contact">
        <ContactUs />
      </div>
    </>
  )
}