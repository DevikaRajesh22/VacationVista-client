import { useState, useEffect } from 'react';
import {property} from '../../Api/admin'

interface Property {
  id: string,
  title: string,
  address: string,
  photos: string,
  price: string,
  status: string,
  isBlocked: boolean,
}

const Trend = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(()=>{
    const fetchPropertyData=async()=>{
      try{
        const res = await property()
        if (res?.data.success) {
          setProperties(res.data.getProperty)
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchPropertyData()
  },[]);
  console.log(properties)

  return (
    <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h3 className='font-bold'>Trending</h3>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {properties.slice(0, 8).map((val) => {
            return (
              <div className={`${(val.status == 'Verification Required' || val.status == "Rejected" || val.isBlocked == true) && 'hidden'}`}>
                <article className="relative">
                  <div className="aspect-square overflow-hidden">
                    <img
                      className="group-hover:scale-125 h-full w-full object-cover transition-all duration-300"
                      src={val.photos[0]}
                      alt=""
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div className="">
                      <h3 className="text-xs font-semibold sm:text-sm md:text-base text-black">
                        <a href="#" title="" className="cursor-pointer">
                          {val.title}
                        </a>
                      </h3>
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
  );
};

export default Trend;