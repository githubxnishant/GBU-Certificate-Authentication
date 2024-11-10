import React from 'react';

const ValidContent = ({ setCertificate, sharedID }) => {
    return (
        <>
            <div className='absolute'>
                <img src="/Images/Gautam_Buddha_University.jpg" alt="" className='relative -top-96 -z-10 res:object-cover res:h-screen res:w-auto res:-top-24'/>
            </div>
            <div className='w-screen h-body-fit flex justify-center items-center'>
                <div className='w-[30%] h-[70%] bg-[#d9d9d9] border-2 border-black rounded-xl flex items-center justify-center opacity-90 shadow-md res:w-2/3 res:h-72'>
                    <div className='w-[95%] h-[90%] flex items-center justify-center flex-col gap-2'>
                        <div className='w-[85%] h-[60%] bg-white border-2 border-black rounded flex items-center justify-center shadow-md'>
                            <h1>Certificate Image Here</h1>
                        </div>
                        <div className='w-[85%] h-auto bg-white border-2 border-black rounded text-sm shadow-md'>
                            <p className='h-full flex justify-center items-center text-center p-2 res:text-xs'>
                                The certificate with ID #{sharedID} is valid for 'NAME' issued on 'DATE' at 'Abhivyanjana’24'
                            </p>
                        </div>
                        <div className='flex justify-center items-center flex-row w-[85%] gap-2'>
                            <button className='border-2 border-black bg-emerald-400 text-sm rounded-xl shadow-md w-1/2 py-2 res:h-10 res:p-0 res:text-xs'>
                                Download Certificate
                            </button>
                            <button 
                                onClick={() => setCertificate(null)}
                                className='border-2 border-black bg-emerald-400 text-sm rounded-xl shadow-md w-1/2 py-2 res:h-10 res:p-0 res:text-xs'>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ValidContent;