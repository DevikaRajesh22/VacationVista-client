import { useState, useEffect } from 'react';
import { property } from '../../Api/admin';
import { toast } from 'react-toastify';
import { hideProperty } from '../../Api/admin';

interface Property {
    id: string,
    title: string,
    address: string,
    status: string,
    photos: string,
    isBlocked: boolean
}

const Property = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [block, setBlock] = useState(false)

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const res = await property()
                console.log(res)
                if (res?.data.success) {
                    setProperties(res.data.getProperty)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchPropertyData()
    }, [block]);

    const handleHide = async (id: string) => {
        try {
            const res = await hideProperty(id)
            console.log('res', res)
            if (res?.data.success) {
                setBlock(!block)
                toast.success('Succcessfully changed access...')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='grid md:grid-cols-3 grid-cols-2'>
            {
                properties.map((val) => {
                    return (
                        <div className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4 ${(val.status == 'Verification Required' || val.status == "Rejected") && 'hidden'}`}>
                            <a href="#">
                                <img className="rounded-t-lg h-40 w-full" src={val.photos[0]} alt="" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {val.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {val.address}
                                </p>
                                <p className="mb-3 font-thin text-red-700 dark:text-gray-400">
                                    {val.status}
                                </p>
                                <button
                                    onClick={() => handleHide(val.id)}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-500"
                                >
                                    {val.isBlocked ? 'Show' : 'Hide'}
                                </button>

                            </div>
                        </div>
                    )
                })
            }

        </div>


    )
}

export default Property
