import HowToOrder from "@/components/HowToOrder";
import Menu from "@/components/Menu";
import CartWrapper from "@/components/CartWrapper";
import Hero from "@/components/Hero";
import SheetSidebar from "@/components/SheetSidebar";
export default async function Home() {
    return (
        <>
            <Hero />
            <Menu />
            <HowToOrder />
            <CartWrapper />
            <SheetSidebar />
        </>
    );
}
