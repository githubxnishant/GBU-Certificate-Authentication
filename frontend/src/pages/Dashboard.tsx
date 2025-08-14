import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import SideNav from "../utils/SideNav"
import type { RootState } from "../store/store"
import { useState } from "react"

interface FormData {
    certificateId: string;
    studentName: string;
    fest: string;
    year: string;
    category: string;
    rollNo: string;
}

const Dashboard = () => {

    const [form, setForm] = useState<FormData>({
        certificateId: "",
        studentName: "",
        fest: "",
        year: "",
        category: "",
        rollNo: "",
    });

    const categories = [
        "Coordinators",
        "Participants",
        "Volunteers",
        "Winners",
    ];

    const fests = ["Abhivyanjana", "Shauryautsav", "TechFest"];

    const menu = useSelector((state: RootState) => state.menu.isOpen)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", form);
    };

    return (
        <div className="w-full h-full flex">
            <SideNav />
            <div className={`flex flex-col transition-all duration-300 ${!menu ? 'w-[80vw]' : 'w-[95vw]'}`}>
                <Header />
                <div className="h-[83vh] w-full flex justify-center px-10 py-5 items-center bg-[#f3f3f3]">
                    <div className="w-[70%] h-full">
                        <p className="text-2xl">Welcome back!</p>
                        <p className="text-3xl font-semibold my-1">Nishant Chauhan</p>
                        <p className="text-xl font-light">235UCD038</p>
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

                                        {/* Year */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Year
                                            </label>
                                            <input
                                                type="number"
                                                name="year"
                                                value={form.year}
                                                onChange={handleChange}
                                                min="2000"
                                                max="2099"
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
                            <StatCard stat={'5'} title={'Fest Conducted'} />
                            <StatCard stat={'150'} title={'Certificates Issued'} />
                            <StatCard stat={'100'} title={'Certificates Verified'} />
                            <StatCard stat={'200'} title={'Websites Visitors'} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

const StatCard = ({ stat, title }: { stat: string, title: string }) => {
    return (
        <div className="h-26 my-2.5 w-6/7 rounded bg-white border border-[#d9d9d9] px-5 py-3">
            <h1 className="text-3xl font-semibold">{stat}+</h1>
            <p className="text-lg mt-2">{title}</p>
        </div>
    )
}

export default Dashboard