"use client"
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard, { type User, type RankingResponse } from "./profileCord";

const ActiveUsers: NextPage = () => {
  const [monthContainerDateTimePickerValue, setMonthContainerDateTimePickerValue] = useState(new Date());
  const [count, setCount] = useState<number>(10);
  const [profiles, setProfiles] = useState<User[]>([]);
  const [visibleProfiles, setVisibleProfiles] = useState<User[]>([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axios.get<RankingResponse>('http://127.0.0.1:5000/ranking', {
          params: {
            limit: count,
            offset: 0,
          },
        });
        setProfiles(response.data.users);
        setVisibleProfiles(response.data.users.slice(0, count));
      } catch (error) {
        console.error('Error fetching ranking data:', error);
      }
    };

    fetchRankingData();
  }, [count]);

  const loadMore = () => {
    setVisibleProfiles(profiles.slice(0, count + 10));
    setCount(count + 10);
  };

  return (
<div className="flex flex-col items-start justify-start py-8 px-4 box-border gap-6 w-full text-left text-sm text-darkslategray font-roboto">
      <div className="w-full relative shadow-sm rounded-lg bg-white hidden" />
      <div className="w-full flex flex-col items-start justify-start gap-6 text-xl">
        <h3 className="m-0 text-lg font-normal">Ranking</h3>
        <div className="w-full flex flex-wrap items-start justify-start gap-4">
          {visibleProfiles.map((profile, index) => (
            <ProfileCard key={index} {...profile} />
          ))}
          {count < profiles.length && (
            <button
              onClick={loadMore}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              もっと見る
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;

