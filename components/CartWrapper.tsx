"use client";
import {AnimatePresence} from "framer-motion";
import Sidebar from "./Sidebar";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
export default function CartWrapper() {
    const {showSidebar} = useContext(ThemeContext);
    return <AnimatePresence>{showSidebar && <Sidebar />}</AnimatePresence>;
}
