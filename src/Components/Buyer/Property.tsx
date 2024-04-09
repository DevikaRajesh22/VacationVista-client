import { useState, useEffect } from 'react';
import { property } from '../../Api/admin';
import { useNavigate } from 'react-router-dom';

interface Property {
  id: string,
  title: string,
  address: string,
  photos: string,
  price: string,
  status: string,
  isBlocked: boolean
}

const Property = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

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
  }, []);

  const handleClick = async (id: string) => {
    try {
      navigate(`/singleProperty/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredProperties = searchTerm ?
    properties.filter((property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : properties

  return (
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Property..."
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {filteredProperties.map((val) => {
            return (
              <div className={`${(val.status == 'Verification Required' || val.status == "Rejected" || val.isBlocked == true) && 'hidden'}`}>
                <article className="relative">
                  <div className="aspect-square overflow-hidden">
                    <img
                      className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                      src={val.photos[0]}
                      alt=""
                      onClick={() => handleClick(val.id)}
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div className="">
                      <h3 className="text-xs font-semibold sm:text-sm md:text-base text-black">
                        <a href="#" title="" className="cursor-pointer">
                          {val.title}
                        </a>
                      </h3>
                      <p className='text-black-400'>
                        {val.address}
                      </p>
                      <p className='text-black'>
                        <span className='font-semibold'>₹{val.price}</span> night
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>

  )
}

export default Property
