import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from 'next/link';
import { FaMapMarkerAlt, FaTag, FaHeart, FaShareAlt, FaCommentAlt } from 'react-icons/fa'; // Import icons

export const metadata: Metadata = {
    title: "ExperiencesTips",
    description: "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};



interface User {
    id: number;
    email: string;
    password: string; // In a real application, avoid exposing passwords
    name: string;
    address: string;
    interests: string[];
    imagesProfile: string[];
    gender: "Men" | "Women"; // or "Other" if needed
    bio: string;
    phoneNumber: string;
    dateOfBirth: string; // Date string or Date object depending on your use case
    createdAt: string; // Date string or Date object
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
    category: string;
    filterCategory: string;
    likeCounter: number;
    shareCounter: number;
    userId: number;
    createdAt: string; // Date string or Date object
    user: User; // This should be included to get the creator's info
    comments: Comment[];
    likes: Like[];
    shares: Share[];
}



const ExperiencesTips = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/experienceTip/all/get', { cache: 'no-store' });
    const data = await res.json();
    const experiences: Experience[] = data;
    

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Experiences" />
            <div className="flex flex-col gap-8 p-4 sm:p-8">
                <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
                    <div className="p-6">
                        <h4 className="mb-6 text-2xl font-bold text-black dark:text-white">
                            Experiences
                        </h4>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {experiences.map((experience) => (
                                <div
                                    className={`flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm ${experiences.indexOf(experience) === experiences.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
                                    key={experience.id}
                                >
                                    <div className="relative flex-shrink-0">
                                        {experience.imagesUrl.length > 0 && (
                                            <Image
                                                src={experience.imagesUrl[0]}
                                                alt={experience.title}
                                                width={500}
                                                height={300}
                                                className="w-full h-48 object-cover"
                                            />
                                        )}
                                        <Link
                                            href={`/experiencesTips/${experience.id}`}
                                            className="absolute bottom-2 right-2 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                                        >
                                            More Details
                                        </Link>
                                    </div>
                                    <div className="p-4 flex flex-col gap-2">
                                        <h5 className="text-lg font-semibold text-black dark:text-white">
                                        {truncateText(experience.title, 13)}
                                        </h5>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {truncateText(experience.content, 20)} {/* Adjust length as needed */}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                                            <div className="flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-gray-600 dark:text-gray-300" />
                                                <span>{experience.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaTag className="text-gray-600 dark:text-gray-300" />
                                                <span>{experience.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                <FaHeart />
                                                <span>{experience.likes.length}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                <FaShareAlt />
                                                <span>{experience.shares.length}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                <FaCommentAlt />
                                                <span>{experience.comments.length}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-4">
                                            {experience.user.imagesProfile.length > 0 && (
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                                                    <Image
                                                        src={experience.user.imagesProfile[0]}
                                                        alt={experience.user.name}
                                                        width={40}
                                                        height={40}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <span className="text-sm text-gray-700 dark:text-gray-200">
                                                {experience.user.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

export default ExperiencesTips;

