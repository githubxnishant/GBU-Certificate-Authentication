import React, { useState } from 'react';

const HomeContent = ({ authenticateCertificate, storeCertificateID }) => {
    const [certificateID, setCertificateID] = useState('');
    
    const submitHandler = (e) => {
        e.preventDefault();
        authenticateCertificate(certificateID);
        setCertificateID('');
    };

    const combineChange = (e) => {
        setCertificateID(e.target.value);
        storeCertificateID(e.target.value);
    }

    return (
        <>
            <div className='absolute res:w-screen res:fixed res:-z-10'>
                <img src="/Images/Gautam_Buddha_University.jpg" alt="" className='relative -top-96 -z-10 res:object-cover res:h-screen res:w-auto res:static res:-z-10' />
            </div>
            <div className='w-screen h-body-fit flex justify-center items-center res:h-res'>
                <div className='w-[30%] h-[70%] bg-[#d9d9d9] border-2 border-black rounded-xl flex items-center justify-center opacity-90 res:w-2/3 res:h-72'>
                    <div className='w-[95%] h-[90%] place-items-center res:w-[90%]'>
                        <div className='w-full h-[40%] flex justify-center items-center flex-col res:h-[35%]'>
                            <img src="/Images/gbu_logo.png" alt="" className='w-28 h-28 res:h-20 res:w-20' />
                        </div>
                        <div className='w-full h-[10%] flex justify-center items-center res:h-auto'>
                            <h1 className='font-medium text-xl res:text-center res:text-base'>GBU Certificate Authentication</h1>
                        </div>
                        <div className='w-full h-[50%] flex justify-center items-center flex-row res:h-[40%]'>
                            <form
                                className='flex items-center justify-center flex-col'
                                onSubmit={submitHandler}>
                                <input
                                    value={certificateID}
                                    onChange={combineChange}
                                    required
                                    type="text"
                                    maxLength={3}
                                    placeholder='Certificate ID'
                                    className='rounded-xl h-10 w-64 m-3 text-center shadow-md border-2 border-black res:w-44 res:h-9 res:text-sm' />
                                <button className='border-2 border-black bg-emerald-400 rounded-xl shadow-md px-10 py-1 res:text-sm'>Verify</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeContent;

