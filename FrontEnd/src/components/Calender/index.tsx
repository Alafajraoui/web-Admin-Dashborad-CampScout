'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const Calendar = () => {
  const [posts, setPosts] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const renderEvent = (date) => {
    const post = posts.find(p => {
      const startDate = new Date(p.startDate);
      return startDate.getDate() === date;
    });
    return post ? (
      <div className="text-xs text-gray-700 dark:text-gray-300 overflow-hidden">
        <span className="block truncate font-medium">{post.title}</span>
        <span className="block truncate">
          {new Date(post.startDate).toLocaleDateString()} - {new Date(post.endDate).toLocaleDateString()}
        </span>
      </div>
    ) : null;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full table-fixed">
          <thead>
            <tr className="grid grid-cols-7 bg-primary text-white">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <th key={idx} className="p-2 text-center truncate">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(Math.ceil((daysInMonth + startDay) / 7))].map((_, row) => (
              <tr key={row} className="grid grid-cols-7">
                {[...Array(7)].map((_, col) => {
                  const date = row * 7 + col - startDay + 1;
                  return (
                    <td key={col} className="relative border border-stroke p-2 h-20 overflow-hidden">
                      {date > 0 && date <= daysInMonth ? (
                        <>
                          <span className="font-medium text-black dark:text-white block truncate text-center">{date}</span>
                          {renderEvent(date)}
                        </>
                      ) : (
                        <span className="block text-center">&nbsp;</span>
                      )}
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

