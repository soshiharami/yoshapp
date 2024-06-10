import type React from 'react';

export interface User {
  id: number;
  rank: number;
  avg_score: number;
  name: string;
  birthday: string;
  sex: string;
}

export interface RankingResponse {
  users: User[];
  limit: number;
  offset: number;
}

const ProfileCard: React.FC<User> = ({ name,  avg_score }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border border-gray-300 rounded-lg p-5 m-3 flex-grow  shadow-lg">

      <div className="flex items-center">
        <div>
          <div className="text-lg font-bold">{name}</div>
        </div>
      </div>
    <div className="mt-4 h-2 bg-gray-300 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500"
        style={{ width: `${(avg_score / 10000) * 100}%` }}
      ></div>
    </div>
      <div className="flex justify-between mt-3 text-sm">
        <div>{avg_score} Points</div>
      </div>
    </div>
  );
};

export default ProfileCard;
