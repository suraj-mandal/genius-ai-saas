import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";

const LandingLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <ScrollArea className="h-full bg-[#111827] overflow-auto">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </ScrollArea>
    );
};

export default LandingLayout;
