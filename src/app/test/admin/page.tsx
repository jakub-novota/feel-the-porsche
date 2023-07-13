import List from "./modules/carlist";

export default function page() {

    return (
        <>
            <h1 className="text-center">Admin Panel</h1>
            <div>
                <List />
            </div>
        </>
    )



}