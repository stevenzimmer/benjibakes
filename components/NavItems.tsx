import ViewMenuButton from "./ViewMenuButton";
import SheetTrigger from "./SheetTrigger";
import Link from "next/link";
export default function NavItems() {
    return (
        <>
            <Link
                href="/#order"
                className="text-bb-brown rounded-full text-base md:text-lg md:text-center font-semibold md:px-3 hidden md:block hover:text-bb-blue transition-colors"
            >
                How to order
            </Link>
            <Link
                href="/catering"
                className="text-bb-brown rounded-full text-base md:text-lg md:text-center font-semibold pl-3 pr-6 hidden md:block hover:text-bb-blue transition-colors"
            >
                Catering
            </Link>

            <ViewMenuButton />
            <SheetTrigger />
        </>
    );
}
