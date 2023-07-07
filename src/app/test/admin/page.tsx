import List from "./modules/carlist";
import { ImageGallery } from "./upload/Images";
import ImageUploadForm from "./upload/page";

export default function page() {

    return (
        <>
            <h1 className="text-center">Admin Panel</h1>
            <div>
                <List />
            </div>
            <div className="flex justify-center">
                <ImageUploadForm />
            </div>
            <div>
                <ImageGallery />
            </div>
        </>
    )



}