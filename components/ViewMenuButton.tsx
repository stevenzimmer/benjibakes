"use client";
import season from "@/utils/getSeason";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {Button} from "@/components/ui/button";
export default function ViewMenuButton({isCart = false}) {
    const {setSheetOpen} = useContext(ThemeContext);
    return (
        <Button
            variant={"outline"}
            onClick={(e) => {
                setSheetOpen(false);
            }}
            className={`border-bb-brown border-2 text-bb-brown font-semibold hover:bg-bb-brown/10 hover:text-bb-brown rounded-full px-6 py-2 ${isCart &&
                "px-12 py-6 text-xl"}`}
            asChild
        >
            <a href="/#menu">View our Menu</a>
        </Button>
    );
}
