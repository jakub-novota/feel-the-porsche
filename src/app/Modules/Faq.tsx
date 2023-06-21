import FAQ_MODULE from "./Faq_Module";

export default function FAQ() {
    return (
        <>
            <div className="flex">
                <div className="w-[40%] bg-red-400 h-[50px] flex justify-center">
                    <div className=" ">
                        <p>FAQ</p>
                        <h1>Got question?</h1>
                        <p className="max-w-[338px]">Take a look at the answers to the most frequent questions.Is there still something unclear? Contact us.</p>
                    </div>
                </div>
                <div className="flex-grow   flex justify-center ">
                    <FAQ_MODULE />
                </div>
            </div>
        </>
    )
}