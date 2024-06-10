'use client'
import type { NextPage } from "next";
import { format, addDays } from 'date-fns';
import { Area, AreaChart, Brush, CartesianGrid, Legend, Line, LineChart,  ResponsiveContainer,  Tooltip, XAxis, YAxis } from "recharts";

type sleepData = {
    date: string,
    points: number
}

const generateSleepData = (startDate: string, endDate: string): sleepData[] => {
  const data: sleepData[] = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const points = Math.floor(Math.random() * 5000);
    data.push({ date: format(currentDate, 'yyyy-MM-dd'), points });
    currentDate = addDays(currentDate, 1);
  }

  return data;
};

// 使用例
const start = '2024-08-01';
const end = '2024-10-10';
const data = generateSleepData(start, end);


const TotalPoints: NextPage = () => {
  return (
    <div className="">
      <h3 className="">
        Total score
      </h3>
  <ResponsiveContainer width="100%" height={350}>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 100, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="points" stroke="#8884d8" activeDot={{ r: 8 }} />
  <Brush
    dataKey="time"
    stroke="#448aff"
    height={30}
    startIndex={0}
    endIndex={data.length - 1}
  >
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <Area
        type="monotone"
        dataKey="amount"
        stroke="none"
        fillOpacity={1}
        fill="#bdbdbd"
      />
    </AreaChart>
  </Brush>

    </LineChart>
  </ResponsiveContainer>
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_1px_4px_#e5e9f2] rounded-8xs bg-white hidden" />
    </div>
  );
};

export default TotalPoints;
