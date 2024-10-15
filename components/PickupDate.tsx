"use client";
import {useState, useRef} from "react";
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
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Check, X} from "lucide-react";
export default function PickupDate() {
    const cartStore = useCartStore();
    const [date, setDate] = useState<Date>();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const {setCheckoutState, setCheckoutError, checkoutError} = useContext(
        ThemeContext
    );

    const [email, setEmail] = useState<string>(cartStore.email ?? "");

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
                // console.log({disabledDateObj});
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

    const handleSetEmail = async (e: any) => {
        handleFetchCustomer(email);
        cartStore.setCustomerId("");
        cartStore.setPickupDate("");
        cartStore.setPaymentIntent("");
        cartStore.setClientSecret("");
    };

    const handleChangeEmail = (e: any) => {
        // setEmail("");
        // setCheckoutError("");
        ref.current && ref?.current.focus();
        cartStore.setEmail("");
        cartStore.setCustomerId("");
        cartStore.setPickupDate("");
        cartStore.setPaymentIntent("");
        cartStore.setClientSecret("");
    };

    const handleFetchCustomer = async (email: string) => {
        setCheckoutError("");
        console.log("fetching customer email", email);
        console.log("fetching customer id", cartStore.customerId);
        if (!email) return;
        if (cartStore.customerId) return;
        const response = await fetch("/api/fetch-customer", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            setEmail("");
            cartStore.setEmail("");
            ref.current && ref?.current.focus();
            setCheckoutError(data.error);
            return;
        }

        cartStore.setEmail(data.customer.email);

        console.log(data.customer);

        cartStore.setCustomerId(data.customer.id);
    };

    return (
        <div className="pb-6">
            <div className="mb-6">
                <Label
                    htmlFor="email"
                    className="font-semibold text-lg mb-2 inline-block"
                >
                    Your email address
                </Label>
                <div className="relative">
                    <Input
                        ref={ref}
                        id={"email"}
                        type="email"
                        placeholder="Email"
                        value={email}
                        disabled={!!cartStore.email}
                        className={`mb-3 text-lg py-6 block w-full disabled:bg-slate-100 ${cartStore.email &&
                            "border-green-400"}`}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {!cartStore.email && (
                        <Button
                            onClick={handleSetEmail}
                            title="Set email address"
                            className="absolute right-0 top-0 h-full bg-green-400 hover:bg-green/50 "
                            aria-label="Set email address"
                        >
                            <Check />
                        </Button>
                    )}
                    {cartStore.email && (
                        <Button
                            className="absolute right-0 top-0 h-full bg-red-400 hover:bg-red-400/50"
                            onClick={handleChangeEmail}
                            title="Change email address"
                            aria-label="Change email address"
                        >
                            <X />
                        </Button>
                    )}
                </div>
            </div>

            {checkoutError && (
                <div className="text-red-500 p-6 bg-red-200 mb-6 rounded-lg">
                    {checkoutError}, please try again
                </div>
            )}
            <Separator className="my-6" />

            <div className="mb-12">
                <p className="font-semibold mb-3">Select your pickup date:</p>
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
                                <span>Select a new pickup date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(e) =>
                                setDate(() => {
                                    // console.log({e});
                                    // console.log({state});
                                    cartStore.setPickupDate(
                                        format(e as Date, "PPP")
                                    );
                                    setIsCalendarOpen(false);
                                    return e;
                                })
                            }
                            initialFocus
                            defaultMonth={date}
                            disabled={setDisabledPickupDates}
                        />
                    </PopoverContent>
                </Popover>
                {cartStore.pickupDate && (
                    <div className="p-6 bg-slate-100 rounded-lg mt-3">
                        <strong>Current selected pickup date</strong>:{" "}
                        {cartStore.pickupDate}
                    </div>
                )}
            </div>
            <Button
                variant={"ghost"}
                onClick={() => setCheckoutState("checkout")}
                disabled={!cartStore.email || !cartStore.pickupDate}
            >
                Proceed to checkout{" "}
                <ArrowRight
                    className="ml-3 group-hover:translate-x-1 transition-transform duration-200"
                    size={20}
                />
            </Button>
        </div>
    );
}
