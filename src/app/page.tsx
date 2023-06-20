import Image from "next/image"
import VideoPlayer from "./Home_Modules/VidePlayer"
import HowItWorks from "./Home_Modules/HowItWorks"
import Pick from './Home_Modules/Pick';

export default function Home() {

  return (
    <>
      <VideoPlayer />
      <div>
        <HowItWorks />
      </div>
      <div className="mt-[128px]">
        <Pick />
      </div>
    </>
  )
}