import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { toggleMenu } from '../store/menuSlice';
import { setTab } from '../store/tabSlice';
import { Power } from 'lucide-react';

const SideNav = () => {

    const menu = useSelector((state: RootState) => state.menu.isOpen);
    const activeTab: string = useSelector((state: RootState) => state.tab.activeTab);
    const dispatch = useDispatch<AppDispatch>();

    const tabToggle = (tab: string) => {
        dispatch(setTab(tab));
    }

    return (
        <>
            <div className={`border-r bg-[#f8f9fa] border-[#d9d9d9] h-[100vh] transition-all duration-300 ${menu ? 'w-[5vw]' : 'w-[20vw]'}`}>

                {/* GBU Logo Side Nav */}
                <div className={`border-b border-[#d9d9d9] h-[10vh] w-full flex items-center px-5 ${menu ? 'justify-center' : 'justify-between'}`}>
                    <img className={`h-10 transition-all duration-300 ${menu ? 'hidden' : ''}`} src="/Images/fulllogogbu.png" />
                    <button className="cursor-pointer" value={menu.toString()} onClick={() => dispatch(toggleMenu())}>
                        {menu ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        }
                    </button>
                </div>

                {/* Top Menu Nav Links */}
                <div className="h-[75vh] w-full p-5">
                    <Link to={'/dashboard'}>
                        <button onClick={() => tabToggle('dashboard')} className={`w-full flex justify-center cursor-pointer`}>
                            {menu ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                                </svg>
                                :
                                <div className="w-full flex justify-center items-center gap-3">
                                    <h1 className={`${activeTab === 'dashboard' ? 'text-black font-bold' : ''}`}>Dashboard</h1>
                                </div>}
                        </button>
                    </Link>
                    <Link to={'/records'}>
                        <button onClick={() => tabToggle('records')} className={`w-full flex justify-center mt-5 cursor-pointer`}>
                            {menu ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
                                </svg>
                                :
                                <div className="w-full flex justify-center items-center gap-3">
                                    <h1 className={`${activeTab === 'records' ? 'text-black font-bold' : ''}`}>Records</h1>
                                </div>}
                        </button>
                    </Link>
                </div>

                {/* Bottom Menu Nav Links */}
                <div className={`h-[15vh] p-5 flex justify-center items-center flex-col gap-5 transition-all duration-300`}>
                    {!menu
                        ? <div className="flex items-center justify-between mt-2 bg-[#fff] border border-[#d9d9d9] w-full px-3 py-2 rounded-lg">
                            <div className="flex w-full items-center justify-between gap-2">
                                <div className="flex gap-2 items-center justify-center">
                                    <div className="bg-[#d9d9d9] text-black border rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg"> N </div>
                                    <div>
                                        <p className="text-sm font-semibold">Nishant Chauhan</p>
                                        <p className="text-xs">235UCD038</p>
                                    </div>
                                </div>
                                <button className='rounded hover:bg-[#f8f9fa] transition-all duration-300 '>
                                    <Power size={16} className="text-gray-400 p-2 h-full w-full hover:text-red-400 cursor-pointer transition-all duration-300" />
                                </button>
                            </div>
                        </div>
                        : <div className="bg-[#d9d9d9] text-black border cursor-not-allowed rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg"> N </div>
                    }
                    {/* <div onClick={() => tabToggle('profile')} className={`w-full flex justify-center cursor-pointer`}>
                        {menu ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                            :
                            <div className="w-full flex justify-center items-center gap-3">
                                <h1 className={`${activeTab === 'profile' ? 'text-black font-bold' : ''}`}>Profile</h1>
                            </div>}
                    </div> */}
                    {/* <Link to={'/settings'}>
                        <button onClick={() => tabToggle('settings')} className={`w-full flex justify-center cursor-pointer `}>
                            {menu ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                </svg>
                                :
                                <div className="w-full flex justify-center items-center gap-3">
                                    <h1 className={`${activeTab === 'settings' ? 'text-black font-bold' : ''}`}>Settings</h1>
                                </div>}
                        </button>
                    </Link> */}
                </div>
            </div>
        </>
    )
}

export default SideNav