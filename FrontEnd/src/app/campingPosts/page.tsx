import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from 'next/link';
import { FaMapMarkerAlt, FaTag } from 'react-icons/fa'; // Import icons

export const metadata: Metadata = {
    title: "Camping Post",
    description:
        "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

interface CampingPost {
    id: number,
    title: string,
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
    equipment: string[],
    places: number,
    ageCategory: string,
    images: string[],  // Array of image URLs
    organizerId: number,
    category: string,
    status: string,
    user: {
        id: number,
        email: string,
        name: string,
        address: string,
        interests: string[],
        imagesProfile: string[], // Profile images
        gender: string,
        bio: string,
        phoneNumber: string,
        dateOfBirth: Date,
        createdAt: Date
    },
    joinCampingPosts: []
}

const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

const CampingPostsPage = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/camps/getAll', { cache: 'no-store' });
    const data = await res.json();
    const camps: CampingPost[] = data.data; // Access the `data` property
    console.log('Camps', camps);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Camping Posts" />
            <div className="flex flex-col gap-8 p-4 sm:p-8">
                <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark">
                    <div className="p-6">
                        <h4 className="mb-4 text-2xl font-bold text-black dark:text-white">
                            Top Camping Posts
                        </h4>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {camps.map((camp, key) => (
                                <div
                                    className={`flex flex-col bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md ${key === camps.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
                                    key={key}
                                >
                                    <div className="relative">
                                        {camp.images.length > 0 && (
                                            <Image 
                                                src={camp.images[0]} 
                                                alt={camp.title} 
                                                width={500} 
                                                height={300} 
                                                className="w-full h-48 object-cover" 
                                            />
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col gap-3">
                                        <h5 className="text-xl font-semibold text-black dark:text-white">
                                        {truncateText(camp.title, 14)}
                                        </h5>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {truncateText(camp.description, 20)} {/* Adjust length as needed */}
                                        </p>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-gray-600 dark:text-gray-300" />
                                                <span>{camp.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaTag className="text-gray-600 dark:text-gray-300" />
                                                <span>{camp.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mt-4">
                                            {camp.user.imagesProfile.length > 0 && (
                                                <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">
                                                    <Image 
                                                        src={camp.user.imagesProfile[0]} 
                                                        alt={camp.user.name} 
                                                        width={48} 
                                                        height={48} 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                </div>
                                            )}
                                            <span className="text-sm text-gray-700 dark:text-gray-200">
                                                {camp.user.name}
                                            </span>
                                        </div>
                                        <Link
                                            href={`campingPosts/${camp.id}`}
                                            className="inline-flex items-center justify-center mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                                        >
                                            More Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CampingPostsPage;



