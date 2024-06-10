import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { format } from 'date-fns';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


export interface SleepData {
    bed_time: string;
    wake_up_time: string;
    memo: string;
    score: number;
    date: string;
}

export interface SleepResponse {
    sleep: SleepData[];
    limit: number;
    offset: number;
}

const CalendarWithModal: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
                setSleepData(response.data.sleep);
                const sleepDates = response.data.sleep.map(sleep => new Date(sleep.date));
                setHighlightedDates(sleepDates);
                console.debug(sleepData)
            } catch (error) {
                console.error('Error fetching sleep data:', error);
            }
        };

        fetchSleepData();
    }, [limit, offset]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    openModal();
  };

  const dayClassName = (date: Date) => {
    const dateString = date.toDateString();
    return highlightedDates.some(highlightedDate => highlightedDate.toDateString() === dateString)
      ? 'bg-yellow-500 text-black'
      : undefined;
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-4">Select a Date</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        className="border p-2"
        dayClassName={dayClassName}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Selected Date"
      >
        <h2 className="text-xl">Selected Date</h2>
        <p>{selectedDate && selectedDate.toDateString()}</p>
        <h2>Score: {sleepData.find(
            d => d.date === format(selectedDate ?? new Date(), "yyyy-MM-dd"))?.score.toString()
        }</h2>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default CalendarWithModal;

