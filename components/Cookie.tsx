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
    const rotationSeed = (x * 13 + y * 17 + size * 7) % 360;
    const parallaxOffset = 40 + ((x + y + size) % 120);
    const cookieParallax = useParallax({
        translateY: [0, parallaxOffset],
        rotate: [0, rotationSeed],
    });
    return (
        <div
            ref={cookieParallax.ref as React.RefObject<HTMLDivElement>}
            className="absolute"
            style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: `rotate(${rotationSeed}deg)`,
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
