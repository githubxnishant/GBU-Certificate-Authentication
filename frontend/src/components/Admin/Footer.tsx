import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const Footer = () => {

    const menu = useSelector((state: RootState) => state.menu.isOpen);

    return (
        <div className={`w-[80%] h-[7vh] flex items-center justify-center fixed bottom-0 transition-all duration-300 bg-[#f8f9fa] border-t border-[#d9d9d9] ${menu ? 'w-[95%]' : 'w-[80%]'}`}>
            <div>Developed & Maintained by 
                <a href='https://nishantchauhan.me' target='_blank'><i><b> Nishant Chauhan</b></i></a>
            </div>
        </div>
    )
}

export default Footer