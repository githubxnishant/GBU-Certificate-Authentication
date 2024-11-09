import React from 'react'

const ValidContent = () => {
    return (
        <>
            <div className='absolute'>
                <img src="/Images/Gautam_Buddha_University.jpg" alt="" className='relative -top-96 -z-10'/>
            </div>
            <div className='w-screen h-body-fit flex justify-center items-center'>
                <div className='w-[30%] h-[70%] bg-[#d9d9d9] border-2 border-black rounded-xl flex items-center justify-center opacity-90 shadow-md'>
                    <div className='w-[95%] h-[90%] flex items-center justify-center flex-col gap-2'>
                        <div className='w-[85%] h-[60%] bg-white border-2 border-black rounded flex items-center justify-center shadow-md'>
                            <h1>Certificate Image Here</h1>
                        </div>
                        <div className='w-[85%] h-auto bg-white border-2 border-black rounded text-sm shadow-md'>
                            <p className='h-full flex justify-center items-center text-center p-2'>The certificate with ID *CERTIFICATEID is valid for *NAME Lorem ipsum dolor adipisicing elit. Corporis, impedit? issued on *DATE at Abhivyanjana’24</p>
                        </div>
                        <div>
                            <button className='border-2 border-black bg-emerald-400 rounded-xl shadow-md px-10 py-1'>Download Certificate</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ValidContent