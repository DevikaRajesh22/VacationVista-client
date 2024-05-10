import { useState, useEffect } from 'react';
import { fetchProperties } from '../../Api/buyer'
import { useNavigate } from 'react-router-dom';
import { category } from '../../Api/admin'

interface Seller {
  id: string,
  name: string,
  email: string,
  image: string,
  password: string,
  isBlocked: boolean,
  dateOfBirth: Date,
  phone: string,
  govtId: string,
  creationTime: Date,
  subscriptionId: string,
  isVerified: boolean,
}
interface Property {
  id: string,
  category: string,
  title: string,
  address: string,
  photos: string,
  price: string,
  status: string,
  isBlocked: boolean,
  sellerId: Seller
}

interface Category {
  id: string,
  name: string,
  isHidden: boolean
}

const Property = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate()

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingCategories(true);
        const res = await category()
        if (res?.data.success) {
          setCategories(res.data.getCategory)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    fetchData();
  }, [searchTerm, sortOption, selectedCategory, currentPage]);

  const fetchData = async () => {
    try {
      setLoadingProperties(true);
      const res = await fetchProperties(searchTerm, sortOption, selectedCategory, currentPage, itemsPerPage);
      if (res?.data.success) {
        setProperties(res.data.properties);
        setTotalPages(Math.floor(res.data.totalProperties / itemsPerPage));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProperties(false)
    }
  };

  const handleClick = async (id: string) => {
    try {
      navigate(`/singleProperty/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
      {(loadingCategories || loadingProperties) ? (
        <div className="flex justify-center">
          <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600" />
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
              <div className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                  <div className="relative">
                    <select onChange={(e) => {
                      const selectedOption = e.target.value;
                      if (selectedOption == 'Sort') {
                        setSortOption('')
                      } else {
                        setSortOption(selectedOption)
                      }
                    }} className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>Sort</option>
                      <option>Low to High</option>
                      <option>High to Low</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <select onChange={(e) => {
                      const selectedOption = e.target.value
                      if (selectedOption == 'Category') {
                        setSelectedCategory('')
                      } else {
                        setSelectedCategory(selectedOption)
                      }
                    }} className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                      <option>Category</option>
                      {categories.map((val) => {
                        return (
                          <option>{val.name}</option>
                        )
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="block relative">
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                    </svg>
                  </span>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
              {properties.map((val) => {
                return (
                  <div className={`${(val.status === 'Verification Required' || val.status === "Rejected" || val.isBlocked === true) && 'hidden'}`}>
                    <article className="relative">
                      <div className="aspect-square overflow-hidden">
                        <img
                          className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                          src={val.photos[0]}
                          alt=""
                          onClick={() => handleClick(val.id)}
                        />
                        {val?.sellerId?.isVerified && ( // Conditionally render the badge if the property is trusted
                          <div className="absolute top-2 left-2 bg-blue-800 text-white px-2 py-1 rounded-full text-xs">
                            Trusted
                          </div>
                        )}
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
          <div className='flex justify-center m-20'>
            <nav>
              <ul className="inline-flex -space-x-px text-sm">
                <li>
                  <a
                    href='#'
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => handleClickPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </a>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page}>
                    <a
                      href="#"
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${page === currentPage ? 'border-blue-500' : 'border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      onClick={() => handleClickPage(page)}
                    >
                      {page}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => handleClickPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </section>
  )
}

export default Property
