import React from 'react'

const ErrorContent = ({ authenticateCertificate }) => {
    return (
        <>
            <div className='absolute'>
                <img src="/Images/Gautam_Buddha_University.jpg" alt="" className='relative -top-96 -z-10'/>
            </div>
            <div className='w-screen h-body-fit flex justify-center items-center'>
                <div className='w-[30%] h-[70%] bg-[#d9d9d9] border-2 border-black rounded-xl flex items-center justify-center opacity-90'>
                    <div className='w-[95%] h-[90%] place-items-center'>
                        <div className='w-full h-[40%] flex justify-center items-center flex-col'>
                            <img src="/Images/gbu_logo.png" alt="" className='w-28 h-28' />
                        </div>
                        <div className='w-full h-[10%] flex justify-center items-center mb-5'>
                            <h1 className='font-medium text-xl'>GBU Certificate Authentication</h1>
                        </div>
                        <div className='w-[85%] h-1/4 bg-white border-2 border-black rounded text-sm shadow-md'>
                            <p className='h-full flex justify-center items-center text-center'>The Certificate with ID { authenticateCertificate } 'CertificateID' is not valid</p>
                        </div>
                        <button className='border-2 border-black bg-emerald-400 rounded-xl shadow-md mt-5 px-10 py-1'>Go Back</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorContent