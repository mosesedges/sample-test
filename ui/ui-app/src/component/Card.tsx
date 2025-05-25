import React from "react";
import { PiFilmReel } from "react-icons/pi";
import { MdDateRange, MdAccessTime } from "react-icons/md";

export interface CardProps {
  id?: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  owner: string;
}

// export interface StatusProps extends CardProps {
//   showStatus: string;
// }

export interface CardWithStatusProps extends CardProps {
  showStatus?: string;
  startDate: string;
  endDate: string;
}

export const Card: React.FC<CardWithStatusProps> = ({
  title,
  description,
  startDate,
  endDate,
  startTime,
  endTime,
  owner,
  showStatus,
}) => {
  // TODO: Implement the component UI
  return (
    <div
      data-testId="card"
      className=" rounded-2xl inset-shadow-rose-200 drop-shadow-blue-200 w-[28rem] h-[12rem] bg-gray-300 text-black hover:shadow-2xl hover:scale-95"
    >
      <h2 className="font-bold text-center p-2">{title}</h2>

      <p className="text-[0.75rem] pb-2 pl-4 flex">
        {" "}
        <PiFilmReel className=" w-[22px] h-[30px] pr-1" />
        {owner}
      </p>
      <p className="pl-4 pb-4">{description}</p>
      <div className="flex justify-between w-[26rem] pl-4">
        <div className="flex pl-2 w-[14rem]  justify-between">
          <p className="flex">
            <span>
              <MdDateRange className=" w-[22px] h-[30px] pr-1" />
            </span>
            {startDate}
          </p>
          {endDate && <p>-</p>}
          <p>{endDate} </p>
        </div>
        <div className="flex pl-2 w-[10rem]  justify-between">
          <MdAccessTime className=" w-[20px] h-[30px]" />
          <p>{startTime}</p>
          <p>-</p>
          <p>{endTime} </p>
        </div>
      </div>
      {showStatus && <p>{showStatus}</p>}
    </div>
  );
};
