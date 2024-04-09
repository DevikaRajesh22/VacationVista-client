import userimg from '../../assets/userimg.png'
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { sellLogout } from '../../Store/slice/authSlice';
import { hosts } from '../../Api/admin';
import { blockSeller } from '../../Api/admin';

interface Seller {
    id: string,
    name: string,
    email: string,
    isBlocked: boolean,
    image: string,
    phone: string,
}

const Host = () => {
    const [seller, setSeller] = useState<Seller[]>([])
    const [block, setBlock] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const res = await hosts()
                if (res?.data.success) {
                    setSeller(res.data.getHost)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSellerData()
    }, [block]);

    const handleBlock = async (id: string) => {
        try {
            console.log(id)
            const res = await blockSeller(id)
            if (res?.data.success) {
                dispatch(sellLogout())
                setBlock(!block)
                toast.success('Succcessfully changed access...')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{seller.map((val) => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th
                                    scope="row"
                                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={val.image ? val.image : userimg}
                                        alt="Jese image"
                                    />
                                </th>
                                <td className="px-6 py-4">
                                    <div className="ps-3">
                                        <div className="text-base text-black font-semibold">
                                            {val.name}
                                        </div>
                                        <div className="font-normal text-gray-600">
                                            {val.email}
                                        </div>
                                        <div className="font-normal text-gray-600">
                                            {val.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-4">
                                        <button className="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 " onClick={() => handleBlock(val.id)}>
                                            {val.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Host
