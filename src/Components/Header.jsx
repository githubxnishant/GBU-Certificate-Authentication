import React from 'react'

const Header = () => {
  return (
    <>
    <div>
        <div className='flex justify-between items-center text-white text-base px-20 h-10 bg-[#78335d] color-white'>
            <h1 className='cursor-pointer ml-20'>GBU Certificate Authentication</h1>
            <div className='mr-20'>
                <ul className='flex gap-3'>
                    <li><a className='cursor-pointer' href='https://www.gbu.ac.in/' target='_blank'>Main Website</a></li>|
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
            <div className='flex gap-8 mr-20 cursor-pointer'>
                <p className='text-base'>Home</p>
                <p className='text-base'>Abhivyanjana</p>
                <p className='text-base'>Glitch</p>
                <p className='text-base'>Shauryautsav</p>
                {/* <p className='dropdown-menu'>E-Resources</p>
                <p>Library</p>
                <p>Directory</p>
                <p>Publications</p> */}
                {/* <p><DarkToggle /></p> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default Header