import Image from "next/image"
import VideoPlayer from "./Home_Modules/VidePlayer"

export default function Home() {

  return (
    <>
      <VideoPlayer />
      <div className="flex justify-center">
        <h1>Hello World</h1>
  
      </div>
    </>
  )
}