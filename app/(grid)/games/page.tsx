import Filters from "@/app/components/Filters";
import Heading from "@/app/components/Heading";
import { APIURL, KEY } from "@/app/constants";
import React from "react";

const page = async () => {
  const data = await fetch(`${APIURL}genres?key=${KEY}`).then((res) => res.json());
  // const generes =data.resurce? data.results.slice(0, 15): [];
  const generes = data?.results?.slice(0, 15) || [];
  console.log("Genres data", JSON.stringify(data, null, 2));


  console.log(data);
  return (
    <div className=" mt-10 relative flex flex-col gap-5">
      <Heading text="Games From Genres" />
      <Filters generes={generes} />
    </div>
  );
};

export default page;
