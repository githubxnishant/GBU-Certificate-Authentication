import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../../store/store';

const Header = () => {

    const [websiteVisits, setWebsiteVisits] = useState(0);

    const activeTab: string = useSelector((state: RootState) => state.tab.activeTab);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/visits`)
            .then(res => {
                if (res.data.success) {
                    setWebsiteVisits(res.data.visits);
                }
            })
            .catch(err => {
                console.error("Error fetching visit count:", err);
            });
    }, []);

    return (
        <>
            <div>
                <div className='flex justify-between items-center md:text-sm text-xs text-white md:px-20 px-5 h-[5vh] bg-[#78335d] color-white'>
                    <h1 className='cursor-pointer md:ml-12'>GBU Certificate Authentication</h1>
                    <div className='md:mr-20 pl-16 md:w-auto w-1/2 overflow-auto text-center'>
                        <ul className='flex gap-3 items-center w-max'>
                            <li>Website visitors: {websiteVisits}</li> |
                            <li><a className='cursor-pointer' href='https://gbu-academics.vercel.app/' target='_blank'>GBU Academics</a></li>|
                            <Link to={`/${activeTab}`}><button className='cursor-pointer'>Admin Login</button></Link>
                        </ul>
                    </div>
                </div>
                <div className='flex items-center md:h-[14vh] h-[13vh] navbar-light bg-[#f8f9fa] navbar-expand-lg md:px-10 shadow-2xl justify-between border-black-100 border-black-500 p-3'>
                    <a href='https://www.gbu.ac.in/' target='_blank'>
                        <img className='md:h-14 w-auto md:mx-10 md:my-5 m-0 h-12' src="/Images/fulllogogbu.png" />
                    </a>
                    <div className='md:flex gap-8 mr-20 hidden'>
                        <p className='text-base cursor-pointer'><Link to={'/'}>Home</Link></p>
                        <p className='text-base cursor-pointer'>Abhivyanjana</p>
                        <p className='text-base cursor-pointer'>Shauryautsav</p>
                        <p className='text-base cursor-pointer'>TechFest</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header