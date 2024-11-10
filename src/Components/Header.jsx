import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
        <div>
            <div className='flex justify-between items-center text-white text-sm px-20 h-10 bg-[#78335d] color-white'>
                <h1 className='cursor-pointer ml-20'>GBU Certificate Authentication</h1>
                <div className='mr-20'>
                    <ul className='flex gap-3'>
                        <li><a className='cursor-pointer' href='https://www.gbu.ac.in/' target='_blank'>Main Website</a></li>
                        <li><a className='cursor-pointer' href='https://www.gbu.ac.in/page/events' target='_blank'>Events</a></li>
                    </ul>
                </div>
            </div>
            <div className='flex items-center navbar-light bg-[#f8f9fa] navbar-expand-lg px-10 shadow-2xl justify-between h-20 border-black-100 border-black-500'>
                <a href='https://www.gbu.ac.in/' target='_blank' >
                    <img 
                    className='h-14 w-auto mx-10 my-5'
                    src="/Images/fulllogogbu.png" />
                </a>
                <div className='flex gap-8 mr-20'>
                    <p className='text-base cursor-pointer'><Link to='/'>Home</Link></p>
                    <p className='text-base cursor-pointer'>Abhivyanjana</p>
                    <p className='text-base cursor-pointer'>Glitch</p>
                    <p className='text-base cursor-pointer'>Shauryautsav</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header