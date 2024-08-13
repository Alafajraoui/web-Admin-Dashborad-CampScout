import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from 'next/link'
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
            <Breadcrumb pageName="ExperiencesTips" />
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Experiences Tips
                </h4>
                <div className="flex flex-col">
                    <div className="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Image
                            </h5>
                        </div>
                        <div className="p-2.5 xl:p-5 text-center">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Title
                            </h5>
                        </div>
                        <div className="p-2.5 xl:p-5 text-center">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Location
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Category
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Likes
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Shares
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Comments
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Organizer
                            </h5>
                        </div>
                    </div>

                    {experiences.map((experience) => (
                        <div
                            className={`grid grid-cols-8 ${
                                experiences.indexOf(experience) === experiences.length - 1
                                    ? ""
                                    : "border-b border-stroke dark:border-strokedark"
                            }`}
                            key={experience.id}
                        >
                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                {experience.imagesUrl.length > 0 && (
                                    <Image
                                        src={experience.imagesUrl[0]}
                                        alt={experience.title}
                                        width={100}
                                        height={100}
                                        className="object-cover"
                                    />
                                )}
                               <Link 
                                    href={`/experiencesTips/${experience.id}`} 
                                    className="ml-4"
                                >
                                    More Details
                                </Link>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">{experience.title}</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">{experience.location}</p>
                            </div>

                            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">{experience.category}</p>
                            </div>

                            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-meta-5">{experience.likes.length}</p>
                            </div>

                            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-meta-5">{experience.shares.length}</p>
                            </div>

                            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-meta-5">{experience.comments.length}</p>
                            </div>

                            <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">{experience.user.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ExperiencesTips;
