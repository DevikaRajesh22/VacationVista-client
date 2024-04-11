import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { singlePropertyList } from '../../Api/buyer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

interface Property {
    id: string;
    sellerId: string;
    category: string,
    type: string,
    address: string,
    price: number,
    bathroom: number,
    bedroom: number,
    bed: number,
    guest: number
    photos: string,
    title: string,
    description: string,
    isBlocked: boolean,
    amenities: string,
    safeties: string,
}


const SingleProperty = () => {
    const [singleProperty, setSingleProperty] = useState<Property>();
    const [largeImage, setLargeImage] = useState('');
    const [chatBox, setChatBox] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                if (id) {
                    const res = await singlePropertyList(id)
                    if (res?.data.success) {
                        setSingleProperty(res.data.getProperty)
                        setLargeImage(res.data.getProperty.photos[0])
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPropertyData()
    }, [id])

    const amenities = singleProperty?.amenities
    const parsedAmenities = [];
    if (amenities) {
        for (let i = 0; i < amenities.length; i++) {
            parsedAmenities.push(JSON.parse(amenities[i]));
        }
    }

    const safety = singleProperty?.safeties
    const parsedSafety = [];
    if (safety) {
        for (let i = 0; i < safety.length; i++) {
            parsedSafety.push(JSON.parse(safety[i]));
        }
    }

    const handleImageClick = async (imageUrl: string) => {
        try {
            setLargeImage(imageUrl)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <section className="">
                <div className="container mx-auto px-4">
                    <div className="lg:col-gap-12 xl:col-gap-16 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                        <div className="lg:col-span-3 lg:row-end-1">
                            <div className="lg:flex lg:items-start">
                                <div className="lg:order-2 lg:ml-5">
                                    <div className="max-w-xl overflow-hidden rounded-lg">
                                        <img
                                            className="h-[450px] w-[700px] max-w-full object-cover"
                                            src={largeImage}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                    <div className="flex flex-row items-start lg:flex-col">
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singleProperty?.photos[0]}
                                                alt=""
                                                onClick={() => {
                                                    if (singleProperty?.photos[0]) {
                                                        handleImageClick(singleProperty?.photos[0]);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singleProperty?.photos[1]}
                                                alt=""
                                                onClick={() => {
                                                    if (singleProperty?.photos[1]) {
                                                        handleImageClick(singleProperty?.photos[1]);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singleProperty?.photos[2]}
                                                alt=""
                                                onClick={() => {
                                                    if (singleProperty?.photos[2]) {
                                                        handleImageClick(singleProperty?.photos[2]);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singleProperty?.photos[3]}
                                                alt=""
                                                onClick={() => {
                                                    if (singleProperty?.photos[3]) {
                                                        handleImageClick(singleProperty?.photos[3]);
                                                    }
                                                }}
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center"
                                        >
                                            <img
                                                className="h-full w-full object-cover"
                                                src={singleProperty?.photos[4]}
                                                alt=""
                                                onClick={() => {
                                                    if (singleProperty?.photos[4]) {
                                                        handleImageClick(singleProperty?.photos[4]);
                                                    }
                                                }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                            <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                                {singleProperty?.title}
                            </h1>
                            <div className="mt-5 flex items-center">
                                <p className="ml-2 text-sm font-medium text-gray-500">
                                    {singleProperty?.address}
                                </p>
                            </div>
                            <h2 className="mt-8 text-base text-gray-900 font-semibold">Basics</h2>
                            <p className='text-gray-500 mt-2'>{singleProperty?.guest} Guests | {singleProperty?.bedroom} Bedrooms | {singleProperty?.bed} Beds | {singleProperty?.bathroom} Bathrooms</p>
                            <div>
                                <h2 className="mt-8 text-base text-gray-900 font-semibold">Amenities</h2>
                                <ul>
                                    {parsedAmenities.map((amenity, index) => (
                                        <li className='text-gray-600 text-sm' key={index}>
                                            <span>&#8226;</span> {amenity.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2 className="mt-8 text-base text-gray-900 font-semibold">Safety Features</h2>
                                <ul>
                                    {parsedSafety.map((safe, index) => (
                                        <li className='text-gray-600 text-sm' key={index}>
                                            <span>&#8226;</span> {safe.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                <div className="flex items-end">
                                    <h1 className="text-3xl font-bold">₹{singleProperty?.price}</h1>
                                    <span className="text-base">/night</span>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-blue-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                >
                                    Book Now
                                </button>
                            </div>
                            <ul className="mt-8 space-y-2">
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                    <svg
                                        className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            className=""
                                        />
                                    </svg>
                                    Category : {singleProperty?.category}
                                </li>
                                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                    <svg
                                        className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                            className=""
                                        />
                                    </svg>
                                    Type : {singleProperty?.type}
                                </li>
                            </ul>
                        </div>
                        <div className="lg:col-span-3">
                            <div className="border-b border-gray-300">
                                <nav className="flex gap-4">
                                    <a
                                        href="#"
                                        title=""
                                        className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                                    >
                                        {" "}
                                        Description{" "}
                                    </a>
                                    <a
                                        href="#"
                                        title=""
                                        className="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                                    >
                                        Reviews
                                        <span className="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                                            {" "}
                                            1,209{" "}
                                        </span>
                                    </a>
                                </nav>
                            </div>
                            <div className="mt-8 flow-root sm:mt-12">
                                <h1 className="text-3xl font-bold">{singleProperty?.title}</h1>
                                <p className="mt-4">
                                    {singleProperty?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <>
                {/* component */}
                <div className="fixed bottom-0 right-0 mb-4 mr-4">
                    <button
                        id="open-chat"
                        onClick={() => setChatBox(true)}
                        className="bg-blue-800 text-white py-2 px-3 rounded-full hover:bg-blue-900 transition duration-300 flex items-center w-11"  >
                        <FontAwesomeIcon icon={faComment} className="w-6 h-6 mr-2 text-currentColor" />
                    </button>
                </div>

                <div id="chat-container" className={`fixed bottom-16 right-4 w-96 ${chatBox ? '' : 'hidden'}`}>
                    <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                        <div className="p-4 border-b bg-blue-900 text-white rounded-t-lg flex justify-between items-center">
                            <p className="text-lg font-semibold">Admin Bot</p>
                            <button
                                id="close-chat"
                                onClick={() => setChatBox(false)}
                                className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                            {/* Chat messages will be displayed here */}
                            <div className="mb-2 text-right">
                                <p className="bg-blue-900 text-white rounded-lg py-2 px-4 inline-block">
                                    hello
                                </p>
                            </div>
                            <div className="mb-2">
                                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                                    This is a response from the chatbot.
                                </p>
                            </div>
                            <div className="mb-2 text-right">
                                <p className="bg-blue-900 text-white rounded-lg py-2 px-4 inline-block">
                                    this example of chat
                                </p>
                            </div>
                            <div className="mb-2">
                                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                                    This is a response from the chatbot.
                                </p>
                            </div>
                            <div className="mb-2 text-right">
                                <p className="bg-blue-900 text-white rounded-lg py-2 px-4 inline-block">
                                    design with tailwind
                                </p>
                            </div>
                            <div className="mb-2">
                                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                                    This is a response from the chatbot.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 border-t flex">
                            <input
                                id="user-input"
                                type="text"
                                placeholder="Type a message"
                                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                id="send-button"
                                className="bg-blue-900 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </>

        </div>

    )
}

export default SingleProperty
