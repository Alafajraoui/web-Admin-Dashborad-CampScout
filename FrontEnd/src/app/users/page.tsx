'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    gender: string;
    imagesProfile: string[];
    phoneNumber: string;
    address: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>({
        id: "",
        name: "",
        email: "",
        role: "",
        imagesProfile: [],
        gender: "",
        phoneNumber: "",
        address: ""
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [refetch, setRefetch] = useState(false);
    const [noAccess, setNoAccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/api/users/get', { cache: 'no-store' });
                const data = await res.json();
                setUsers(data.data); // Access the `data` property
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [refetch]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if (token && isAuthenticated) {
            const decodedToken: any = jwtDecode(token);
            setUser(decodedToken); // Set the user data based on decoded token

            if (decodedToken.role !== "admin") {
                setNoAccess(true); // User does not have access
            }
        } else {
            router.push('/auth/signin'); // Redirect to sign-in if not authenticated
        }
    }, [router]);

    const handleDelete = async () => {
        if (userToDelete) {
            try {
                await axios.delete(`http://127.0.0.1:5000/api/users/${userToDelete}`);
                console.log('User deleted successfully');
                setRefetch(!refetch);
            } catch (error) {
                console.log('Error deleting user:', error);
            } finally {
                setModalVisible(false);
                setUserToDelete(null);
            }
        }
    };

    if (noAccess) {
        return <div className="text-center p-4 text-red-500">No Access</div>; // Show no access message
    }

    if (loading) {
        return <div className="text-center p-4">Loading...</div>; // Show a loading state while fetching data
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Users" />
            <div className="flex flex-col gap-10 p-6">
                <div className="rounded-lg border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-md dark:border-strokedark dark:bg-boxdark">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-left dark:bg-gray-800">
                                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                        Name
                                    </th>
                                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                        Email
                                    </th>
                                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                                        Phone Number
                                    </th>
                                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        Gender
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-5 flex items-center space-x-3">
                                            {user.imagesProfile.length > 0 && (
                                                <Image
                                                    src={user.imagesProfile[0]}
                                                    alt={user.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full"
                                                />
                                            )}
                                            <div>
                                                <h5 className="font-medium text-black dark:text-white">
                                                    {user.name}
                                                </h5>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-black dark:text-white">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-5 text-black dark:text-white">
                                            {user.phoneNumber}
                                        </td>
                                        <td className="px-4 py-5">
                                            <p
                                                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${user.gender === "Male"
                                                    ? "bg-green-100 text-green-800"
                                                    : user.gender === "Female"
                                                        ? "bg-pink-100 text-pink-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {user.gender}
                                            </p>
                                        </td>
                                        <td className="px-4 py-5">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => {
                                                    setUserToDelete(user.id);
                                                    setModalVisible(true);
                                                }}
                                            >
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-4">Are you sure you want to delete this user?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                onClick={() => setModalVisible(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2  bg-[#b71c1c] text-white rounded hover:bg-[#c62828]"
                                onClick={() => {
                                    if (userToDelete) {
                                        handleDelete(userToDelete);
                                        setModalVisible(false);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DefaultLayout>
    );
};

export default Users;




