import { useState, useEffect } from 'react';
import { sellerList } from '../../Api/seller';
import { useNavigate } from 'react-router-dom';

interface Property {
    _id: string,
    title: string,
    address: string,
    status: string,
    photos: string,
    isBlocked: string,
    price: number,
}

const Listing = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const res = await sellerList()
                if (res?.data.success) {
                    setProperties(res.data.getProperty)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPropertyData();
    });

    const handleClick = async (id: string) => {
        try {
            navigate(`/seller/editProperty/${id}`)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
            {
                properties.length == 0 ? (
                    <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                        <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">
                            No listings yet...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                                {properties.map((val) => {
                                    return (
                                        <article className="relative flex flex-col overflow-hidden rounded-lg border" key={val._id}>
                                            <div className="aspect-square overflow-hidden">
                                                <img
                                                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                                                    src={val.photos[0]}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="absolute top-0 m-2 rounded-full bg-white">
                                                <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-black sm:py-1 sm:px-3">
                                                    {val.status}
                                                </p>
                                            </div>
                                            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                                                <p className="text-lg text-black font-semibold">{val.title}</p>
                                                <p className="text-sm text-black-500 ">{val.address}</p>
                                                <h3 className="mb-2 text-sm text-gray-400">₹{val.price} night</h3>
                                            </div>
                                            <button onClick={() => handleClick(val._id)} className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                                                <div className="flex w-full items-center justify-center bg-yellow-500 text-xs uppercase transition group-hover:bg-emerald-600 font-bold text-white">
                                                    Edit
                                                </div>
                                            </button>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )
            }
        </section>
    )
}

export default Listing
