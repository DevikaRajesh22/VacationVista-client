import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getMonthlyRevenue } from '../../Api/admin';

interface Revenue {
  month: string;
  totalRevenue: number;
}

const MonthlyRevenue: React.FC = () => {
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);

  const monthNames: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      const res = await getMonthlyRevenue();
      if (res?.data.success) {
        setRevenueData(res.data.data);
      }
    };
    fetchMonthlyRevenue();
  }, []);

  const defaultRevenueData: Revenue[] = monthNames.map((_, index) => ({
    month: (index + 1).toString(),
    totalRevenue: 0
  }));

  const combinedRevenueData = defaultRevenueData.map(defaultMonth => {
    const found = revenueData.find(revenue => parseInt(revenue.month) === parseInt(defaultMonth.month));
    if (found) {
      return { ...defaultMonth, totalRevenue: found.totalRevenue }
    } else {
      return defaultMonth;
    }
  });

  const monthlyData = combinedRevenueData.map(item => ({
    name: monthNames[parseInt(item.month) - 1],
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
  );
};

export default MonthlyRevenue;