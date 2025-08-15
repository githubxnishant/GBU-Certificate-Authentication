import { useSelector } from "react-redux"
import Footer from "../components/Admin/Footer"
import Header from "../components/Admin/Header"
import SideNav from "../utils/SideNav"
import type { RootState } from "../store/store"

const Settings = () => {

    const menu = useSelector((state: RootState) => state.menu.isOpen)

    return (
        <div className="w-full h-full flex">
            <SideNav />
            <div className={`flex flex-col transition-all duration-300 ${!menu ? 'w-[80vw]' : 'w-[95vw]'}`}>
                <Header />
                <div className="h-[83vh] w-full flex justify-center items-center bg-[#f3f3f3]">
                    <p className="text-center">Logs page coming soon..!!</p>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Settings