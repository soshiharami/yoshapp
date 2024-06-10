import React from 'react';

interface ProfileCardProps {
  name: string;
  points: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name,  points }) => {
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
        style={{ width: `${points}%` }}
      ></div>
    </div>
      <div className="flex justify-between mt-3 text-sm">
        <div>{points} Points</div>
      </div>
    </div>
  );
};

export default ProfileCard;
