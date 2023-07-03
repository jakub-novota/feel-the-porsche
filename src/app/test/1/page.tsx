"use client"
import { useRouter } from 'next/router';

const ReceiverComponent: React.FC = () => {
    const router = useRouter();
    const { date, time } = router.query;

    return (
        <div>
            <h2>Receiver Component</h2>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
        </div>
    );
};

export default ReceiverComponent;
