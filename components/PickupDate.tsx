"use client";
import {useEffect, useState, useRef} from "react";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useCartStore} from "@/store";
import {ArrowRight} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

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
        <div className="py-6">
            <div className="mb-6">
                <Label
                    htmlFor="email"
                    className="font-semibold text-lg mb-2 inline-block"
                >
                    Your email address
                </Label>
                <div className="relative">
                    <Input
                        id={"email"}
                        type="email"
                        placeholder="Email"
                        value={email}
                        disabled={!!cartStore.email}
                        className="mb-3 text-lg py-6 block w-full disabled:bg-slate-100"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!cartStore.email && (
                        <Button
                            onClick={handleSetEmail}
                            className="absolute right-0 top-0 h-full"
                        >
                            Set email
                        </Button>
                    )}
                </div>
                {cartStore.email && (
                    <div className="flex items-center px-6">
                        <p className="mr-6">Not you?</p>
                        <Button onClick={handleChangeEmail}>
                            Change your email address
                        </Button>
                    </div>
                )}
            </div>

            {checkoutError && (
                <div className="text-red-500 p-6 bg-red-200 mb-6 rounded-lg">
                    {checkoutError}, please try again
                </div>
            )}
            <div className="mb-12">
                <p className="font-semibold mb-3">Select your pickup date:</p>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal text-lg py-6",
                                !date && "text-muted-foreground"
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
            </div>
            <Button
                variant={"ghost"}
                onClick={() => setCheckoutState("checkout")}
                disabled={!cartStore.email || !cartStore.pickupDate}
            >
                Finalize Checkout{" "}
                <ArrowRight
                    className="ml-3 group-hover:translate-x-1 transition-transform duration-200"
                    size={20}
                />
            </Button>
        </div>
    );
}

// import {SetStateAction, useState} from "react";
// import DatePicker from "react-date-picker";

// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";
// import CheckoutButton from "./CheckoutButton";

// export default function PickupDate() {

//     const [value, setValue] = useState<Date>(new Date());
//

//     const handleChange = (value: SetStateAction<Date>) => {
//         console.log({value});

//         setValue(value);
//         cartStore.setPickupDateTime(value ? value.toString() : "");
//     };

//     const handleBackToCart = () => {
//         setCheckoutState("cart");
//     };

//     const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
//         // setEmail(e.target.value);
//         cartStore.setEmail(email);
//     };

//     return (
//         <div className="mb-6">
//             <button onClick={handleBackToCart}>Back to cart</button>

//             {!cartStore.email && (
//                 <>
//                     <p>Enter your email</p>
//                     <input
//                         type="text"
//                         onChange={(e) => setEmail(e.target.value)}
//                         value={email}
//                     />
//                     <button onClick={handleSetEmail}>Set email</button>
//                 </>
//             )}
//             <div>Email: {cartStore.email}</div>
//             <div onClick={() => cartStore.setEmail("")}>Change Email</div>
//             <p className="mb-3">Step 2: Select your pickup date</p>
//             <DatePicker
//                 className={`block`}
//                 onChange={handleChange}
//                 value={value}
//             />
//             {cartStore.pickupDateTime && (
//                 <div className="my-6">
//                     Pickup Date:{" "}
//                     {new Intl.DateTimeFormat("en-US").format(
//                         new Date(cartStore.pickupDateTime)
//                     )}
//                 </div>
//             )}
//             <CheckoutButton />
//         </div>
//     );
// }
