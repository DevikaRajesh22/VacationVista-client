import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getMonthlyRevenue } from '../../Api/seller';

interface Revenue {
    month: string;
    totalRevenue: number;
}

const MonthlyRevenue = () => {
    const [revenueData, setRevenueData] = useState<Revenue[]>([]);

    const monthNames: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            try {
                const res = await getMonthlyRevenue();
                if (res?.data.success) {
                    console.log('Fetched data:', res.data.data);
                    setRevenueData(res.data.data);
                } else {
                    console.error('Failed to fetch revenue data');
                }
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };
        fetchMonthlyRevenue();
    }, []);

    const defaultRevenueData: Revenue[] = monthNames.map((_, index) => ({
        month: (index + 1).toString(),
        totalRevenue: 0
    }));

    console.log('Default Revenue Data:', defaultRevenueData);
    console.log('Fetched Revenue Data:', revenueData);

    const combinedRevenueData = defaultRevenueData.map(defaultMonth => {
        const found = revenueData.find(revenue => revenue.month === defaultMonth.month);
        if (found) {
            console.log(`Found match for month ${defaultMonth.month}:`, found);
            return { ...defaultMonth, totalRevenue: found.totalRevenue };
        } else {
            console.log(`No match found for month ${defaultMonth.month}, using default value`);
            return defaultMonth;
        }
    });

    console.log('Combined Revenue Data:', combinedRevenueData);

    const monthlyData = combinedRevenueData.map(item => ({
        name: monthNames[parseInt(item.month) - 1],
        revenue: item.totalRevenue
    }));

    console.log('Monthly Data for Chart:', monthlyData);

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