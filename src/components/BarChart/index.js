import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './index.css'

function groupByWeekday(transactions) {
    const weekdays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const groupedData = {};

    weekdays.forEach(weekday => {
        groupedData[weekday] = { credit: 0, debit: 0 };
    });

    const oneWeekAgo = new Date(); 
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    for (const transaction of transactions){
        const date = new Date(transaction.date);
        // console.log(date)
        if(date == "Invalid Date" || date < oneWeekAgo){
            continue
        }
        const weekday = weekdays[date.getDay()];
        console.log(transaction)
        if (transaction.type.toLowerCase() === 'credit') {
            groupedData[weekday].credit += transaction.sum;
        } else if (transaction.type.toLowerCase() === 'debit') {
            groupedData[weekday].debit += transaction.sum;
        }
    }

    return groupedData;
}

const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    const borderRadius=5;
    return (
        <g>
           <rect x={x} y={y} width={width} height={height} fill={fill} rx={borderRadius} ry={borderRadius} />
        </g>
    );
};


const BarGraph = props => {
    const { total7 } = props
    const weeklyData = groupByWeekday(total7);

    const chartData = Object.entries(weeklyData).map(([weekday, { credit, debit }]) => ({
        weekday,
        credit,
        debit,
    }));

    return (
        <div style={{ overflowX: 'auto' }}>
            <ResponsiveContainer height={400}  className="chart-container">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left:10, bottom:0 }} padding={{bottom: -1}} borderRadius={{bottom:0}} barGap={3} >
                    <CartesianGrid strokeDasharray="none" vertical={false} verticalStrokeWidth={1}/>
                    <XAxis dataKey="weekday" tickLine={false} />
                    <YAxis domain={[0, 150000]} tickCount={15} allowDataOverflow={true} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="debit" fill="#1f77b4" name="Debit" shape={<CustomBar />}  />
                    <Bar dataKey="credit" fill="#fd7f0e" name="Credit" shape={<CustomBar />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarGraph;