import type { NextPage } from "next";
import { useEffect, useState } from "react";
import moment from "moment";
import { Card } from "components/Card";
import Container from "components/Container";

const Home: NextPage = () => {
  const [infected, setInfected] = useState<number | null>(null);
  const [deceased, setDeceased] = useState<number | null>(null);
  const [recovered, setRecovered] = useState<number | null>(null);
  const [tested, setTested] = useState<number | null>(null);
  const [updated, setUpdated] = useState<string | null>(null);

  const [newCases, setNewCases] = useState<number | null>(null);
  const [newRecovered, setNewRecovered] = useState<number | null>(null);

  const fetchData = () => {
    const url =
      "https://api.apify.com/v2/key-value-stores/KUlj8EGfDGHiB0gU1/records/LATEST?disableRedirect=true";
    const url2 =
      "https://covid19.geo-spatial.org/api/dashboard/getDailyCaseReport";
    // const url2 = "https://covid19.geo-spatial.org/api/dashboard/getDailyCases";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const { infected, deceased, recovered, tested, lastUpdatedAtSource } =
          data;
        setUpdated(lastUpdatedAtSource);
        setInfected(infected);
        setDeceased(deceased);
        setRecovered(recovered);
        setTested(tested);
      })
      .catch((error) => console.log(error));

    fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.data["data"].pop()["Cazuri"]);
        setNewCases(data.data["data"].pop()["new_case_no"]);
        setNewRecovered(data.data["data"].pop()["new_healed_no"]);
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (date: string) => {
    let hour = parseInt(date[12]);
    hour -= 3;
    const arr = date.split("T");

    // manually change the timezone
    return arr[0] + "T" + "1" + hour.toString() + ":00:00.000Z";
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-12">
        <p className=" font-bold text-lg">covid-19 romania</p>
        <div className="grid grid-cols-2 gap-2">
          <Card name="infected" value={infected} newCases={newCases} />
          <Card name="recovered" value={recovered} newCases={newRecovered} />
          <Card name="deceased" value={deceased} />
          <Card name="tested" value={tested} />
        </div>
        {updated !== null ? (
          <p className="">updated {moment(formatDate(updated)).fromNow()}</p>
        ) : (
          <p className="text-opacity-30 ">loading</p>
        )}
      </div>
    </Container>
  );
};

export default Home;
