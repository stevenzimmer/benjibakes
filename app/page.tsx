import Nav from "@/components/Nav";
import HowToOrder from "@/components/HowToOrder";
import Menu from "@/components/Menu";
import CartWrapper from "@/components/CartWrapper";
import Hero from "@/components/Hero";
export default async function Home() {
    return (
        <main className="px-6 pb-12 lg:px-16 lg:pb-16 bg-white max-w-6xl mx-auto rounded-lg relative  md:py-6 py-3">
            <Nav />
            <Hero />
            <Menu />
            <HowToOrder />
            <CartWrapper />
        </main>
    );
}
