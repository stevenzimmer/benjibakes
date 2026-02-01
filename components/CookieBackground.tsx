"use client";
import {useEffect, useMemo, useState} from "react";
import Cookie from "./Cookie";

const COOKIE_SIZES = [44, 55, 56, 59, 60, 63, 64, 66, 76, 77, 82, 84, 88, 90, 93];
const COOKIE_COUNT_PER_SIDE = 10;
const LEFT_X_RANGE = [4, 16] as const;
const RIGHT_X_RANGE = [84, 96] as const;
const Y_RANGE = [-8, 100] as const;

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);
const randomFrom = <T,>(values: T[]) => values[Math.floor(Math.random() * values.length)];

export default function CookieBackground() {
    const [isMounted, setIsMounted] = useState(false);

    const cookieBackgrounds = useMemo(() => {
        const step = (Y_RANGE[1] - Y_RANGE[0]) / COOKIE_COUNT_PER_SIDE;
        const jitter = step * 0.25;
        const clampY = (value: number) => Math.min(Y_RANGE[1], Math.max(Y_RANGE[0], value));

        const left = Array.from({length: COOKIE_COUNT_PER_SIDE}, (_, i) => {
            const baseY = Y_RANGE[0] + i * step;
            return {
                size: randomFrom(COOKIE_SIZES),
                x: randomBetween(LEFT_X_RANGE[0], LEFT_X_RANGE[1]),
                y: clampY(baseY + randomBetween(-jitter, jitter)),
            };
        });

        const right = Array.from({length: COOKIE_COUNT_PER_SIDE}, (_, i) => {
            const baseY = Y_RANGE[0] + i * step + step * 0.5;
            return {
                size: randomFrom(COOKIE_SIZES),
                x: randomBetween(RIGHT_X_RANGE[0], RIGHT_X_RANGE[1]),
                y: clampY(baseY + randomBetween(-jitter, jitter)),
            };
        });

        return [...left, ...right];
    }, []);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="hidden md:block">
            {cookieBackgrounds.map(({size, x, y}, i) => {
                return <Cookie key={i} size={size} x={x} y={y} />;
            })}
        </div>
    );
}
