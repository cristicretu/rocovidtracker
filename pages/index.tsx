import type { NextPage } from "next";
import { useState } from "react";
import moment from "moment";
import { Card } from "../components/Card";

const Home: NextPage = () => {
  const url =
    "https://api.apify.com/v2/key-value-stores/KUlj8EGfDGHiB0gU1/records/LATEST?disableRedirect=true";

  const [infected, setInfected] = useState<number | null>(null);
  const [deceased, setDeceased] = useState<number | null>(null);
  const [recovered, setRecovered] = useState<number | null>(null);
  const [tested, setTested] = useState<number | null>(null);
  const [updated, setUpdated] = useState<string | null>(null);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { infected, deceased, recovered, tested, lastUpdatedAtSource } =
        data;
      setUpdated(lastUpdatedAtSource);
      setInfected(infected);
      setDeceased(deceased);
      setRecovered(recovered);
      setTested(tested);
    })
    .catch((error) => console.log(error));
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-white bg-gray-900 min-h-screen py-2">
        <p className="text-white font-bold text-lg">covid-19 romania</p>
        <div className="grid grid-cols-2 gap-2">
          <Card name="infected" value={infected} />
          <Card name="deceased" value={deceased} />
          <Card name="recovered" value={recovered} />
          <Card name="tested" value={tested} />
        </div>
        {updated !== null ? (
          <p className="text-white">updated {moment(updated).fromNow()}</p>
        ) : (
          <p className="text-opacity-30 text-white">loading</p>
        )}

        <a href="https://github.com/cristicretu/rocovidtracker">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current mt-2 text-white text-opacity-40 hover:text-opacity-100 transition-all "
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Home;
