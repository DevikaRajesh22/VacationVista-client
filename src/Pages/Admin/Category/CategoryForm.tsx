import SidebarWithLogo from "../../../Components/Admin/Sidebar"
import { toast } from "react-toastify";
import { useState } from 'react'
import { addCategory } from "../../../Api/admin";
import { useNavigate } from "react-router-dom";

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if (name.trim().length < 3) {
                toast.error('Name should have more than 3 characters')
                return
            }
            const res = await addCategory(name, description)
            if (res?.data.success) {
                toast.success(res.data.message)
                navigate('/admin/category')
            } else if (!res?.data.success) {
                toast.error(res?.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <SidebarWithLogo />
            <div className="flex min-h-screen justify-center items-center">
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="category"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            rows={4} // Optional: Set the initial number of visible rows
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CategoryForm
