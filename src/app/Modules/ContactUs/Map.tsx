import ContactFromular from "./ContactFormular";

export default function () {
    return (
        <>
            <div className="relative">
                <div className="absolute  "> <ContactFromular/></div>
                <iframe
                    className="w-full h-[671px]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.097692022009!2d17.1042463!3d48.1469218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c895b8af3f1d3%3A0x542ac7d3f6625293!2sKonventn%C3%A1%20636%2F6%2C%20811%2003%20Bratislava!5e0!3m2!1sen!2ssk!4v1687347262593!5m2!1sen!2ssk&amp;disable=zoom"
                    loading="lazy"
                ></iframe>
            </div>

        </>
    )
}