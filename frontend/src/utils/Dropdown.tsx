import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

interface DropdownProps {
    categories?: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ categories = [] }) => {
    const [selected, setSelected] = useState(categories[0]);
    const [open, setOpen] = useState(false);

    return (
        <div className="relative md:w-48 w-full mx-1 text-sm">
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between h-full items-center w-full white px-3 py-2 rounded-md bg-white border border-[#d9d9d9] hover:bg-[#f8f9fa] transition-all"
            >
                {selected}
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                />
            </button>

            {/* Dropdown List */}
            <div
                className={`absolute z-10 mt-2 w-full bg-white rounded-md border border-[#d9d9d9] shadow-lg transition-all duration-200 origin-top transform ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                {categories.map((style) => (
                    <button
                        key={style}
                        onClick={() => {
                            setSelected(style);
                            setOpen(false);
                        }}
                        className={`w-full flex justify-between items-center px-4 py-2 rounded text-left transition-all duration-300 ${selected === style ? "bg-[#d9d9d9]" : "hover:bg-[#f8f9fa]"
                            }`}
                    >
                        {style}
                        {selected === style && <Check size={16} />}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Dropdown;