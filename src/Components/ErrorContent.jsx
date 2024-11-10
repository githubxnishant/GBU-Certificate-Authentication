import React from 'react'

const ErrorContent = ({ setCertificate, sharedID }) => {
    return (
        <>        
            <div className='absolute'>
                <img src="/Images/Gautam_Buddha_University.jpg" alt="" className='relative -top-96 -z-10 res:object-cover res:h-screen res:w-auto res:-top-24'/>
            </div>
            <div className='w-screen h-body-fit flex justify-center items-center'>
            <div className='w-[30%] h-[70%] bg-[#d9d9d9] border-2 border-black rounded-xl flex items-center justify-center opacity-90 res:w-2/3 res:h-72'>
                    <div className='w-[95%] h-[90%] place-items-center res:w-[90%]'>
                        <div className='w-full h-[40%] flex justify-center items-center flex-col res:h-[35%]'>
                            <img src="/Images/gbu_logo.png" alt="" className='w-28 h-28 res:h-20 res:w-20' />
                        </div>
                        <div className='w-full h-[10%] flex justify-center items-center res:h-auto'>
                            <h1 className='font-medium text-xl res:text-center res:text-base'>GBU Certificate Authentication</h1>
                        </div>
                        <div className='w-[85%] h-1/4 bg-white border-2 border-black rounded text-sm shadow-md res:m-3 res:h-[20%]'>
                            <p className='h-full flex justify-center items-center text-center px-2 res:text-xs'>The Certificate with ID #{sharedID} is not valid.</p>
                        </div>
                        <button 
                        onClick={() => setCertificate(null)}
                        className='border-2 border-black bg-emerald-400 rounded-xl shadow-md mt-5 px-10 py-1 res:m-0 res:text-sm'>Go Back</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorContent