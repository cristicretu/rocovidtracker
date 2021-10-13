import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col justify-center items-center max-w-2xl mx-auto w-full  px-2 sm:px-2 md:px-0 ">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />

      <p className="text-gray-700 dark:text-gray-300 text-opacity-90 mt-2 text-xs px-8 text-center">
        Created with &hearts; by{" "}
        <a
          className="underline text-black dark:text-white font-semibold"
          href="https://github.com/cristicretu"
          target="_blank"
          rel="noreferrer"
        >
          Cristian Crețu
        </a>
        . Deployed with{" "}
        <a
          className="underline text-black dark:text-white  font-semibold"
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer"
        >
          ▲ Vercel
        </a>
      </p>

      <p className="text-gray-700 dark:text-gray-300 text-opacity-90 mt-2 text-xs px-8 text-center">
        Data provided by{" "}
        <a
          className="underline text-black dark:text-white font-semibold"
          href="http://www.geo-spatial.org"
          target="_blank"
          rel="noreferrer"
        >
          geospatial
        </a>
      </p>
    </footer>
  );
};

export default Footer;
