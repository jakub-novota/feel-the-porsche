export default function Test1() {

    return (
        <>
            <div className="flex justify-center">
                <div className="bg-gray-200 w-[310px] h-[338px] relative">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-2xl font-bold mb-4">Title</h2>
                        <p className="text-gray-600">Long text goes here...</p>
                    </div>
                    <div className="absolute bottom-0 right-0 ">
                        <span className="relative inline-block">
                            <span className="absolute right-0 mt-[-60px] text-[80px]">01</span>
                        </span>
                    </div>
                </div>
            </div>

        </>

    )
}