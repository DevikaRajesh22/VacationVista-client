import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addReply } from '../../Api/seller'
import {useNavigate} from 'react-router-dom'

const Reply = () => {
    const [reply, setReply] = useState('');
    const { reviewId } = useParams();
    const navigate=useNavigate();

    const handleSubmit = async () => {
        try {
            if(reply.trim().length<3){
                toast.error('Please enter a valid reply')
                return
            }
            if (reviewId) {
                const res = await addReply(reviewId, reply);
                if(res?.data.success){
                    toast.success('Successfully added the reply..')
                    navigate('/seller/review')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
            <div className="py-3 sm:max-w-xl sm:mx-auto">
                <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                    <div className="px-12 py-5">
                        <h2 className="text-gray-800 text-xl font-semibold">
                            Your opinion matters to us!
                        </h2>
                    </div>
                    <div className="bg-gray-200 w-full flex flex-col items-center">
                        <div className="flex flex-col items-center py-6 space-y-3">
                            <span className="text-lg text-gray-800">
                                Add a reply
                            </span>

                        </div>
                        <div className="w-3/4 flex flex-col">
                            <textarea
                                rows={3}
                                className="p-4 text-gray-500 rounded-xl resize-none"
                                placeholder='Add reply here'
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                            <button onClick={handleSubmit} className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
                                Reply
                            </button>
                        </div>
                    </div>
                    <div className="h-20 flex items-center justify-center">
                        <Link to="/seller/review" className="text-gray-600">
                            Maybe later
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reply