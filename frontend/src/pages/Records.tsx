import SideNav from '../utils/SideNav'
import Footer from '../components/Admin/Footer'
import Header from '../components/Admin/Header'
import Dropdown from '../utils/Dropdown';
// import { demoCertificates } from '../constants';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Certificate {
    _id: string;
    certificateId: string;
    studentName: string;
    rollNo: string;
    fest: string;
    date: string;
    event: string;
    category: string;
}

const Records = () => {
    const categoryOptions = ["All Categories", "Coordinators", "Participants", "Volunteers", "Winners"];
    const sortOptions = ["Relevant Order", "Alphabetical Names", "Certificate Id", "Roll no.", "Oldest first"]

    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const menu = useSelector((state: RootState) => state.menu.isOpen)

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this certificate?")) return;
        try {
            const token = localStorage.getItem("token"); // if protected
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/certificate/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setCertificates(prev => prev.filter(cert => cert._id !== id));
            } else {
                toast.error(res.data.message || "Failed to delete certificate");
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "Server error occurred!";
            toast.error(message);
            console.log("Delete certificate error:", error);
        }
    };

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const res = await axios.get<{ success: boolean; certificates: Certificate[] }>(
                    `${import.meta.env.VITE_BACKEND_URL}/certificate/views`
                );
                if (res.data.success) {
                    setCertificates(res.data.certificates);
                } else {
                    toast.error("Failed to fetch certificates");
                }
            } catch (err: any) {
                setError(err.response);
                console.log(err)
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    return (
        <div className="w-full h-full flex">
            <SideNav />
            <div className={`flex flex-col transition-all duration-300 ${!menu ? 'w-[80vw]' : 'w-[95vw]'}`}>
                <Header />
                <div className='h-[83vh] py-5 px-10 bg-[#f3f3f3]'>
                    <h1 className='text-3xl font-semibold mb-5'>Records</h1>

                    {/* Search Component */}
                    <div className="w-full flex justify-between gap-3 mb-5">
                        <div className='flex'>
                            <div className="h-12 w-auto border border-[#d9d9d9] bg-white rounded px-5 flex justify-start items-center">
                                <label className="mr-3">Certificate Id</label>
                                <input
                                    className={`w-80 border border-[#d9d9d9] px-3 ml-3`} placeholder="CERT-XXXXX" />
                            </div>
                            <button className="ml-3 rounded-sm w-auto border px-6 bg-white hover:bg-[#f8f9fa] border-[#d9d9d9] cursor-pointer" type="submit">Search</button>
                        </div>
                        <div className="w-auto flex justify-between">
                            <Dropdown categories={categoryOptions} />
                            <Dropdown categories={sortOptions} />
                        </div>
                    </div>

                    {/* Table */}
                    <div className='w-full h-auto max-h-[60vh] overflow-scroll rounded border border-[#d9d9d9]'>
                        <table className="h-auto w-full text-center bg-white">
                            <thead className="font-semibold sticky top-0">
                                <tr className="h-12 bg-white overflow-x-scroll">
                                    <td className="w-[13%]">Certificate Id</td>
                                    <td className="w-[13%]">Student Name</td>
                                    <td className="w-[13%]">Roll no</td>
                                    <td className='w-[12%]'>Fest</td>
                                    <td className="w-[10%]">Date</td>
                                    <td className='w-[10%]'>Event</td>
                                    <td className="w-[12%]">Category</td>
                                    <td className='w-[12%]'>Options</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {demoCertificates.map((item, index) => (
                                    <tr key={index} className='bg-[#f8f9fa] border-y border-[#d9d9d9] h-16'>
                                        <td>{item['Certificate Id']}</td>
                                        <td>{item['Student Name']}</td>
                                        <td>{item['Roll no']}</td>
                                        <td>{item.Fest}</td>
                                        <td>{item.Year}</td>
                                        <td></td>
                                        <td>{item.Category}</td>
                                        <td>
                                            <button className='border px-2 py-1 cursor-not-allowed border-[#d9d9d9] transition-all duration-300 hover:text-white hover:border-emerald-600 hover:bg-emerald-400 rounded mr-1'>Edit</button>
                                            <button className='border px-2 py-1 cursor-pointer border-[#d9d9d9] transition-all duration-300 hover:text-white hover:border-red-400 hover:bg-red-300 rounded ml-1'>Delete</button>
                                        </td>
                                    </tr>
                                ))} */}
                                {certificates.map(cert => (
                                    <>
                                        {loading
                                            ? 'Loading...'
                                            : <>
                                                {error
                                                    ? "Server error occured"
                                                    : <tr key={cert._id}>
                                                        <td className="border-y border-[#d9d9d9] px-4 py-2">{cert.certificateId}</td>
                                                        <td className="border-y border-[#d9d9d9] px-4 py-2">{cert.studentName}</td>
                                                        <td className="border-y border-[#d9d9d9] px-4 py-2">{cert.rollNo}</td>
                                                        <td className="border-y border-[#d9d9d9] px-4 py-2">{cert.fest}</td>
                                                        <td className="border-y border-[#d9d9d9] px-4 py-2">{new Date(cert.date).toLocaleDateString("en-GB")}</td>
                                                        <td className="border-y border-[#d9d9d9] px-4 py-2">{cert.event}</td>
                                                        <td className="border-y border-[#d9d9d9] px-4 py-2">{cert.category}</td>
                                                        <td className='border-y border-[#d9d9d9]'>
                                                            <button className='border px-2 py-1 cursor-not-allowed border-[#d9d9d9] transition-all duration-300 hover:text-white hover:border-emerald-600 hover:bg-emerald-400 rounded mr-1'>Edit</button>
                                                            <button onClick={() => handleDelete(cert._id)} className='border px-2 py-1 cursor-pointer border-[#d9d9d9] transition-all duration-300 hover:text-white hover:border-red-400 hover:bg-red-300 rounded ml-1'>Delete</button>
                                                        </td>
                                                    </tr>
                                                }
                                            </>
                                        }
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    )
}

export default Records