'use client';
import { useEffect, useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

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

interface Comment {
  id: number;
  content: string;
  experienceId: number;
  userId: number;
  user: User;
}

interface Like {
  id: number;
  experienceId: number;
  userId: number;
  user: User;
}

interface Share {
  id: number;
  experienceId: number;
  userId: number;
  user: User;
}

interface Experience {
  id: number;
  title: string;
  content: string;
  imagesUrl: string[];
  location: string;
  category: 'Experiences' | 'Tips';
  filterCategory: 'ShelterAndSleeping' | 'CookingAndEating' | 'ClothingAndFootwear' | 'NavigationAndSafety' | 'PersonalItemsAndComfort' | 'Miscellaneous' | 'OptionalButUseful';
  likeCounter: number;
  shareCounter: number;
  userId: number;
  createdAt: string;
  user: User;
  comments: Comment[];
  likes: Like[];
  shares: Share[];
}

export default function OneExperiencesDetails({ params }: { params: { slug: string } }) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/experienceTip/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch experience');
        }
        const result = await response.json();
        setExperience(result); // Extract data from API response
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [params.slug]);

  const deleteExperience = async () => {
    if (!experience) return;
    try {
      await fetch(`http://127.0.0.1:5000/api/experienceTip/${experience.id}`, {
        method: 'DELETE',
      });
      // Redirect or update UI after deletion
      alert('Experience deleted successfully.');
    } catch (error: any) {
      console.error('Error deleting experience:', error);
      alert('Failed to delete experience.');
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/comment/${commentId}`, {
        method: 'DELETE',
      });
      // Remove the comment from state or refetch the experience
      setExperience((prevExperience) => {
        if (!prevExperience) return null;
        return {
          ...prevExperience,
          comments: prevExperience.comments.filter(comment => comment.id !== commentId),
        };
      });
      alert('Comment deleted successfully.');
    } catch (error: any) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment.');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>;
  if (!experience) return <div className="text-center p-4">No experience found</div>;

  const { title, content, imagesUrl, location, category, filterCategory, likeCounter, shareCounter, user, comments, likes, shares } = experience;

  return (
    <div className="container mx-auto p-4">
      <DefaultLayout>
        <Breadcrumb pageName="ExperienceDetails" />
        <div className="bg-white shadow-md rounded-lg p-6">
        {imagesUrl.length > 0 && (
            <div className="mt-6">
              {imagesUrl.map((image, index) => (
                <img key={index} src={image} alt={`Experience image ${index + 1}`} className="w-[200px] h-[150px] object-cover mb-4 rounded-md shadow-md" />
              ))}
            </div>
          )}
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-2"><strong>Content:</strong> {content}</p>
          <p className="text-lg mb-2"><strong>Location:</strong> {location}</p>
          <p className="text-lg mb-2"><strong>Category:</strong> {category}</p>
          <p className="text-lg mb-2"><strong>Filter Category:</strong> {filterCategory}</p>
          <p className="text-lg mb-2"><strong>Likes:</strong> {likes.length}</p>
          <p className="text-lg mb-2"><strong>Shares:</strong> {shares.length}</p>
          <p className="text-lg mb-2"><strong>Comments:</strong> {comments.length}</p>

          <button
            onClick={deleteExperience}
            className=" px-4 py-2 bg-[#b71c1c] text-white rounded hover:bg-[#c62828] rounded mt-2"
          >
            Delete Experience
          </button>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Creator Details</h2>
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

          <h2 className="text-2xl font-semibold mt-6 mb-4">Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-md mb-4 shadow-sm">
                <p><strong>Comment:</strong> {comment.content}</p>
                <p><strong>By:</strong> {comment.user.name}</p>
                <p><strong>Email:</strong> {comment.user.email}</p>
                <p><strong>Phone:</strong> {comment.user.phoneNumber}</p>
                <p><strong>Address:</strong> {comment.user.address}</p>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="px-4 py-2 bg-[#b71c1c] text-white rounded hover:bg-[#c62828]  rounded mt-2"
                >
                  Delete Comment
                </button>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <h2 className="text-2xl font-semibold mt-6 mb-4">Likes</h2>
          {likes.length > 0 ? (
            likes.map((like) => (
              <div key={like.id} className="bg-gray-100 p-4 rounded-md mb-4 shadow-sm">
                <p><strong>Liked by:</strong> {like.user.name}</p>
                <p><strong>Email:</strong> {like.user.email}</p>
              </div>
            ))
          ) : (
            <p>No likes yet.</p>
          )}

          <h2 className="text-2xl font-semibold mt-6 mb-4">Shares</h2>
          {shares.length > 0 ? (
            shares.map((share) => (
              <div key={share.id} className="bg-gray-100 p-4 rounded-md mb-4 shadow-sm">
                <p><strong>Shared by:</strong> {share.user.name}</p>
                <p><strong>Email:</strong> {share.user.email}</p>
              </div>
            ))
          ) : (
            <p>No shares yet.</p>
          )}

        </div>
      </DefaultLayout>
    </div>
  );
}
