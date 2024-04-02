import { Link } from "react-router-dom"
import { useState,useEffect } from 'react';
import {category} from '../../Api/admin';
import { hideCategory } from "../../Api/admin";

interface Category{
  id:string,
  name:string,
  isHidden:boolean
}

const Category = () => {
  const [categories,setCategories]=useState<Category[]>([])
  const [hide,setHide]=useState(false)

  useEffect(()=>{
    const fetchCategoryData=async()=>{
      try{
        const res=await category()
        if(res?.data.success){
          setCategories(res.data.getCategory)
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchCategoryData()
  },[hide])

  const handleHide=async(id:string)=>{
    try{
      const res=await hideCategory(id);
      if(res?.data.success){
        console.log(hide)
        setHide(!hide)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center w-full">
      <div className="relative overflow-x-auto">
        {/* Add button container */}
        <div className="flex justify-center mb-4">
          <Link to='/admin/addCategory'>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
          </Link>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((val)=>{
              return(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {val.name}
              </th>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={()=>handleHide(val.id)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {val.isHidden?'Show':'Hide'}
                </button>
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

export default Category
