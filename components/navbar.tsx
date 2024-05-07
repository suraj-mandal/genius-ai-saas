import React from "react";
import {UserButton} from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";

const Navbar = () => {
    return (
        <div className="flex items-center p-4">
            <div className="md:hidden">
                <MobileSidebar/>
            </div>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
};

export default Navbar;
