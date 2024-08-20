"use client";
import React, { useEffect, useState } from "react"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import dynamic from "next/dynamic";
import { getCategories } from "@/API/productAPI";

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const Chart: React.FC = () => {
  // const [categories, setCategories] = useState<any[]>([]);
  
  //   useEffect(() => {
  //     fetchCategories();
  //   }, []);
  //   // Fetch Categories
  //   const fetchCategories = async () => {
  //     try {
  //       const data = await getCategories();
  //       setCategories(data.list);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {/* <ChartOne /> */}
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;