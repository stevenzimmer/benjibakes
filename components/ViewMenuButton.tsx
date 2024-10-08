"use client";
import season from "@/utils/getSeason";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {Button} from "@/components/ui/button";
export default function ViewMenuButton() {
    const {setSheetOpen} = useContext(ThemeContext);
    return (
        <Button
            variant={"outline"}
            onClick={(e) => {
                setSheetOpen(false);
            }}
            asChild
        >
            <a href="#menu">View our {season} Menu</a>
        </Button>
    );
}
