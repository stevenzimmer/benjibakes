import HowToOrder from "@/components/HowToOrder";
import Menu from "@/components/Menu";
import Hero from "@/components/Hero";
import SheetSidebar from "@/components/SheetSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rocklin & Roseville Cookie Bakery | Benji Bakes",
    description:
        "Benji Bakes is a local cookie bakery serving Rocklin and Roseville in Placer County, CA with small-batch, baked-to-order cookies for pickup.",
};

export default async function Home() {
    return (
        <>
            <Hero />
            <Menu />
            <HowToOrder />
            <SheetSidebar />
        </>
    );
}
