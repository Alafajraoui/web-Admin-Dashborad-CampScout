"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const ChartOne: React.FC = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/dashboard/getchartOne');
        const data = await response.json();

        const newSeries = [{
          name: 'Daily Registrations',
          data: data.dailyRegistrations.map((item: { count: number }) => item.count),
        }];
        const newCategories = data.dailyRegistrations.map((item: { day: string }) => item.day);

        setSeries(newSeries);
        setCategories(newCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      id: 'chartOne',
    },
    xaxis: {
      categories,
      title: {
        text: 'Days',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Users',
      },
    },
    title: {
      text: 'Daily User Registrations',
      align: 'left',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        {/* Your existing content */}
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;



