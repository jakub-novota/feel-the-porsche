export default function Skeleton() {

    return (
        <div>
            <div className="mb-4 ">
                <label htmlFor="filter" className="mr-2">
                    Filter:
                </label>
                <input
                    type="text"
                    id="filter"
                    className="border border-gray-300 rounded-md px-2 py-1 mr-4"
                />
                <label htmlFor="sortBy" className="mr-2">
                    Sort By:
                </label>
                <select
                    id="sortBy"
                    className="border border-gray-300 rounded-md px-2 py-1 mr-2"
                >
                    <option value="name">Name</option>
                    <option value="power_PS">Power</option>
                    <option value="max_speed">Max Speed</option>
                    <option value="acceleration">Acceleration</option>
                    <option value="year">Year</option>
                    <option value="capacity">Capacity</option>
                </select>
                <button className="text-blue-500">
                </button>
            </div>


            <div className='flex justify-center '>
                <div className="flex flex-col items-start">
                    <div>
                        <h1 className="font-sohogothicpro font-bold italic text-[70px] leading-[79px] tracking-[-0.02em] text-[#313131] mb-[71px]">Cars</h1>
                        <p className="mb-[31px] font-medium text-[14px] leading-[17px] tracking-[-0.05em] text-[#313131]">Sort by</p>
                    </div>
                    <div className="grid grid-cols-1 space-y-[45px] sm:space-y-0 lg:grid-cols-2 sm:gap-x-[25px] sm:gap-y-[54px]">

                        <div role="status" className="w-[353px]  sm:w-[572px] sm:h-[537px]  rounded  animate-pulse md:p-6 ">
                            <div className="flex items-center justify-center rounded bg-gray-200 w-[353px] h-[280px] sm:w-[573px] sm:h-[401px]" />
                            <div className=" mt-[20px] rounded-b-[12px] pt-[15px] pl-[19px] pr-[16px] pb-[30px] sm:pt-[25px] sm:pl-[30px] sm:pr-[30px] sm:pb-[27px]">
                                <div className="h-2.5 rounded-full bg-gray-400 w-48 mb-4"></div>
                                <div className="h-2  rounded-full bg-gray-400 mb-2.5"></div>
                                <div className="h-2 rounded-full bg-gray-400 mb-2.5"></div>
                                <div className="h-2 rounded-full bg-gray-400"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>

                        <div role="status" className=" w-[353px]  sm:w-[572px] sm:h-[537px] rounded  animate-pulse md:p-6 ">
                            <div className="flex items-center justify-center rounded bg-gray-200 w-[353px] h-[280px] sm:w-[573px] sm:h-[401px]" />
                            <div className="mt-[20px] rounded-b-[12px] pt-[15px] pl-[19px] pr-[16px] pb-[30px] sm:pt-[25px] sm:pl-[30px] sm:pr-[30px] sm:pb-[27px]">
                                <div className="h-2.5 rounded-full bg-gray-400 w-48 mb-4"></div>
                                <div className="h-2  rounded-full bg-gray-400 mb-2.5"></div>
                                <div className="h-2 rounded-full bg-gray-400 mb-2.5"></div>
                                <div className="h-2 rounded-full bg-gray-400"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>

                        <div role="status" className=" w-[353px]  sm:w-[572px] sm:h-[537px] rounded  animate-pulse md:p-6" >
                            <div className="flex items-center justify-center rounded bg-gray-200 w-[353px] h-[280px] sm:w-[573px] sm:h-[401px]" />
                            <div className="mt-[20px] rounded-b-[12px] pt-[15px] pl-[19px] pr-[16px] pb-[30px] sm:pt-[25px] sm:pl-[30px] sm:pr-[30px] sm:pb-[27px]">
                                <div className="h-2.5  rounded-full bg-gray-400 w-48 mb-4"></div>
                                <div className="h-2  rounded-full bg-gray-400 mb-2.5"></div>
                                <div className="h-2rounded-full bg-gray-400 mb-2.5"></div>
                                <div className="h-2  rounded-full bg-gray-400"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status" className=" w-[353px]  sm:w-[572px] sm:h-[537px] rounded  animate-pulse md:p-6 ">
                            <div className="flex items-center justify-center rounded bg-gray-200 w-[353px] h-[280px] sm:w-[573px] sm:h-[401px]" />
                            <div className="mt-[20px] rounded-b-[12px] pt-[15px] pl-[19px] pr-[16px] pb-[30px] sm:pt-[25px] sm:pl-[30px] sm:pr-[30px] sm:pb-[27px]">
                                <div className="h-2.5 rounded-full bg-gray-400 w-48 mb-4"></div>
                                <div className="h-2  rounded-full bg-gray-400 mb-2.5"></div>
                                <div className="h-2  rounded-full bg-gray-400 mb-2.5"></div>
                                <div className="h-2 rounded-full bg-gray-400"></div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}