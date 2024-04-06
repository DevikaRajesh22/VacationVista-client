import { useState, useEffect } from 'react';
import { sellerList } from '../../Api/seller';

interface Property {
    id: string,
    title: string,
    address: string,
    status: string,
    photos: string,
    isBlocked: string,
    price: number,
}

const Listing = () => {
    const [properties, setProperties] = useState<Property[]>([]);

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

    return (
        <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
                    {properties.map((val) => {
                        return (
                            <article className="relative flex flex-col overflow-hidden rounded-lg border">
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
                                <button className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600">
                                    <div className="flex w-full items-center justify-center bg-yellow-500 text-xs uppercase transition group-hover:bg-emerald-600 font-bold text-white">
                                        Edit
                                    </div>
                                </button>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Listing
