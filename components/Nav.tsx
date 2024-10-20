"use client";
import Image from "next/image";
import NavItems from "./NavItems";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Nav() {
    const pathname = usePathname();

    return (
        <div className="sticky top-1 md:top-3 left-0 right-0 px-3 md:px-6 py-3 w-full h-full shadow-md mb-6 md:mb-12 bg-white/90 rounded-lg z-10 ">
            <div className="flex justify-between flex-wrap items-center">
                <div className="w-2/12  md:w-1/12">
                    <Link href="/">
                        <Image
                            src="/bb-letters.png"
                            alt="Benji Bakes Letters Icon"
                            width={50}
                            height={50}
                            className="mx-auto"
                            title="Benji Bakes Logo"
                        />
                    </Link>
                </div>
                {pathname !== "/success" && (
                    <div className="w-10/12 md:w-11/12">
                        <div className="w-full flex text-center justify-end items-center flex-wrap ">
                            <NavItems />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
