import type { NextPage } from "next";
import { useEffect, useState } from "react";
import moment from "moment";
import { Card } from "components/Card";
import Container from "components/Container";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const { data, error } = useSWR(
    mounted
      ? "https://covid19.geo-spatial.org/api/dashboard/getDailyCases"
      : null,
    fetcher
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (error) return <Container>error</Container>;
  if (!data) return <Container>No data could be fetched, try again</Container>;
  const newData = data.data["data"].pop();

  const newCases = newData["Cazuri"];
  const newDeaths = newData["Morti pe zi"];
  const newRecovered = newData["Vindecati pe zi"];
  const newTests = newData["Nr de teste pe zi"];

  const allCases = newData["Total"];
  const allDeaths = newData["Morti"];
  const allRecovered = newData["Vindecati"];
  const allTest = newData["Nr de teste"];

  const ATI = newData["Terapie intensiva"];

  const date = newData["Data"]; // yyyy-mm-dd

  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-12">
        <p className=" font-bold text-lg">covid-19 romania</p>
        <div className="grid grid-cols-2 gap-2">
          <Card name="infected" value={allCases} newCases={newCases} />
          <Card name="recovered" value={allRecovered} newCases={newRecovered} />
          <Card name="deceased" value={allDeaths} newCases={newDeaths} />
          <Card name="tested" value={allTest} newCases={newTests} />
          <Card name="intensive care units" value={ATI} />
        </div>
        <p className="">updated in {date}</p>
      </div>
    </Container>
  );
};

export default Home;
