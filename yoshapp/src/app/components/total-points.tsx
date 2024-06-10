'use client'
import type { NextPage } from "next";
import { format, addDays } from 'date-fns';
import { Area, AreaChart, Brush, CartesianGrid, Legend, Line, LineChart,  ResponsiveContainer,  Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { SleepData, SleepResponse } from "./calender";

const TotalPoints: NextPage = () => {
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [limit, setLimit] = useState<number>(1000);
  const [offset, setOffset] = useState<number>(0);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

    useEffect(() => {
        const fetchSleepData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:5000/current_user', { withCredentials: true });
                const response = await axios.post<SleepResponse>(`http://127.0.0.1:5000/sleep/${res.data.id}`, {
                    limit: limit,
                    offset: offset
                }, {withCredentials: true});
        const sortedData = response.data.sleep.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
                setSleepData(sortedData);
                const sleepDates = response.data.sleep.map(sleep => new Date(sleep.date));
                setHighlightedDates(sleepDates);
                console.debug(sleepData)
            } catch (error) {
                console.error('Error fetching sleep data:', error);
            }
        };

        fetchSleepData();
    }, [limit, offset]);

  return (
    <div className="">
      <h3 className="">
        Total score
      </h3>
  <ResponsiveContainer width="100%" height={350}>
    <LineChart
      width={500}
      height={300}
      data={sleepData}
      margin={{
        top: 100, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date"/>
      <YAxis dataKey="score"/>
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
  <Brush
    dataKey="time"
    stroke="#448aff"
    height={30}
    startIndex={0}
    endIndex={sleepData.length - 1}
  >
    <AreaChart data={sleepData}>
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
