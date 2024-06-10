'use client'
import type { NextPage } from "next";
import { useState } from 'react';
import TopCities from "./components/top-cities";
import TotalPoints from "./components/total-points";
import Bg from "./components/bg";
import FrameComponent from "./components/frame-component";
import ActiveUsers from "./components/active-users";
import Sidebar from "./components/sidebar";
import CalendarWithModal from "./components/calender";
import SleepForm from "./components/submit";
import PersonalInfoForm from "./components/users";

const LightDashboard: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const main = () => {
      if(activeIndex == 0){
          return(
        <div className="relative ml-20"> 
          <main className="flex flex-col items-start justify-start gap-6">
            <section className="w-full">
              <h1 className="text-3xl font-bold mb-4">
                My Dashboard
              </h1>
              <TotalPoints />
            </section>
            <div className="w-full flex flex-col items-start justify-start gap-6">
              <ActiveUsers />
            </div>
          </main>
          <div className="fixed top-0 right-0 w-[343px] h-auto shadow-[0px_5px_20px_#c0c7d6] rounded-8xs [background:linear-gradient(180deg,_#679cf6,_#4072ee)] flex flex-col items-start justify-start p-[30px] box-border gap-[8px] text-left text-xl text-white font-roboto mq450:w-[280px] mq450:gap-[16px] z-[2]">
            <FrameComponent />
          </div>
        </div>          )
          }
      if(activeIndex == 1){
          return(
        <div className="relative ml-20"> 
          <CalendarWithModal/>
        </div>          )
          }

      if(activeIndex == 2){
          return(
        <div className="relative ml-20"> 
          <SleepForm />
        </div>          )
          }

      if(activeIndex == 3){
          return(
        <div className="relative ml-20"> 
          <PersonalInfoForm />
        </div>          )
          }
      }

  return (
    <div className="flex">
      <Sidebar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {main()}
    </div>
  );
};

export default LightDashboard;
