import { useSelector } from "react-redux"
import type { RootState } from "../../store/store";

const Header = () => {

    const menu = useSelector((state: RootState) => state.menu.isOpen);

    return (
        <>
            <div className={`h-[10vh] flex items-center justify-center transition-all duration-300 bg-[#f8f9fa] border-b border-[#d9d9d9] ${menu ? 'w-[95vw]' : 'w-[80vw]'}`}>
                <p className='text-xl font-semibold '>GBU Certificate Authentication Admin Dashboard</p>
            </div>
        </>
    )
}

export default Header