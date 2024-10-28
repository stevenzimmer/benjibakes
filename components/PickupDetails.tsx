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
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import BakeryAddress from "./BakeryAddress";

export default function PickupDetails() {
    const cartStore = useCartStore();
    const [date, setDate] = useState<Date>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const {setCheckoutState} = useContext(ThemeContext);

    const disabledPickupDates = [
        "2024-11-05",
        "2024-11-06",
        "2024-10-15",
        "2024-11-21",
        "2024-11-22",
    ];

    const setDisabledPickupDates = (date: Date) => {
        return (
            date < new Date() ||
            disabledPickupDates.some((disabledDate) => {
                // Convert disabled date to local timezone
                const disabledDateObj = new Date(disabledDate);
                const disabledDateTZOffset = disabledDateObj.getTimezoneOffset();

                const disabledDateLocal = new Date(
                    disabledDateObj.getTime() + disabledDateTZOffset * 100000
                );
                return date.toDateString() === disabledDateLocal.toDateString();
            }) ||
            date.getDay() === 0 || // Sunday
            date.getDay() === 6 // Saturday
        );
    };

    const canProceed = !!cartStore.pickupDate && !!cartStore.paymentDetails;

    const buttonDetails =
        cartStore.paymentDetails === "pay-now"
            ? "Proceed to checkout"
            : "Review order";

    return (
        <div className="pb-6">
            <BakeryAddress />
            <Separator className="my-8" />
            <div className="">
                <p className="font-semibold text-lg mb-2">
                    Select your pickup date:
                </p>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal text-lg py-6",
                                !date && "bg-slate-100",
                                date && "border-green-400 bg-slate-100"
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
                                    format(e as Date, "PPP")
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
                    <div className="p-3 bg-blue-50 rounded-lg mt-3">
                        <strong>Current selected pickup date</strong>:{" "}
                        {cartStore.pickupDate}
                    </div>
                )}
            </div>
            <Separator className="my-8" />
            <p className="font-semibold text-lg mb-2">
                Would you like to pay now or when you pickup your order?
            </p>
            <RadioGroup
                className="px-3"
                onValueChange={(e) => cartStore.setPaymentDetails(e)}
                value={cartStore.paymentDetails}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pay-now" id="pay-now" />
                    <Label htmlFor="pay-now" className="text-lg">
                        Pay online now
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pay-later" id="pay-later" />
                    <Label htmlFor="pay-later" className="text-lg">
                        Pay when you pickup{" "}
                        <span className="text-sm text-slate-800">
                            (Cash, Zelle, Venmo only)
                        </span>
                    </Label>
                </div>
            </RadioGroup>
            {canProceed && (
                <>
                    <Separator className="my-8" />
                    <div className="sticky bottom-0 left-0 right-0 shadow-lg">
                        <Button
                            variant={"ghost"}
                            onClick={() =>
                                setCheckoutState(
                                    cartStore.paymentDetails === "pay-now"
                                        ? "checkout"
                                        : "confirmOrder"
                                )
                            }
                            disabled={
                                !cartStore.pickupDate ||
                                !cartStore.paymentDetails
                            }
                            className="group disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed border-2 text-bb-brown border-bb-brown hover:border-bb-brown/80 font-semibold text-sm md:text-lg bg-white py-6 hover:text-bb-brown w-full"
                            title={buttonDetails}
                            aria-label={buttonDetails}
                        >
                            {buttonDetails}
                            <ArrowRight
                                className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                                size={20}
                            />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
