"use client"
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";

// Dynamic imports
const MapOne = dynamic(() => import("@/components/Maps/MapOne"), { ssr: false });
const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), { ssr: false });

// Fetch data function
const fetchDataDashboard = async () => {
  const response = await fetch("http://127.0.0.1:5000/api/dashboard/getAll");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

// ECommerce Component
const ECommerce: React.FC = () => {
  const [data, setData] = useState<{
    totalViews: number;
    totalCampingPosts: number;
    campingPosts: any[];
    totalUsers: number;
    totalExperiencesTips: number;
  } | null>(null);

  useEffect(() => {
    fetchDataDashboard()
      .then(fetchedData => setData(fetchedData))
      .catch(error => console.error("Error fetching dashboard data:", error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Views" total={data.totalViews}>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
              fill=""
            />
            <path
              d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Camping Posts" total={data.totalCampingPosts}>
          <svg
            className="fill-primary dark:fill-white"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 12h3v8h4v-5h6v5h4v-8h3L12 2zM6 20v-6h3v-4h6v4h3v6h-3v-5H9v5H6z"
              fill="currentColor"
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Experiences Tips" total={data.totalExperiencesTips}>
          <svg
            className="fill-primary dark:fill-white"
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.7375 8.89999L13.7375 1.74999C13.3687 1.38749 12.7437 1.21874 12.3063 1.435 12.0599 1.555 11.8287 1.7775 11.7125 2.07125L8.55994 7.40125L6.86245 9.29999L6.86245 9.29999C6.67188 9.55499 6.71245 9.82374 6.88125 10.0237L6.91875 10.0287C7.1125 10.23 7.375 10.2125 7.54688 10.0863L7.54994 10.0787L9.54875 8.30625L11.6188 5.42125L12.275 6.13625C12.1125 6.32874 12.0306 6.63749 12.0156 6.93749C12.0156 6.93749 12.0188 6.95249 12.0281 6.96562L10.825 9.55625L10.5519 10.3175L10.375 10.4344C10.2375 10.5219 10.0794 10.5499 9.92188 10.6719L9.05994 11.7999L5.70312 15.4187L4.87188 16.3437L5.33438 16.6719L12.5 13.5763C12.9499 13.2806 13.1156 12.755 13.0375 12.2375C13.1188 12.2644 13.2106 12.2437 13.2787 12.1563C13.375 12.0344 13.3794 11.8444 13.2937 11.6787L11.6188 9.55625L12.2156 7.86999L14.4469 5.57187L16.9656 6.23749L20.7375 8.89999Z"
              fill=""
            />
            <path
              d="M13.275 17.2075C12.8012 17.2075 12.4469 17.5619 12.4469 18.0363C12.4469 18.5106 12.8012 18.865 13.275 18.865C13.7487 18.865 14.1031 18.5106 14.1031 18.0363C14.1031 17.5619 13.7487 17.2075 13.275 17.2075Z"
              fill=""
            />
            <path
              d="M19.8531 17.2075C19.3781 17.2075 19.0237 17.5619 19.0237 18.0363C19.0237 18.5106 19.3781 18.865 19.8531 18.865C20.3275 18.865 20.6812 18.5106 20.6812 18.0363C20.6812 17.5619 20.3275 17.2075 19.8531 17.2075Z"
              fill=""
            />
            <path
              d="M20.2625 7.275L20.7469 8.11625C20.7675 8.16062 20.8812 8.30812 20.7469 8.39188C20.7125 8.43437 20.5156 8.60562 20.4856 8.64375L20.4375 8.6875L18.6031 8.80562L14.0156 7.79688L12.8937 7.4625L12.8313 7.48999L10.6844 9.7925L8.185 12.0425L7.715 12.3163L5.26406 14.4706L5.26406 14.4706C5.12656 14.6063 5.085 14.7625 5.16875 14.8875L9.54875 18.2437L14.5594 22.5187L15.625 22.8812L17.6219 22.0463L22.5687 17.7237C22.6375 17.6575 22.5987 17.4575 22.6219 17.4237C22.6375 17.3687 22.7456 17.2537 22.7456 17.2537L23.4906 16.6287L23.4969 16.6237L23.5844 16.5956L20.2625 13.1344L20.2625 13.1344C20.2125 13.0306 20.1437 12.9275 20.1469 12.8387C20.1469 12.8387 20.1687 12.8512 20.175 12.8556L23.2794 11.4781L23.9687 10.8625L21.7856 9.56062L19.7656 8.85062C19.7519 8.82562 19.7769 8.9125 19.7794 8.92312C19.7919 8.92499 19.8356 8.8625 19.8531 8.85062C19.9344 8.82562 20.2219 8.54687 20.2387 8.54687C20.2512 8.53187 20.3175 8.48999 20.2625 8.4375L20.2625 7.275Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Users" total={data.totalUsers}>
          <svg
            className="fill-primary dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z"
              fill="currentColor"
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
      </div>

    </>
  );
};

export default ECommerce;

