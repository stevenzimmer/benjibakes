"use client";
import {useState} from "react";
import {format} from "date-fns";
import {Calendar as CalendarIcon, ArrowRight} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useCartStore} from "@/store";
import BakeryAddress from "./BakeryAddress";

export default function OrderDetails() {
    const cartStore = useCartStore();
    const [date, setDate] = useState<Date>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const {setCheckoutState} = useContext(ThemeContext);

    const disabledPickupDates = [
        "2025-02-07",
        "2025-02-10",
        "2025-02-25",
        "2025-02-26",
        "2025-02-27",
        "2025-02-28",
        "2025-02-28",
        "2025-03-03",
        "2025-03-04",
    ];

    const setDisabledPickupDates = (date: Date) => {
        const currentDate = new Date();
        const tomorrowsDate = new Date(
            currentDate.getTime() + 24 * 60 * 60 * 1000,
        );
        return (
            date < tomorrowsDate ||
            disabledPickupDates.some((disabledDate) => {
                // Convert disabled date to local timezone
                const disabledDateObj = new Date(disabledDate);
                const disabledDateTZOffset = disabledDateObj.getTimezoneOffset();
                const disabledDateLocal = new Date(
                    disabledDateObj.getTime() + disabledDateTZOffset * 100000,
                );
                return date.toDateString() === disabledDateLocal.toDateString();
            }) ||
            date.getDay() === 0 || // Sunday
            date.getDay() === 6 || // Saturday
            date.getMonth() === 11 // December
        );
    };

    const canProceed = !!cartStore.pickupDate;

    const buttonDetails = "Proceed to online checkout";

    return (
        <div className="pb-6">
            <div className="mb-6">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal text-lg py-6 rounded-2xl border-bb-brown-20",
                                !date && "bg-white",
                                date && "border-bb-sage bg-bb-brown-10",
                            )}
                        >
                            <CalendarIcon className="mr-3 h-5 w-5" />
                            {date ? (
                                format(date, "PPP")
                            ) : (
                                <span>Select a pickup date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(e) => {
                                cartStore.setPickupDate(
                                    format(e as Date, "PPP"),
                                );
                                setDate(e);
                                setIsCalendarOpen(false);
                            }}
                            defaultMonth={date}
                            disabled={setDisabledPickupDates}
                        />
                    </PopoverContent>
                </Popover>
                {cartStore.pickupDate && (
                    <div className="p-4 bg-bb-brown-10 rounded-2xl mt-3 border border-bb-brown-20">
                        <strong className="text-bb-ink">
                            Selected pickup date
                        </strong>
                        : {cartStore.pickupDate}
                    </div>
                )}
            </div>

            {canProceed && (
                <Button
                    variant="ghost"
                    onClick={() => setCheckoutState("checkout")}
                    disabled={!cartStore.pickupDate}
                    className="disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed group text-white hover:text-white font-semibold py-6 text-base md:text-lg flex justify-end bg-bb-brown hover:bg-bb-ink shadow-lg rounded-full px-8"
                    title={buttonDetails}
                    aria-label={buttonDetails}
                >
                    {buttonDetails}
                    <ArrowRight
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                        size={20}
                    />
                </Button>
            )}
        </div>
    );
}
