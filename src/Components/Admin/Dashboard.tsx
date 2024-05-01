import { useState, useEffect } from 'react';
import { dashboard } from '../../Api/admin';
import MonthlySales from './MonthlySales';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalHosts, setTotalHosts] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [blockedHosts, setBlockedHosts] = useState(0);
  const [rejectedProperties, setRejectedProperties] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await dashboard();
      if (res?.data.success) {
        setTotalUsers(res.data.data.totalUsers)
        setTotalHosts(res.data.data.totalHosts)
        setTotalProperties(res.data.data.totalProperties)
        setBlockedUsers(res.data.data.blockedUsers)
        setBlockedHosts(res.data.data.blockedHosts)
        setRejectedProperties(res.data.data.rejectedProperties)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="flex items-center mb-1">
                  <div className="text-2xl font-semibold">{totalUsers}</div>
                </div>
                <div className="text-sm font-medium text-gray-400">Total Users</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-4">
              <div>
                <div className="flex items-center mb-1">
                  <div className="text-2xl font-semibold">{totalHosts}</div>
                </div>
                <div className="text-sm font-medium text-gray-400">Total Hosts</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold mb-1">{totalProperties}</div>
                <div className="text-sm font-medium text-gray-400">Total Properties</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="flex items-center mb-1">
                  <div className="text-2xl font-semibold">{blockedUsers}</div>
                </div>
                <div className="text-sm font-medium text-gray-400">Blocked Users</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-4">
              <div>
                <div className="flex items-center mb-1">
                  <div className="text-2xl font-semibold">{blockedHosts}</div>
                </div>
                <div className="text-sm font-medium text-gray-400">Blocked Hosts</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold mb-1">{rejectedProperties}</div>
                <div className="text-sm font-medium text-gray-400">Rejected Properties</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex m-6">
          <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
            <div className="rounded-t mb-0 px-0 border-0">
              <div className="flex flex-wrap items-center px-4 py-2">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                    Monthly sales
                  </h3>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <MonthlySales />
              </div>
            </div>
          </div>
        </div>
        <div className="flex m-6">
          <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
            <div className="rounded-t mb-0 px-0 border-0">
              <div className="flex flex-wrap items-center px-4 py-2">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                    Monthly sales
                  </h3>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <MonthlySales />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
    </>
  )
}

export default Dashboard
