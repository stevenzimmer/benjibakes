"use client";
import Cookie from "./Cookie";

const cookieBackgrounds = [
    {
        size: 56,
        x: 2,
        y: 5,
    },
    {
        size: 44,
        x: 5,
        y: 11,
    },
    {
        size: 88,
        x: 99,
        y: 44,
    },
    {
        size: 76,
        x: 90,
        y: 25,
    },
    {
        size: 55,
        x: 15,
        y: 24,
    },
    {
        size: 77,
        x: 12,
        y: 90,
    },
    {
        size: 55,
        x: 95,
        y: 95,
    },
    {
        size: 55,
        x: 95,
        y: 5,
    },
    {
        size: 84,
        x: 90,
        y: 7,
    },
    {
        size: 84,
        x: 16,
        y: 7,
    },
    {
        size: 66,
        x: 11,
        y: 55,
    },
    {
        size: 63,
        x: 3,
        y: 66,
    },
    {
        size: 60,
        x: 98,
        y: 72,
    },
    {
        size: 76,
        x: 2,
        y: 25,
    },
    {
        size: 76,
        x: 3,
        y: 33,
    },
    {
        size: 76,
        x: 15,
        y: 0,
    },
    {
        size: 99,
        x: 10,
        y: -10,
    },
    {
        size: 90,
        x: 90,
        y: -9,
    },
    {
        size: 82,
        x: 3,
        y: -2,
    },
    {
        size: 99,
        x: 100,
        y: 10,
    },
    {
        size: 99,
        x: 100,
        y: 7,
    },
    {
        size: 90,
        x: 100,
        y: -1,
    },
    {
        size: 88,
        x: 98,
        y: 90,
    },
    {
        size: 93,
        x: 90,
        y: 50,
    },
    {
        size: 59,
        x: 85,
        y: 10,
    },
    {
        size: 90,
        x: 18,
        y: 77,
    },
    {
        size: 64,
        x: 88,
        y: 90,
    },
    {
        size: 62,
        x: 12,
        y: 65,
    },
    {
        size: 88,
        x: 72,
        y: 82,
    },
];

export default function CookieBackground() {
    return (
        <>
            {cookieBackgrounds.map(({size, x, y}, i) => {
                return <Cookie key={i} size={size} x={x} y={y} />;
            })}
        </>
    );
}
