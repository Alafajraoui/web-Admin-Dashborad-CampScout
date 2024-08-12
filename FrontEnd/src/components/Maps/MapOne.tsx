"use client";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// TypeScript interface for your CampingPost
interface CampingPost {
  id: number;
  title: string;
  location: {
    lat: number;
    lng: number;
  };
  startDate: string;
  endDate: string;
}

const MapOne: React.FC = () => {
  const [posts, setPosts] = useState<CampingPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/camping-posts');
        //http://127.0.0.1:5000/api/dashboard/getEndpointTofetchCampingPostLocations
        const data: CampingPost[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching camping posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map('mapOne').setView([37.8, -96], 4); // Set initial center and zoom

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add markers for each camping post
    posts.forEach(post => {
      L.marker([post.location.lat, post.location.lng])
        .addTo(map)
        .bindPopup(`<b>${post.title}</b><br>From ${post.startDate} to ${post.endDate}`)
        .openPopup();
    });

    return () => {
      // Cleanup function if needed
      map.remove();
    };
  }, [posts]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Camping Posts Map
      </h4>
      <div className="h-90">
        <div id="mapOne" style={{ height: '100%' }}></div>
      </div>
    </div>
  );
};

export default MapOne;


