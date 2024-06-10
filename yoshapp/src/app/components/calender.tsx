import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';

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

const CalendarWithModal: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-4">Select a Date</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        className="border p-2"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Selected Date"
      >
        <h2 className="text-xl">Selected Date</h2>
        <p>{selectedDate && selectedDate.toDateString()}</p>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default CalendarWithModal;

