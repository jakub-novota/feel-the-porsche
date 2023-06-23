import Image from "next/image";
import React from 'react';

interface CarDetailsProps {
    power: number;
    maxSpeed: number;
    year: number;
    transmission: string;
    acceleration: number;
    capacity: number;
}

interface Card {
    src: string;
    width: number;
    height: number;
    description: string;
    key: keyof CarDetailsProps;
}

const cards: Card[] = [
    {
        src: "/Cards/Vector1.svg",
        width: 16,
        height: 25,
        description: "Power",
        key: "power",
    },
    {
        src: "/Cards/Vector2.svg",
        width: 23,
        height: 23,
        description: "Max speed",
        key: "maxSpeed",
    },
    {
        src: "/Cards/Vector3.svg",
        width: 23,
        height: 23,
        description: "Transmission",
        key: "transmission",
    },
    {
        src: "/Cards/Vector4.svg",
        width: 20,
        height: 29,
        description: "0-100km/h",
        key: "acceleration",
    },
    {
        src: "/Cards/Vector5.svg",
        width: 23,
        height: 23,
        description: "Year",
        key: "year",
    },
    {
        src: "/Cards/Vector6.svg",
        width: 31,
        height: 22,
        description: "Capacity",
        key: "capacity",
    },
];

const InfoCards: React.FC<CarDetailsProps> = ({
    power,
    maxSpeed,
    year,
    transmission,
    acceleration,
    capacity,
}) => {

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-4">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col w-[136px] h-[134px] pl-[20px] items-leftw-[136px]  bg-detailcards rounded-[16px]"
                    >
                        <div className="mt-[11px] w-[52px] h-[52px] relative rounded-full flex justify-center items-center bg-detailcardssvg">
                            <Image src={card.src} width={card.width} height={card.height} alt="Card Image" />
                        </div>
                        <div className="mt-2 text-left">
                            <p className="font-light  text-[12px] leading-[15px] tracking-[-0.05em] text-[#646464]">
                                {card.description}
                            </p>
                            <div className="font-sohogothicpro font-bold text-[20px] leading-[30px] tracking-[-0.02em] text-[#313131]">
                                {card.key === 'power' && <p>{power} PS</p>}
                                {card.key === 'maxSpeed' && <p>{maxSpeed} km/h</p>}
                                {card.key === 'transmission' && <p>{transmission} </p>}
                                {card.key === 'acceleration' && <p>{acceleration} s</p>}
                                {card.key === 'year' && <p>{year}</p>}
                                {card.key === 'capacity' && <p>{capacity} pers</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoCards;
