import { useEffect, useState } from 'react';
import { category } from '../../Api/admin';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProperty } from '../../Api/seller';
import { useNavigate } from 'react-router-dom';

interface Category {
    id: string,
    name: string,
    isHidden: boolean
}

interface Amenity {
    value: string;
}

interface Safety {
    value: string;
}

const amenitiesData = [
    { value: "Wifi" },
    { value: "TV" },
    { value: "AC" },
    { value: "Food" },
    { value: "Parking" },
    { value: "Pool" },
    { value: "Lake" },
    { value: "Beach" }
]

const safetyData = [
    { value: 'Safety alarm' },
    { value: 'First aid' },
    { value: 'Fire extinguisher' }
]

const ListForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [categoryForm, setCategoryForm] = useState('');
    const [type, setType] = useState('');
    const [guest, setGuest] = useState(0)
    const [bedroom, setBedroom] = useState(0)
    const [bed, setBed] = useState(0)
    const [bathroom, setBathroom] = useState(0)
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [safeties, setSafeties] = useState<Safety[]>([]);
    const [image, setImage] = useState<File[]>([]);

    const navigate=useNavigate()


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

    const handleAmenityChange = (isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
        const amenity = { value: event.target.value };
        const updatedAmenities = [...amenities];
        if (isChecked) {
            updatedAmenities.push(amenity);
        } else {
            const index = updatedAmenities.findIndex(existingAmenity => existingAmenity.value === amenity.value);
            if (index !== -1) {
                updatedAmenities.splice(index, 1);
            }
        }
        setAmenities(updatedAmenities);
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files
        if (selectedFile) {
            const filesArray = Array.from(selectedFile) as File[];
            setImage(filesArray);
        }
    }

    const handleSafetyChange = (isChecked: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
        const safety = { value: event.target.value }
        const updatedSafeties = [...safeties]
        if (isChecked) {
            updatedSafeties.push(safety);
        } else {
            const index = updatedSafeties.findIndex(existingSafety => existingSafety.value === safety.value);
            if (index !== -1) {
                updatedSafeties.splice(index, 1)
            }
        }
        setSafeties(updatedSafeties)
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            if(title.trim().length<3){
                toast.error('Title should have more than 3 characters !!');
                return;
            }else if(address.trim().length<5){
                toast.error('Please enter valid address !!!');
                return;
            }
            const formData=new FormData()
            formData.append('title',title)
            formData.append('description',description)
            formData.append('price',price.toString())
            formData.append('address',address)
            formData.append('category',categoryForm)
            formData.append('type',type)
            formData.append('guest',guest.toString())
            formData.append('bedroom',bedroom.toString())
            formData.append('bathroom',bathroom.toString())
            formData.append('bed',bed.toString())
            amenities.forEach((amenity, index) => {
                formData.append(`amenities[${index}]`, JSON.stringify(amenity));
            });
            safeties.forEach((safety, index) => {
                formData.append(`safeties[${index}]`, JSON.stringify(safety));
            });
            image.forEach((file) => {
                formData.append(`image`, file);
            });
            const res=await createProperty(formData);
            console.log('res',res)
            if(res?.data.success){
                toast.success('Successfully added...')
                navigate('/seller/dashboard')
            }else{
                toast.error('Something went wrong...')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex min-h-screen justify-center items-center mt-20">
            <form className="max-w-md mx-auto w-3/4" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                                            id={`${val.name}`}
                                            name="category"
                                            value={val.name}
                                            className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                                            checked={categoryForm === val.name}
                                            onChange={(e) => setCategoryForm(e.target.value)}
                                        />
                                        <label htmlFor={`${val.id}`} className="ml-2 text-sm text-gray-900 dark:text-gray-400">
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
                                id="EntirePlace"
                                name="type"
                                value="Entire place"
                                onChange={(e) => setType(e.target.value)}
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="EntirePlace" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Entire Place
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type="radio"
                                id="SingleRoom"
                                name="type"
                                value="Single room"
                                onChange={(e) => setType(e.target.value)}
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="SingleRoom" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                Single Room
                            </label>
                        </div>
                        <div className='flex items-center'>
                            <input
                                type="radio"
                                id="SharedRoom"
                                name="type"
                                value="Shared room"
                                onChange={(event) => setType(event.target.value)}
                                className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                            />
                            <label htmlFor="SharedRoom" className="ml-2 text-sm text-gray-900 dark:text-gray-400">
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
                        value={guest}
                        onChange={(e) => setGuest(parseInt(e.target.value))}
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
                        value={bedroom}
                        onChange={(e) => setBedroom(parseInt(e.target.value))}
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
                        value={bed}
                        onChange={(e) => setBed(parseInt(e.target.value))}
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
                        value={bathroom}
                        onChange={(e) => setBathroom(parseInt(e.target.value))}
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
                        {amenitiesData.map((amenity) => (
                            <div key={amenity.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`amenity_${amenity.value}`}
                                    name="amenities[]"
                                    value={amenity.value} // Use amenity.value for consistency
                                    className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                                    onChange={(event) => handleAmenityChange(event.target.checked, event)}
                                />
                                <label htmlFor={`amenity_${amenity.value}`} className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                    {amenity.value}
                                </label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <fieldset className="space-y-2">
                        <legend className="text-sm text-gray-900 dark:text-white font-semibold">Safety Features (select all that apply):</legend>
                        {safetyData.map((safety) => (
                            <div key={safety.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`safety_${safety.value}`}
                                    name="safety[]" // Use an array name for multiple selections
                                    value={safety.value}
                                    className="w-4 h-4 border-gray-300 rounded-full bg-gray-100 focus:ring-blue-500 focus:ring-offset-0 dark:focus:ring-offset-gray-800 focus:outline-none"
                                    onChange={(event) => handleSafetyChange(event.target.checked, event)}
                                />
                                <label htmlFor={`safety_${safety.value}`} className="ml-2 text-sm text-gray-900 dark:text-gray-400">
                                    {safety.value}
                                </label>
                            </div>
                        ))
                        }
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
                            onChange={handleImage}
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
