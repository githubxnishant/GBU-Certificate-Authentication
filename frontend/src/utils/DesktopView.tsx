import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface DesktopOnlyProps {
    children: ReactNode;
}

const DesktopOnly: React.FC<DesktopOnlyProps> = ({ children }) => {
    const [isDesktop, setIsDesktop] = useState<boolean>(true);

    useEffect(() => {
        const checkDevice = () => {
            setIsDesktop(window.innerWidth >= 1024); 
        };

        checkDevice(); 
        window.addEventListener("resize", checkDevice);

        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    if (!isDesktop) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
                padding: "20px",
                flexDirection: "column",
                gap: '10px'
            }}>
                <h1 className="bg-white px-3 py-2 rounded">The admin panel is only accessible on desktop devices.</h1>
                <Link to={'/'}><button className="px-5 py-2 cursor-pointer bg-white border rounded">Home</button></Link>
            </div>
        );
    }

    return <>{children}</>;
};

export default DesktopOnly;
