"use client"
// react tools 
import { useState } from "react";

const ProfileDropDown = ({ children }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div className="relative">
            <div className={`hover:bg-gray-100 rounded-lg transition duration-200 active:bg-gray-400
            ${showDropdown ? "bg-gray-100":""}`} onClick={()=> setShowDropdown(!showDropdown)}>
                {children}
            </div>
            <div className={`absolute ${showDropdown ? "size-48 opacity-100" : "opacity-0"} 
            transition duration-200 border rounded-lg shadow-lg top-12 p-2 list-none`}>
                <li className="p-1 m-1 border-b text-center">item 1</li>
                <li className="p-1 m-1 border-b text-center">item 2</li>
                <li className="p-1 m-1 border-b text-center">item 3</li>
                <li className="p-1 m-1 border-b text-center">item 4</li>
                <li className="p-1 m-1 text-center">item 5</li>
            </div>
        </div>
    )
}; export default ProfileDropDown;