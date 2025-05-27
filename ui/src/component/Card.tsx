import React from "react";
import { PiFilmReel } from "react-icons/pi";
import { MdDateRange, MdAccessTime } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

export interface CardProps {
  id?: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  owner: string;
}

export interface CardWithStatusProps extends CardProps {
  showStatus: string;
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
  return (
    <div
      data-testId="card"
      className=" rounded-2xl inset-shadow-rose-200 drop-shadow-blue-200 bg-gray-300 text-black hover:shadow-2xl hover:scale-98 p-5"
    >
      <p className="text-sm flex items-center">
        {" "}
        <PiFilmReel className="icon" />
        {owner}
      </p>
      <img src="/video.png" alt="video/png" className="w-32 h-32 mx-auto" />
      <h2 className="font-bold text-center">{title}</h2>
      <p className="line-clamp-1 " title={description}>
        {description}
      </p>
      <div className="flex justify-between text-sm">
        <div className="flex justify-between items-center ">
          <MdDateRange className=" icon mr-2" />
          <p>{startDate}</p>
          {endDate && <p>-</p>}
          <p>{endDate} </p>
        </div>
        <div className="flex justify-between items-center text-sm">
          <MdAccessTime className=" icon mr-2" />
          <p>{startTime}</p>
          <p>-</p>
          <p>{endTime} </p>
        </div>
      </div>
      {
        <p className="flex ">
          <GoDotFill
            color={
              showStatus === "Completed"
                ? "green"
                : showStatus === "Scheduled"
                ? "orange"
                : "red"
            }
            className="icon"
          />
          {showStatus}
        </p>
      }
    </div>
  );
};
