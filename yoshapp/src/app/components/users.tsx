import type React from 'react';
import { useState } from 'react';

export const PersonalInfoForm: React.FC = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      birthday,
      gender,
    });
    // ここでフォームのデータを送信する処理を追加します
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-4">Personal Information</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            名前
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthday">
            誕生日
          </label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            性別
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 leading-tight"
              required
            />
            <label htmlFor="male" className="mr-4">男性</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 leading-tight"
            />
            <label htmlFor="female" className="mr-4">女性</label>
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 leading-tight"
            />
            <label htmlFor="other">その他</label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            サブミット
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
