import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HomeContent = () => {

    const navigate = useNavigate();

    const [certificateID, setCertificateID] = useState('');

    const verifyCert = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/certificate/verify/${certificateID}`);
            console.log(res)
            if (res.data.success) {
                toast.success("Valid Certificate!");
                navigate(`/certificate/${certificateID}`);
            } else {
                toast.error("Invalid Certificate");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 404) {
                    return toast.error('Invalid Certificate!')
                }
            }
            toast.error(error.response?.data?.message || "Server error occurred!");
        }
    };

    return (
        // <>
        //     <div className='w-screen md:h-[75vh] h-[72vh] flex justify-center items-center'>
        //         <div className='md:w-[30%] md:h-[70%] bg-[#d9d9d9] border-2 border-black rounded-xl flex items-center justify-center opacity-90 w-2/3 h-72'>
        //             <div className='md:w-[95%] h-[90%] flex justify-center items-center flex-col text-center w-[90%]'>
        //                 <div className='w-full md:h-[40%] flex justify-center items-center flex-col h-[35%]'>
        //                     <img src="/Images/gbu_logo.png" alt="" className='md:w-28 md:h-28 h-20 w-20' />
        //                 </div>
        //                 <div className='w-full md:h-[10%] flex justify-center items-center h-auto'>
        //                     <h1 className='font-medium md:text-xl text-center text-base'>GBU Certificate Authentication</h1>
        //                 </div>
        //                 <div className='w-full md:h-[50%] flex justify-center items-center flex-row h-[40%]'>
        //                     <form onSubmit={verifyCert} className='flex items-center justify-center flex-col'>
        //                         <input
        //                             value={certificateID}
        //                             onChange={(e) => { setCertificateID(e.target.value) }}
        //                             required
        //                             type="text"
        //                             placeholder='Certificate ID'
        //                             className='rounded-xl md:h-10 bg-white md:w-64 m-3 text-center shadow-md border-2 border-black w-44 h-9 res:text-sm' />
        //                         <button className='border-2 cursor-pointer border-black bg-emerald-400 rounded-xl shadow-md px-10 py-1 text-sm'>Verify</button>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <>
            <div className="w-screen min-h-[75vh] flex justify-center items-center bg-transparent">
                <div className="md:w-[30%] w-3/4 bg-white border-2 border-black rounded-xl shadow-lg flex flex-col items-center justify-center p-6 md:p-8">

                    {/* Logo */}
                    <div className="flex flex-col items-center mb-4">
                        <img src="/Images/gbu_logo.png" alt="GBU Logo" className="md:w-28 md:h-28 w-20 h-20 mb-2" />
                        <h1 className="text-center font-semibold md:text-xl text-lg">GBU Certificate Authentication</h1>
                    </div>

                    {/* Verification Form */}
                    <form onSubmit={verifyCert} className="flex flex-col items-center w-full mt-4">
                        <input
                            value={certificateID}
                            onChange={(e) => setCertificateID(e.target.value)}
                            required
                            type="text"
                            placeholder="Certificate ID"
                            className="w-full md:w-64 h-10 px-4 mb-4 text-center rounded-xl border-2 border-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full cursor-pointer md:w-64 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
                        >
                            Verify
                        </button>
                    </form>

                    {/* Optional info */}
                    <p className="text-sm text-gray-500 mt-3 text-center">
                        Enter your Certificate ID to verify authenticity.
                    </p>

                </div>
            </div>
        </>

    );
};

export default HomeContent;
