import axios from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';

export const SleepForm: React.FC = () => {
  const [sleepTime, setSleepTime] = useState('');
  const [sleepDate, setSleepDate] = useState(format(new Date().setDate(new Date().getDate() - 1), ("yyyy-MM-dd")));
  const [wakeTime, setWakeTime] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      sleepTime,
      wakeTime,
      note,
    });
 try {
        const res = await axios.post('http://127.0.0.1:5000/submit',{
                wake_up_time: wakeTime,
                bed_time: sleepTime,
                memo: note,
                date: sleepDate
            }, { withCredentials: true });
        console.debug(res)
      } catch (error) {
      }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-4">Sleep Log</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sleepTime">
            寝た日にち
          </label>
          <input
            type="date"
            id="sleepDate"
            value={sleepDate}
            onChange={(e) => setSleepDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sleepTime">
            寝た時間
          </label>
          <input
            type="time"
            id="sleepTime"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="wakeTime">
            起きた時間
          </label>
          <input
            type="time"
            id="wakeTime"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
            メモ
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
          />
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

export default SleepForm;
