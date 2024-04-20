import { Link } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../Api/buyer";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error('Please enter valid email !!')
                return
            }
            const res = await forgotPassword(email)
            if (res?.data.success) {
                navigate(`/forgotPasswordOtp/${email}`);
            } else {
                toast.error('User doesnt exists !!')
                navigate('/signup')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main id="content" role="main" className="w-full  max-w-md mx-auto p-6">
            <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                            Forgot password?
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?
                            <Link
                                className="text-blue-600 decoration-2 hover:underline font-medium"
                                to='/login'
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                                    >
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="email"
                                            name="email"
                                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                            aria-describedby="email-error"
                                        />
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                                        Please include a valid email address so we can get back to you
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Send OTP
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default ForgotPassword
