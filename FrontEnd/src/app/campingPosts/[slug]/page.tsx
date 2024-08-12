interface User {
    id: number;
    email: string;
    password: string;
    name: string;
    address: string;
    interests: string[];
    imagesProfile: string[];
    gender: 'Male' | 'Female';
    bio: string;
    phoneNumber: string;
    dateOfBirth: string;
    createdAt: string;
}

interface JoinCampingPost {
    userId: number;
    postId: number;
    rating: number;
    reviews: string;
    favorite: string;
    notification: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    user: User;
}

interface CampingPost {
    id: number;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    equipment: string[];
    places: number;
    ageCategory: 'ADULT' | 'TEEN' | 'KIDS';
    images: string[];
    organizerId: number;
    category: 'Hiking' | 'Kayaking' | 'Fishing' | 'Climbing' | 'Hitchhiking';
    status: 'PENDING' | 'InProgress' | 'Completed' | 'Canceled' | 'Delegated';
    user: User;
    joinCampingPosts: JoinCampingPost[];
}

interface ApiResponse {
    status: number;
    data: CampingPost;
}

'use client';
import { useEffect, useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function OnePostCamping({ params }: { params: { slug: string } }) {
  const [campingPost, setCampingPost] = useState<CampingPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampingPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/camps/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch camping post');
        }
        const result: ApiResponse = await response.json();
        setCampingPost(result.data); // Extract data from API response
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampingPost();
  }, [params.slug]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  if (!campingPost) return <div className="text-center p-4">No post found</div>;

  const { title, description, location, startDate, endDate, equipment, places, ageCategory, images, category, status, user, joinCampingPosts } = campingPost;

  return (
    <div className="container mx-auto p-4">
      <DefaultLayout>
        <Breadcrumb pageName="CampingPostDetails" />
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-2"><strong>Description:</strong> {description}</p>
          <p className="text-lg mb-2"><strong>Location:</strong> {location}</p>
          <p className="text-lg mb-2"><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
          <p className="text-lg mb-2"><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
          <p className="text-lg mb-2"><strong>Equipment:</strong> {equipment.length > 0 ? equipment.join(', ') : 'No equipment listed'}</p>
          <p className="text-lg mb-2"><strong>Places:</strong> {places}</p>
          <p className="text-lg mb-2"><strong>Age Category:</strong> {ageCategory}</p>
          <p className="text-lg mb-2"><strong>Status:</strong> {status}</p>
          <p className="text-lg mb-2"><strong>Category:</strong> {category}</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Organizer Details</h2>
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
            <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Profile Images:</strong> {user.imagesProfile.length > 0 ? user.imagesProfile.join(', ') : 'No images'}</p>
          </div>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Joined Users</h2>
          {joinCampingPosts.length > 0 ? (
            joinCampingPosts.map((join, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-md mb-4 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">User ID: {join.userId}</h3>
                <p><strong>Rating:</strong> {join.rating}</p>
                <p><strong>Reviews:</strong> {join.reviews}</p>
                <p><strong>Favorite:</strong> {join.favorite}</p>
                <p><strong>Notification:</strong> {join.notification}</p>
                <p><strong>Status:</strong> {join.status}</p>
                <h4 className="text-lg font-semibold mt-4 mb-2">User Details</h4>
                <p><strong>Name:</strong> {join.user.name}</p>
                <p><strong>Email:</strong> {join.user.email}</p>
                <p><strong>Phone:</strong> {join.user.phoneNumber}</p>
                <p><strong>Address:</strong> {join.user.address}</p>
                <p><strong>Interests:</strong> {join.user.interests.join(', ')}</p>
              </div>
            ))
          ) : (
            <p>No users have joined this camping post yet.</p>
          )}

          {images.length > 0 && (
            <div className="mt-6">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Camping post image ${index + 1}`} className="w-full h-auto mb-4 rounded-md shadow-md" />
              ))}
            </div>
          )}
        </div>
      </DefaultLayout>
    </div>
  );
}





