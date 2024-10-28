import ViewMenuButton from "./ViewMenuButton";
import SheetTrigger from "./SheetTrigger";
export default function NavItems() {
    return (
        <>
            <a
                href="#order"
                className="text-bb-brown rounded-md text-xl md:text-center font-semibold md:px-6 hidden md:block"
            >
                How to order
            </a>

            <ViewMenuButton />
            <SheetTrigger />
        </>
    );
}
