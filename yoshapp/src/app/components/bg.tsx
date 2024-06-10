import type { NextPage } from "next";

const Bg: NextPage = () => {
  return (
    <div className="absolute h-full top-[0px] bottom-[0px] left-[1112px] shadow-[0px_0px_5px_#e5e9f2] bg-white w-[328px] z-[1] text-left text-sm text-darkslategray font-roboto">
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_5px_#e5e9f2] bg-white hidden" />
      <div className="absolute top-[634px] left-[0px] bg-aliceblue-100 w-[328px] h-px z-[2]" />
      <div className="absolute top-[721px] left-[30px] w-[268px] h-[260px] z-[2]">
        <div className="absolute w-full top-[calc(50%_-_130px)] right-[0%] left-[0%] h-10">
          <div className="absolute top-[2px] left-[55px] inline-block min-w-[65px]">
            Basketball
          </div>
          <div className="absolute top-[21px] left-[55px] text-xs text-lightslategray inline-block min-w-[84px]">
            1423 Questions
          </div>
          <img
            className="absolute h-[7.5%] w-[4.85%] top-[47.5%] right-[0%] bottom-[45%] left-[95.15%] max-w-full overflow-hidden max-h-full object-contain"
            loading="lazy"
            alt=""
            src="/more@2x.png"
          />
          <img
            className="absolute h-full w-[14.93%] top-[0%] right-[85.07%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            loading="lazy"
            alt=""
            src="/icon@2x.png"
          />
        </div>
        <div className="absolute w-full top-[calc(50%_-_75px)] right-[0%] left-[0%] h-10">
          <div className="absolute top-[2px] left-[55px] inline-block min-w-[76px]">
            Smartwatch
          </div>
          <div className="absolute top-[21px] left-[55px] text-xs text-lightslategray inline-block min-w-[84px]">
            1299 Questions
          </div>
          <img
            className="absolute h-[7.5%] w-[4.85%] top-[47.5%] right-[0%] bottom-[45%] left-[95.15%] max-w-full overflow-hidden max-h-full object-contain"
            alt=""
            src="/more@2x.png"
          />
          <img
            className="absolute h-full w-[14.93%] top-[0%] right-[85.07%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/icon-1@2x.png"
          />
        </div>
        <div className="absolute w-full top-[calc(50%_-_20px)] right-[0%] left-[0%] h-10">
          <div className="absolute top-[2px] left-[55px] inline-block min-w-[45px]">
            Games
          </div>
          <div className="absolute top-[21px] left-[55px] text-xs text-lightslategray inline-block min-w-[78px]">
            983 Questions
          </div>
          <img
            className="absolute h-[7.5%] w-[4.85%] top-[47.5%] right-[0%] bottom-[45%] left-[95.15%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/more@2x.png"
          />
          <img
            className="absolute h-full w-[14.93%] top-[0%] right-[85.07%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/icon-2@2x.png"
          />
        </div>
        <div className="absolute w-full top-[calc(50%_+_35px)] right-[0%] left-[0%] h-10">
          <div className="absolute top-[2px] left-[55px] inline-block min-w-[80px]">
            Photography
          </div>
          <div className="absolute top-[21px] left-[55px] text-xs text-lightslategray inline-block min-w-[78px]">
            788 Questions
          </div>
          <img
            className="absolute h-[7.5%] w-[4.85%] top-[47.5%] right-[0%] bottom-[45%] left-[95.15%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/more@2x.png"
          />
          <img
            className="absolute h-full w-[14.93%] top-[0%] right-[85.07%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/icon-3@2x.png"
          />
        </div>
        <div className="absolute w-full top-[calc(50%_+_90px)] right-[0%] left-[0%] h-10">
          <div className="absolute top-[2px] left-[55px] inline-block min-w-[49px]">
            Finance
          </div>
          <div className="absolute top-[21px] left-[55px] text-xs text-lightslategray inline-block min-w-[78px]">
            632 Questions
          </div>
          <img
            className="absolute h-[7.5%] w-[4.85%] top-[47.5%] right-[0%] bottom-[45%] left-[95.15%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/more@2x.png"
          />
          <img
            className="absolute h-full w-[14.93%] top-[0%] right-[85.07%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/icon-4@2x.png"
          />
        </div>
      </div>
      <h3 className="m-0 absolute top-[665px] left-[30px] text-xl font-normal font-inherit z-[2] mq450:text-base">
        Popular Topics
      </h3>
      <div className="absolute top-[668px] left-[249px] text-lightslategray text-right inline-block min-w-[49px] z-[2]">
        View all
      </div>
      <h1 className="m-0 absolute top-[30px] left-[30px] text-17xl font-normal font-inherit z-[2] mq450:text-3xl mq750:text-10xl">
        Personal
      </h1>
      <div className="absolute top-[45px] left-[226px] text-lightslategray text-right inline-block min-w-[71px] whitespace-nowrap z-[2]">
        Learn more
      </div>
    </div>
  );
};

export default Bg;
