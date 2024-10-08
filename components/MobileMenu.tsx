import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import NavItems from "./NavItems";
export default function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu />
            </SheetTrigger>
            <SheetContent className="sm:w-[600px] sm:max-w-full  md:hidden">
                <NavItems />
            </SheetContent>
        </Sheet>
    );
}
