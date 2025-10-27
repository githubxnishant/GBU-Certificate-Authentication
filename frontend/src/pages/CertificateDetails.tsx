import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { setCount } from "../store/verifySlice";

const CertificateDetails = () => {
    const { certificateId } = useParams<{ certificateId: string }>();
    const [certificate, setCertificate] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const downloadCertificate = () => {
        toast.info('Feature under maintenance, please try again later!');
    };

    useEffect(() => {
        const fetchCertificate = async () => {
            if (!certificateId) return;
            try {
                setLoading(true);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/certificate/verify/${certificateId}`);
                if (res.data.success) {
                    setCertificate(res.data.certificate);
                    const verifyCount = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/count`)
                    dispatch(setCount(verifyCount.data.verifies));
                } else {
                    toast.error(res.data.message || "Certificate not found");
                }
            } catch (error) {
                console.log("Certificate fetch error:", error);
                toast.error("Error fetching certificate!");
            } finally {
                setLoading(false);
            }
        };
        fetchCertificate();
    }, [certificateId]);

    return (
        <>
            <Header />
            <div className="flex flex-col md:h-[75vh] h-auto overflow-auto md:mb-0 mb-24 items-center justify-center bg-transparent py-10 px-4">
                <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
                    {/* Left Partition */}
                    <div className="md:w-1/3 bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                        <img src="/Images/gbu_logo.png" alt="GBU Logo" className="w-24 md:w-28 h-24 md:h-28 mb-4" />
                        <h1 className="text-lg md:text-xl font-semibold text-center mb-6">GBU Certificate Authentication</h1>
                        <button
                            onClick={certificate && downloadCertificate}
                            className={`w-full py-2 mb-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors ${certificate ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        >
                            Download Certificate
                        </button>
                        <Link to="/" className="w-full">
                            <button className="w-full cursor-pointer py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                                Go to Homepage
                            </button>
                        </Link>
                    </div>

                    {/* Right Partition */}
                    <div className="md:w-2/3 bg-white rounded-xl shadow-lg p-6">
                        {loading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : certificate ? (
                            <>
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-4 rounded-t-xl shadow-md">
                                    <h2 className="text-2xl md:text-3xl font-bold">Certificate Details</h2>
                                </div>

                                <div className="bg-white p-6 md:p-8 rounded-b-xl shadow-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                                        <p><span className="font-semibold text-gray-700">Certificate ID:</span> <span className="text-gray-900">{certificate.certificateId}</span></p>
                                        <p><span className="font-semibold text-gray-700">Student Name:</span> <span className="text-gray-900">{certificate.studentName}</span></p>
                                        <p><span className="font-semibold text-gray-700">Roll No:</span> <span className="text-gray-900">{certificate.rollNo}</span></p>
                                        <p><span className="font-semibold text-gray-700">Fest:</span> <span className="text-gray-900">{certificate.fest}</span></p>
                                        <p><span className="font-semibold text-gray-700">Date:</span> <span className="text-gray-900">{new Date(certificate.date).toLocaleDateString("en-GB")}</span></p>
                                        <p><span className="font-semibold text-gray-700">Event:</span> <span className="text-gray-900">{certificate.event}</span></p>
                                        <p><span className="font-semibold text-gray-700">Category:</span> <span className="text-gray-900">{certificate.category}</span></p>
                                        <p><span className="font-semibold text-gray-700">Authenticity:</span>
                                            <span className={`ml-2 px-2 py-1 rounded-full bg-emerald-600 text-white`}>
                                                Valid Certificate
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </>

                        ) : (
                            <p className="text-center text-red-500">Certificate not found.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CertificateDetails;