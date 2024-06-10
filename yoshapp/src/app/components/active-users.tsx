"use client"
import type { NextPage } from "next";
import { useState } from "react";
import { TextField, Icon } from "@mui/material";
import ProfileCard from "./profileCord";

interface Profile {
  name: string;
  location: string;
  level: number;
  points: number;
  imageUrl: string;
}

const profiles: Profile[] = [
  { name: '篠原総士', location: 'Copenhagen, ', level: 15, points: 47, imageUrl: 'https://via.placeholder.com/60' },
  { name: '小沢颯人', location: 'New York, USA', level: 12, points: 38, imageUrl: 'https://via.placeholder.com/60' },
  { name: '會澤太一', location: 'New York, USA', level: 12, points: 12, imageUrl: 'https://via.placeholder.com/60' },
  { name: 'BOQIAN WU', location: 'New York, USA', level: 12, points: 12, imageUrl: 'https://via.placeholder.com/60' },
  { name: 'BOQIAN WU', location: 'New York, USA', level: 12, points: 12, imageUrl: 'https://via.placeholder.com/60' },
  { name: 'BOQIAN WU', location: 'New York, USA', level: 12, points: 12, imageUrl: 'https://via.placeholder.com/60' },
  { name: 'BOQIAN WU', location: 'New York, USA', level: 12, points: 12, imageUrl: 'https://via.placeholder.com/60' },
  { name: 'BOQIAN WU', location: 'New York, USA', level: 12, points: 1, imageUrl: 'https://via.placeholder.com/60' },
  { name: 'BOQIAN WU', location: 'New York, USA', level: 12, points: 1, imageUrl: 'https://via.placeholder.com/60' },
  { name: 'BOQIAN WU', location: 'New York, USA', level: 12, points: 1, imageUrl: 'https://via.placeholder.com/60' },
];

const ActiveUsers: NextPage = () => {
  const [
    monthContainerDateTimePickerValue,
    setMonthContainerDateTimePickerValue,
  ] = useState(new Date());

  const [visibleProfiles, setVisibleProfiles] = useState<Profile[]>(profiles.slice(0, 10));
  const [count, setCount] = useState<number>(10);

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
