"use client";
import React, { useEffect, useState, useRef } from "react";
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
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/dashboard/getEndpointTofetchCampingPostLocations');
        
        // Log the status code and response if not ok
        if (!response.ok) {
          console.error('Response not ok:', response.status, response.statusText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data: CampingPost[] = await response.json();
  
        // Log and validate the data
        console.log('Fetched posts:', data);
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }
  
        setPosts(data);
      } catch (error) {
        // Log the detailed error
        console.error('Error fetching camping posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
 

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only once
      mapRef.current = L.map('mapOne').setView([37.8, -96], 4);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);
    } else {
      // Remove existing markers
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapRef.current?.removeLayer(layer);
        }
      });
    }

    // Add markers for each camping post
    posts.forEach(post => {
      if (post.location.lat !== undefined && post.location.lng !== undefined) {
        L.marker([post.location.lat, post.location.lng])
          .addTo(mapRef.current!)
          .bindPopup(`<b>${post.title}</b><br>From ${post.startDate} to ${post.endDate}`)
          .openPopup();
      } else {
        console.error('Invalid location data:', post.location);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
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



