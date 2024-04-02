import { useEffect, useState } from 'react';
import { category } from '../../Api/admin';

interface Category {
    name: string,
    isHidden: boolean
}

const ListForm = () => {
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await category()
                if (res?.data.success) {
                    setCategories(res.data.getCategory)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategory()
    }, [])


    return (
        <div className="flex min-h-screen justify-center items-center mt-20">
            <form className="max-w-md mx-auto w-3/4">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="floating_email"
                        id="floating_email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Title
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        name="floating_description"
                        id="floating_description"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        rows={Number("3")}
                    ></textarea>
                    <label
                        htmlFor="floating_description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Description
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number"
                        name="floating_price"
                        id="floating_price"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                    />
                    <label
                        htmlFor="floating_price"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Price per night(₹)
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <textarea
                        name="floating_description"
                        id="floating_description"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        rows={Number("2")}
                    ></textarea>
                    <label
                        htmlFor="floating_description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Address
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <fieldset className="space-y-2">
                        <legend className="text-sm font-medium text-gray-900 dark:text-white">Select Category: </legend>
                        {
                            categories.map((val) => {
                                return (
                                    <div className={`flex items-center ${val.isHidden && 'hidden'} `}>
                                        <input
                                            type="radio"
                                            id="category_1"
                                            name="category"
                                            value="category_1"
                                            className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                                        />
                                        <label htmlFor="category_1" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                            {val.name}
                                        </label>
                                    </div>
                                )
                            })
                        }

                    </fieldset>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <fieldset className="space-y-2">
                        <legend className="text-sm font-medium text-gray-900 dark:text-white">Select Type: </legend>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="category_1"
                                name="category"
                                value="category_1"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="category_1" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Entire Place
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type="radio"
                                id="category_1"
                                name="category"
                                value="category_1"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="category_1" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Single Room
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type="radio"
                                id="category_1"
                                name="category"
                                value="category_1"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="category_1" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Shared Room
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number" // Set type to number for integer input
                        name="guest_capacity" // Update name for clarity
                        id="guest_capacity"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" // Update placeholder
                    />
                    <label
                        htmlFor="guest_capacity"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Number of guest
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number" // Set type to number for integer input
                        name="guest_capacity" // Update name for clarity
                        id="guest_capacity"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" // Update placeholder
                    />
                    <label
                        htmlFor="guest_capacity"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Number of bedroom
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number" // Set type to number for integer input
                        name="guest_capacity" // Update name for clarity
                        id="guest_capacity"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" // Update placeholder
                    />
                    <label
                        htmlFor="guest_capacity"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Number of bed
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number" // Set type to number for integer input
                        name="guest_capacity" // Update name for clarity
                        id="guest_capacity"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="" // Update placeholder
                    />
                    <label
                        htmlFor="guest_capacity"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Number of bathroom
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <fieldset className="space-y-2">
                        <legend className="text-sm text-gray-900 dark:text-white font-semibold">Amenities (select all that apply):</legend>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_wifi"
                                name="amenities[]" // Use an array name for multiple selections
                                value="wifi"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_wifi" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Wi-Fi
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                TV
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                AC
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Food included
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Free Parking
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Swimming Pool
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Lake Access
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Beach access
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <fieldset className="space-y-2">
                        <legend className="text-sm text-gray-900 dark:text-white font-semibold">Safety Features (select all that apply):</legend>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_wifi"
                                name="amenities[]" // Use an array name for multiple selections
                                value="wifi"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_wifi" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Smoke alarm
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                First aid
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="amenity_parking"
                                name="amenities[]"
                                value="parking"
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="amenity_parking" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Fire extinguisher
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <>
                        <label
                            className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold"
                            htmlFor="multiple_files"
                        >
                            Upload Images
                        </label>
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="multiple_files"
                            type="file"
                            multiple
                        />
                    </>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>

    )
}

export default ListForm
