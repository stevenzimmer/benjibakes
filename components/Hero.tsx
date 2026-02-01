"use client";
import Image from "next/image";
import {ArrowRight, Sparkles} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import ThemeContext from "@/context/ThemeContext";
import {products} from "@/utils/products";
import { PausedOrders } from "./PausedOrders";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
export default function Hero() {
    const {setSheetOpen} = useContext(ThemeContext);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

    useEffect(() => {
        if (!carouselApi) return;
        const interval = setInterval(() => {
            carouselApi.scrollNext();
        }, 4500);
        return () => clearInterval(interval);
    }, [carouselApi]);
    return (
        <section className="relative overflow-hidden rounded-[32px] border border-bb-brown-20 bg-white/80 p-3 md:px-10 lg:px-12 mb-12">
            <div className="absolute -top-16 -left-20 h-72 w-72 rounded-full bg-bb-rose/40 blur-3xl" />
            <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-bb-blue/20 blur-3xl" />
            <PausedOrders />
            <div className="relative grid gap-4 lg:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-bb-brown-10 px-4 py-2 text-xs md:text-sm font-semibold text-bb-brown">
                        <Sparkles size={16} />Seasonal treats • Baked to order • Rocklin / Roseville, Ca
                    </div>
                    <h1 className="mt-6 font-display text-4xl md:text-6xl leading-tight text-bb-ink">
                        Small-batch cookies with big, buttery flavor.
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-bb-brown/80 max-w-xl">
                        Benji Bakes is your local cookie counter in Rocklin and
                        Roseville for seasonal favorites and crowd-pleasers.
                        Order online and pick up fresh treats the same week.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button
                            onClick={() => setSheetOpen(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-bb-brown px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                        >
                            Start an order <ArrowRight size={18} />
                        </button>
                        <a
                            href="#menu"
                            className="inline-flex items-center gap-2 rounded-full border border-bb-brown px-6 py-3 text-bb-brown font-semibold hover:bg-bb-brown/10 transition-colors"
                        >
                            Browse the menu
                        </a>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-4 text-sm md:text-base">
                        <div className="rounded-2xl bg-white/80 border border-bb-brown-20 p-4">
                            <p className="font-semibold text-bb-ink">
                                Pickup window
                            </p>
                            <p className="text-bb-brown/80">3:00–6:00 PM</p>
                        </div>
                        <div className="rounded-2xl bg-white/80 border border-bb-brown-20 p-4">
                            <p className="font-semibold text-bb-ink">
                                Seasonal menu
                            </p>
                            <p className="text-bb-brown/80">
                                New cookies monthly
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="mb-6 flex items-center gap-4">
                        <Image
                            src="/logo-horizontal.png"
                            alt="Benji Bakes"
                            width={220}
                            height={80}
                            className="w-auto mx-auto"
                        />
                    </div>
                    <div className="relative overflow-hidden rounded-[28px] border border-bb-brown-20 shadow-[0_30px_60px_rgba(59,36,23,0.2)] bg-white">
                        <Carousel
                            className="w-full"
                            opts={{loop: true}}
                            setApi={setCarouselApi}
                        >
                            <CarouselContent>
                                {products.map((cookie, i) => (
                                    <CarouselItem key={i}>
                                        <figure className="relative overflow-hidden rounded-2xl bg-bb-cream">
                                            <Image
                                                src={cookie.image}
                                                alt={cookie.title}
                                                title={cookie.title}
                                                width={900}
                                                height={900}
                                                className="w-full h-[260px] md:h-[340px] object-cover"
                                                priority
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                                                <div className="">
                                                    <span className="rounded-full bg-white/90 text-bb-brown px-3 py-1 text-[11px] font-semibold border border-white/70 mb-2 inline-block">
                                                        {cookie.label}
                                                    </span>
                                                    <p className="font-display text-lg md:text-xl text-white">
                                                        {cookie.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </figure>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}
