'use client'
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import { FaChartBar, FaCalendarAlt, FaCog, FaPlus, FaBed } from 'react-icons/fa';

interface SidebarProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeIndex, setActiveIndex }) => {
  const menuItems = [
    { icon: FaChartBar, label: 'Chart' },
    { icon: FaCalendarAlt, label: 'Calendar' },
    { icon: FaBed, label: 'Bed' },
    { icon: FaCog, label: 'Settings' },
  ];

  return (
   <div className="fixed top-0 left-0 h-screen w-20 flex flex-col bg-white shadow-lg z-10">
      <div className="flex flex-col items-center mt-4">
      </div>
      <div className="flex flex-col items-center mt-10 space-y-4">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`p-3 rounded-full shadow-md cursor-pointer ${
                activeIndex === index ? 'bg-blue-500' : ''
              }`}
            >
              <IconComponent
                size={24}
                color={activeIndex === index ? 'white' : 'gray'}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center mt-auto mb-4">
        <button className="bg-green-500 p-4 rounded-full text-white shadow-lg">
        <Link href={'/login'}>
          <span>Login</span>
        </Link>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

