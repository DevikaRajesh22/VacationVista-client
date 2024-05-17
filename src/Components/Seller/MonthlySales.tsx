import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getMonthlySales } from '../../Api/seller';

interface Sale {
    month: string,
    totalSales: number
}

const MonthlySales = () => {
    const [salesData, setSalesData] = useState<Sale[]>([]);

    const monthNames: string[] = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    useEffect(() => {
        const fetchSalesData = async () => {
            const res = await getMonthlySales();
            if (res?.data.success) {
                setSalesData(res.data.data)
            }
        }
        fetchSalesData()
    }, []);

    const defaultSalesData: Sale[] = monthNames.map((index) => ({
        month: (index + 1).toString(),
        totalSales: 0
    }));

    const combinedSalesData = defaultSalesData.map(defaultMonth => {
        const found = salesData.find((sale: Sale) => parseInt(sale.month) === parseInt(defaultMonth.month));
        return found || defaultMonth;
    });

    const monthlyData = combinedSalesData.map((item) => ({
        name: monthNames[parseInt(item.month) - 1],
        sale: item.totalSales
    }));

    return (
        <LineChart width={800} height={300} data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="sale" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    )
}

export default MonthlySales