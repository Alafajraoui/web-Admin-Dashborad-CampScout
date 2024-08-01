import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

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
        imagesProfile: string[],
        gender: string,
        bio: string,
        phoneNumber: string,
        dateOfBirth: Date,
        createdAt: Date
    },
    joinCampingPosts: []
}

const CampingPostsPage = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/camps/getAll', { cache: 'no-store' });
    const data = await res.json();
    const camps: CampingPost[] = data.data; // Access the `data` property
    console.log('Camps', camps);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="CampingPosts" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        Top Lists
                    </h4>

                    <div className="flex flex-col">
                        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                            <div className="p-2.5 xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Title
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Location
                                </h5>
                            </div>
                            <div className="p-2.5 text-center xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Category
                                </h5>
                            </div>
                            <div className="hidden p-2.5 text-center sm:block xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Organizer Name
                                </h5>
                            </div>
                            <div className="hidden p-2.5 text-center sm:block xl:p-5">
                                <h5 className="text-sm font-medium uppercase xsm:text-base">
                                    Status
                                </h5>
                            </div>
                        </div>

                        {camps.map((camp, key) => (
                            <div
                                className={`grid grid-cols-3 sm:grid-cols-5 ${key === camps.length - 1
                                    ? ""
                                    : "border-b border-stroke dark:border-strokedark"
                                    }`}
                                key={key}
                            >
                                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                                    <div className="flex-shrink-0">
                                        {/* Check if there are images available */}
                                        {camp.images.length > 0 && (
                                            <Image 
                                                src={camp.images[0]} 
                                                alt={camp.title} 
                                                width={48} 
                                                height={48} 
                                            />
                                        )}
                                    </div>
                                    <p className="hidden text-black dark:text-white sm:block">
                                        {camp.title}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-black dark:text-white">{camp.location}</p>
                                </div>

                                <div className="flex items-center justify-center p-2.5 xl:p-5">
                                    <p className="text-meta-3">{camp.category}</p>
                                </div>

                                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                    <p className="text-black dark:text-white">{camp.user.name}</p>
                                </div>

                                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${camp.status === "Men"
                                            ? "bg-success text-success"
                                            : camp.status === "Completed"
                                                ? "bg-danger text-danger"
                                                : "bg-warning text-warning"
                                            }`}
                                    >
                                        {camp.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CampingPostsPage;

