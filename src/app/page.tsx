import Image from "next/image"
import VideoPlayer from "./Modules/VidePlayer"
import HowItWorks from "./Modules/HowItWorks"
import Pick from './Modules/Pick';

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