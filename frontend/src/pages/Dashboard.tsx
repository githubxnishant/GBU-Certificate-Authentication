import { useDispatch, useSelector } from "react-redux"
import Footer from "../components/Admin/Footer"
import Header from "../components/Admin/Header"
import SideNav from "../utils/SideNav"
import type { RootState } from "../store/store"
import { useEffect, useState } from "react"
import axios from "axios"
import { clearAdmin, setAdmin, setAdminCount } from '../store/adminSlice'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import DesktopOnly from "../utils/DesktopView"

interface FormData {
    certificateId: string;
    studentName: string;
    fest: string;
    date: Date;
    category: string;
    rollNo: string;
    event: string;
}

const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [websiteVisits, setWebsiteVisits] = useState(0);
    const [certificateCount, setCertificateCount] = useState(0);
    const [form, setForm] = useState<FormData>({
        certificateId: "",
        studentName: "",
        rollNo: "",
        fest: "",
        date: new Date(),
        event: "",
        category: ""
    });


    const categories = ["Coordinators", "Participants", "Volunteers"];
    const fests = ["Abhivyanjana", "Shauryautsav", "TechFest"];

    const menu = useSelector((state: RootState) => state.menu.isOpen)
    const admin = useSelector((state: RootState) => state.admin.user);
    const count = useSelector((state: RootState) => state.verify.count);
    const totalAdmins = useSelector((state: RootState) => state.admin.adminCount);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/certificate/create`,
                form
            );

            if (res.data.success) {
                toast.success("Certificate created successfully!");
                setForm({
                    certificateId: "",
                    studentName: "",
                    rollNo: "",
                    fest: "",
                    date: new Date(),
                    event: "",
                    category: ""
                });
            } else {
                toast.error(res.data.message || "Failed to create certificate.");
            }
        } catch (error: any) {
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || "Server error occurred!";

                if (status === 409) {
                    toast.error("Certificate already exists!");
                    console.log("Certificate already exists:", error.response.data);
                } else if (status === 400) {
                    toast.error(message);
                    console.log("Validation error:", error.response.data);
                } else {
                    toast.error(message);
                    console.log("Server error:", error.response.data);
                }
            } else {
                toast.error("Network error or server unreachable!");
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const path = window.location.pathname;
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stats`)
                const visits = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/visits`, {
                    params: { path },
                });
                const views = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/certificate/views`)
                if (!res) {
                    return toast.error('Data fetch failed!');
                }
                // setAdminCount(res.data.totalAdmins)
                setWebsiteVisits(visits.data.visits)
                setCertificateCount(views.data.certificatesIssued)
                dispatch(setAdminCount(res.data.totalAdmins))
            } catch (error) {
                console.log('Error fetching stat data - frontend', error);
                toast.error('Error fetching Stat Cards data!')
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch(err => {
                console.error("Access denied", err);
            });
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/verify`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                dispatch(setAdmin(res.data.user));
                const expiry = 60 * 60 * 1000;
                setTimeout(() => {
                    dispatch(clearAdmin());
                    localStorage.removeItem('token');
                    toast.info('Session expired, please login again!')
                    navigate('/login')
                }, expiry);
            })
            .catch(err => {
                console.error("Failed to fetch user", err);
            });
    }, [dispatch]);

    return (
        <DesktopOnly>
            <div className="w-full h-full flex">
                <SideNav />
                <div className={`flex flex-col transition-all duration-300 ${!menu ? 'w-[80vw]' : 'w-[95vw]'}`}>
                    <Header />
                    <div className="h-[83vh] w-full flex justify-center px-10 py-5 items-center bg-[#f3f3f3]">
                        <div className="w-[70%] h-full">
                            <p className="text-2xl">Welcome back!</p>
                            <p className="text-3xl font-semibold my-1">{admin?.name}</p>
                            <p className="text-xl font-light">{admin?.username}</p>
                            <div className="mt-5 h-auto rounded max-h-[58vh] w-full border border-[#d9d9d9] bg-white py-5 px-5">
                                <div className="flex">
                                    <button className="px-3 py-1 border border-[#d9d9d9] rounded mr-3 cursor-pointer">Add Card</button>
                                    <button className="px-3 py-1 border border-[#d9d9d9] bg-[#f3f3f3] rounded mr-3 cursor-not-allowed">Edit Card</button>
                                    <button className="px-3 py-1 border border-[#d9d9d9] bg-[#f3f3f3] rounded mr-3 cursor-not-allowed">Delete Card</button>
                                </div>
                                <div className="w-full h-auto border border-[#d9d9d9] rounded my-5">
                                    <form
                                        onSubmit={handleSubmit}
                                        className="bg-white p-6 rounded-lg max-w-3xl mx-auto"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Student Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Student Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="studentName"
                                                    value={form.studentName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            {/* Roll no */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Roll no
                                                </label>
                                                <input
                                                    type="text"
                                                    name="rollNo"
                                                    value={form.rollNo}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            {/* Certificate Id */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Certificate Id
                                                </label>
                                                <input
                                                    type="text"
                                                    name="certificateId"
                                                    value={form.certificateId}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                            {/* Event */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Event
                                                </label>
                                                <input
                                                    type="text"
                                                    name="event"
                                                    value={form.event}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                            {/* Fest */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Fest
                                                </label>
                                                <select
                                                    name="fest"
                                                    value={form.fest}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Select Fest</option>
                                                    {fests.map((fest) => (
                                                        <option key={fest} value={fest}>
                                                            {fest}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Category */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Category
                                                </label>
                                                <select
                                                    name="category"
                                                    value={form.category}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Select Category</option>
                                                    {categories.map((cat) => (
                                                        <option key={cat} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Date */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={
                                                        form.date instanceof Date
                                                            ? form.date.toISOString().split("T")[0]
                                                            : form.date
                                                    }
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex justify-end mt-6 gap-3">
                                            <button
                                                type="button"
                                                className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
                                            >
                                                Upload Sheet
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            >
                                                Submit Details
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%] h-full">
                            <p className="text-3xl mx-7 my-3">Stats</p>
                            <div className="flex justify-center flex-col flex-wrap items-center">
                                <StatCard stat={totalAdmins} title={'Admins Assigned'} />
                                <StatCard stat={certificateCount} title={'Certificates Issued'} />
                                <StatCard stat={count} title={'Certificates Verified'} />
                                <StatCard stat={websiteVisits} title={'Websites Visitors'} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </DesktopOnly>
    )
}

const StatCard = ({ stat, title }: { stat: number, title: string }) => {
    return (
        <div className="h-26 my-2.5 w-6/7 rounded bg-white border border-[#d9d9d9] px-5 py-3">
            <h1 className="text-3xl font-semibold">{stat}+</h1>
            <p className="text-lg mt-2">{title}</p>
        </div>
    )
}

export default Dashboard