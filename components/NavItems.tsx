import ViewMenuButton from "./ViewMenuButton";
import SheetSidebar from "./SheetSidebar";
export default function NavItems() {
    return (
        <>
            <a
                href="#order"
                className=" text-bb-brown rounded-md text-xl md:text-center font-semibold md:px-6 hidden md:block"
            >
                How to order
            </a>
            <div className="hidden md:block">
                <ViewMenuButton />
            </div>

            <SheetSidebar />
        </>
    );
}
