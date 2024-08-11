'use client'
// Calendar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Calendar = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/camps/getAll');
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Example function to render posts on specific dates
  const renderEvent = (date) => {
    const post = posts.find(p => new Date(p.startDate).getDate() === date);
    return post ? (
      <div className="event-details">
        <span>{post.title}</span>
        <span>{new Date(post.startDate).toLocaleDateString()} - {new Date(post.endDate).toLocaleDateString()}</span>
      </div>
    ) : null;
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {/* Header Cells */}
            </tr>
          </thead>
          <tbody>
            {/* Render Calendar Days Dynamically */}
            {[...Array(5)].map((_, row) => (
              <tr key={row} className="grid grid-cols-7">
                {[...Array(7)].map((_, col) => {
                  const date = row * 7 + col + 1;
                  return (
                    <td key={col} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                      <span className="font-medium text-black dark:text-white">{date}</span>
                      {renderEvent(date)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
