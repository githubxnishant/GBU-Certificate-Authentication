import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../store/store';
import { toggleMenu } from '../store/menuSlice';
import { setTab } from '../store/tabSlice';
import { Logs, Power, UsersRound } from 'lucide-react';
import { logout } from '../store/adminSlice';

const SideNav = () => {

    const menu = useSelector((state: RootState) => state.menu.isOpen);
    const admin = useSelector((state: RootState) => state.admin.user);
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
                    <Link to={'/'}>
                        <img className={`h-10 transition-all duration-300 ${menu ? 'hidden' : ''}`} src="/Images/fulllogogbu.png" />
                    </Link>
                    <button className="cursor-pointer" value={menu.toString()} onClick={() => dispatch(toggleMenu())}>
                        {menu ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
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
                    <Link to={'/admins'}>
                        <button onClick={() => tabToggle('admins')} className={`w-full flex justify-center mt-5 cursor-pointer `}>
                            {menu ?
                                <UsersRound />
                                :
                                <div className="w-full flex justify-center items-center gap-3">
                                    <h1 className={`${activeTab === 'admins' ? 'text-black font-bold' : ''}`}>Admins</h1>
                                </div>}
                        </button>
                    </Link>
                    <Link to={'/logs'}>
                        <button onClick={() => tabToggle('logs')} className={`w-full flex justify-center mt-5 cursor-pointer `}>
                            {menu ?
                                <Logs />
                                :
                                <div className="w-full flex justify-center items-center gap-3">
                                    <h1 className={`${activeTab === 'logs' ? 'text-black font-bold' : ''}`}>Logs</h1>
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
                                    <div className="bg-[#d9d9d9] text-black border rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg"> {admin?.name.charAt(0)} </div>
                                    <div>
                                        <p className="text-sm font-semibold">{admin?.name}</p>
                                        <p className="text-xs">{admin?.username}</p>
                                    </div>
                                </div>
                                <button onClick={() => logout(dispatch)} className='rounded hover:bg-[#f8f9fa] transition-all duration-300 '>
                                    <Power size={16} className="text-gray-400 p-2 h-full w-full hover:text-red-400 cursor-pointer transition-all duration-300" />
                                </button>
                            </div>
                        </div>
                        : <div className="bg-[#d9d9d9] text-black border cursor-not-allowed rounded-full w-7 h-7 flex items-center justify-center font-bold text-lg">{admin?.name.charAt(0)}</div>
                    }
                </div>
            </div>
        </>
    )
}

export default SideNav