import { useSelector } from "react-redux";
import Footer from "../components/Admin/Footer";
import Header from "../components/Admin/Header";
import SideNav from "../utils/SideNav";
import type { RootState } from "../store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Admins {
    name: string;
    username: string;
}

const Admins = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [admins, setAdmins] = useState<Admins[]>([]);

    const menu = useSelector((state: RootState) => state.menu.isOpen);
    const totalAdmins = useSelector((state: RootState) => state.admin.adminCount);

    useEffect(() => {
        const fetchAdmins = async () => {
            setLoading(true);
            try {
                const res = await axios.get<{ success: boolean; admins: Admins[] }>(
                    `${import.meta.env.VITE_BACKEND_URL}/admin/views`
                );
                if (res.data.success) {
                    setAdmins(res.data.admins);
                } else {
                    toast.error("Failed to fetch admins");
                }
            } catch (err: any) {
                console.error(err);
                setError("Server error occurred");
                toast.error("Server error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);

    return (
        <div className="w-full h-full flex">
            <SideNav />
            <div
                className={`flex flex-col transition-all duration-300 ${!menu ? "w-[80vw]" : "w-[95vw]"
                    }`}
            >
                <Header />

                <div className="h-[83vh] py-5 px-10 bg-[#f3f3f3] overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-semibold">Admins</h1>
                        <p className="text-lg font-medium">Assigned: {totalAdmins}</p>
                    </div>

                    {loading && <p>Loading...</p>}

                    {error && !loading && <p className="text-red-500">{error}</p>}

                    {!loading && !error && admins.length === 0 && (
                        <p>No admins found.</p>
                    )}

                    <div className="grid grid-cols-3 gap-5">
                        {!loading &&
                            !error &&
                            admins.length > 0 &&
                            admins.map((admin, index) => (
                                <div key={index} className="w-full border items-center border-gray-300 bg-white rounded-md p-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="w-full flex items-center">
                                            <div className="bg-[#d9d9d9] min-w-10 h-10 mr-2 text-black border rounded-full flex items-center justify-center font-bold text-lg"> {admin?.name.charAt(0)} </div>
                                            <div className="w-full flex justify-between items-center">
                                                <p className="text-md font-semibold">{admin?.name}</p>
                                                <p className="text-sm text-gray-600">{admin?.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <Footer />
            </div>
        </div>
    );
};

export default Admins;