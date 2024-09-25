"use client";
import {useParallax} from "react-scroll-parallax";
import Image from "next/image";

export default function Cookie({
    size,
    x,
    y,
}: {
    size: number;
    x: number;
    y: number;
}): JSX.Element {
    const cookieParallax = useParallax({
        translateY: [0, Math.floor(Math.random() * 200)],
        rotate: [0, Math.floor(Math.random() * 360)],
    });
    return (
        <div
            ref={cookieParallax.ref as React.RefObject<HTMLDivElement>}
            className="absolute"
            style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
            }}
        >
            <Image
                src={`/bb-choco-chip.png`}
                alt={`Benji Bakes Chocolate Chip Logo`}
                width={size}
                height={size}
            />
        </div>
    );
}
