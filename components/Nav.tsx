"use client";
import Image from "next/image";
import NavItems from "./NavItems";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Nav() {
    const pathname = usePathname();

    return (
        <div className="sticky top-4 left-0 right-0 px-4 md:px-6 py-3 w-full h-full shadow-[0_20px_40px_rgba(44,28,18,0.12)] mb-8 md:mb-12 bg-white/80 backdrop-blur rounded-2xl border border-bb-brown-20 z-50">
            <div className="flex justify-between flex-wrap items-center">
                <div className="w-2/12">
                    <Link href="/">
                        <Image
                            src="/bb-letters.png"
                            alt="Benji Bakes Letters Icon"
                            width={56}
                            height={56}
                            className=""
                            title="Benji Bakes Logo"
                        />
                    </Link>
                </div>
                {pathname !== "/success" && (
                    <div className="w-10/12">
                        <div className="w-full flex text-center justify-end items-center flex-wrap gap-2 md:gap-4 ">
                            <NavItems />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
