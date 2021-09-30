import React from "react";
import CountUp from "react-countup";

interface CardProps {
  name: string;
  value: number | null;
  newCases?: number | undefined;
}

export const Card: React.FC<CardProps> = ({ name, value, newCases }) => {
  return (
    <div className="bg-gray-800 hover:bg-gray-700 transition-all duration-500 flex flex-col align-center items-center px-6 py-2 rounded-md m-2">
      <h3 className="font-semibold">{name}</h3>
      {newCases !== undefined ? (
        <CountUp
          className={name == "infected" ? "text-red-500" : "text-green-500"}
          end={newCases}
          prefix="+"
          duration={4}
          separator=" "
        />
      ) : (
        ""
      )}
      {value !== null ? (
        <CountUp end={value} duration={3.5} separator=" " />
      ) : (
        <p className="text-opacity-30 text-white">loading</p>
      )}
    </div>
  );
};
