import { useState, useEffect } from 'react';
import { getNotification } from '../../Api/seller'

interface Property {
    _id: string,
    title: string,
    address: string,
    status: string,
    photos: string,
    isBlocked: string,
    price: number,
}

interface Notification {
    id: string,
    notification: string,
    creationTime: Date,
    sellerId: string,
    propertyId: Property,
}

const Notification = () => {
    const [notification, setNotification] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchNotification = async () => {
            const res = await getNotification();
            if (res?.data.success) {
                setNotification(res.data.data)
            }
        }
        fetchNotification();
    }, [])

    function formatDate(inputDate: Date) {
        const months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const date = new Date(inputDate)
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.getMonth();
        const year = date.getFullYear();
        const formattedDate = `${day} ${months[month]}, ${year}`;
        return formattedDate;
    }

    return (
        <div>
            <div className="mt-20">
                {notification.length == 0 ? (
                    <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                        <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">
                            No notifications at the moment..
                        </p>
                    </div>
                ) : (
                    <div className="container mx-auto mt-10">
                        <div className="max-w-md mx-auto">
                            <div className="bg-white shadow-md rounded-md overflow-hidden">
                                <div className="px-4 py-2 bg-gray-200 border-b border-gray-300">
                                    <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
                                </div>
                                <div className="divide-y divide-gray-300">
                                    {notification
                                        .sort((a: Notification, b: Notification) => new Date(b.creationTime) - new Date(a.creationTime)) // Sort notifications by creationTime
                                        .map((val) => (
                                            <div className="px-4 py-3" key={val.id}> {/* Ensure each element has a unique key */}
                                                <div className="flex items-center justify-between">
                                                    <div className='flex items-center'>
                                                        <img className='rounded-full w-10 h-10' src={val?.propertyId?.photos[0]} />
                                                        <div className='ml-3'>
                                                            <h2 className="text-sm font-semibold text-gray-800">
                                                                {val?.propertyId?.title}
                                                            </h2>
                                                            <p className="text-xs text-gray-600">
                                                                {val?.notification}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{formatDate(val?.creationTime)}</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Notification