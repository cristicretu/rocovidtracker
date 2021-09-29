import React from "react";
import CountUp from "react-countup";

interface CardProps {
  name: string;
  value: number | null;
}

export const Card: React.FC<CardProps> = ({ name, value }) => {
  return (
    <div className="bg-gray-800 px-6 py-2 rounded-md m-2">
      <h3 className="font-semibold">{name}</h3>
      {value !== null ? (
        <CountUp end={value} duration={4} />
      ) : (
        <p className="text-opacity-30 text-white">loading</p>
      )}
    </div>
  );
};
