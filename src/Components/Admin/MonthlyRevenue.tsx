import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getMonthlyRevenue } from '../../Api/admin';

interface Revenue {
  month: number,
  totalRevenue: number
}

const MonthlyRevenue = () => {
  const [revenueData, setRevenueData] = useState([]);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      const res = await getMonthlyRevenue()
      if (res?.data.success) {
        setRevenueData(res.data.data)
      }
    }
    fetchMonthlyRevenue()
  }, [])

  const defaultRevenueData = monthNames.map((month, index) => ({
    month: index + 1,
    totalRevenue: 0
  }));

  const combinedRevenueData = defaultRevenueData.map(defaultMonth => {
    const found = revenueData.find((revenue: Revenue) => revenue.month === defaultMonth.month);
    return found || defaultMonth;
  });

  const monthlyData = combinedRevenueData.map((item) => ({
    name: monthNames[item.month - 1],
    revenue: item.totalRevenue
  }));

  return (
    <BarChart width={800} height={300} data={monthlyData}>
      <XAxis dataKey="name" stroke="#8884d8" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="revenue" fill="#8884d8" barSize={30} />
    </BarChart>
  )
}

export default MonthlyRevenue