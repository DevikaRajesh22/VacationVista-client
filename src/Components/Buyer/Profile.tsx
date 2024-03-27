import user from '../../assets/user.png'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {profile} from '../../Api/buyer'

const Profile = () => {
  // const [image, setImage] = useState(null);

  useEffect(()=>{
    const fetchUserData=async()=>{
      try{
        console.log('fetch data')
        const res=await profile()
        console.log('res',res)
      }catch(error){
        console.log(error)
      }
    }
    fetchUserData()
  },[]);

  return (
    <div className="flex justify-center items-start h-screen">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center items-center mt-20">
        <div className="flex justify-end px-4 pt-4">
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={user}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            bonnie@gmail.com
          </span>
          <div className="flex mt-4 md:mt-6">
            <Link
              to='/editProfile'
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;