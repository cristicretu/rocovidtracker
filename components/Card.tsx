import React from "react";
import CountUp from "react-countup";
import cx from "clsx";

interface CardProps {
  name: string;
  value: number | null;
  newCases?: number | undefined;
}

export const Card: React.FC<CardProps> = ({ name, value, newCases }) => {
  return (
    <div
      className={cx(
        "bg-gray-200 text-sm sm:text-base hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-500 flex flex-col align-center items-center px-6 py-2 rounded-md m-2",
        name == "intensive care units" ? "col-span-2" : ""
      )}
    >
      <h3 className="font-semibold">{name}</h3>
      {newCases !== undefined ? (
        <CountUp
          className={
            name == "infected"
              ? "text-red-500"
              : name == "deceased"
              ? "text-gray-500"
              : name == "recovered"
              ? "text-green-500"
              : "text-purple-500"
          }
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
        <div className="animate-pulse h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      )}
    </div>
  );
};
