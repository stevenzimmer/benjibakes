import {Input} from "@/components/ui/input";
import {Check} from "lucide-react";
import {Label} from "@/components/ui/label";
import {useState, useRef} from "react";
import {Button} from "@/components/ui/button";
import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useCartStore} from "@/store";
import {Separator} from "@/components/ui/separator";
import {ArrowRight} from "lucide-react";
import {useToast} from "@/hooks/use-toast";

export default function CustomerDetails() {
    const cartStore = useCartStore();
    const {toast} = useToast();

    const [email, setEmail] = useState<string>(cartStore.email ?? "");
    const [name, setName] = useState<string>(cartStore.name ?? "");
    const [isFetching, setIsFetching] = useState(false);

    const ref = useRef<HTMLInputElement>(null);
    const {setCheckoutState, setCheckoutError, checkoutError} = useContext(
        ThemeContext
    );

    const handleFetchCustomer = async ({
        email,
        name,
    }: {
        email: string;
        name: string;
    }) => {
        setCheckoutError("");
        setIsFetching(true);
        // console.log("fetching customer email", email);
        // console.log("fetching customer id", cartStore.customerId);
        if (!email) return;
        // if (cartStore.customerId) return;
        const response = await fetch("/api/fetch-customer", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                name,
            }),
        });

        const data = await response.json();

        if (data.error) {
            // console.error(data.error);
            // setEmail("");
            cartStore.setEmail("");
            ref.current && ref?.current.focus();
            setCheckoutError(data.error);
            toast({
                title: "Error",
                description: data.error,
                variant: "destructive",
            });
            setIsFetching(false);
            return;
        }

        setIsFetching(false);

        console.log({data});

        setEmail(data.customer.email);
        setName(data.customer.name);

        cartStore.setEmail(data.customer.email);
        cartStore.setName(data.customer.name);

        cartStore.setCustomerId(data.customer.id);

        toast({
            title: `Welcome, ${data.customer.name}!`,
            description:
                "Next step is to provide a pickup date and payment preference.",
        });

        setCheckoutState("pickupDate");
    };

    const canProceed =
        cartStore.email === email &&
        cartStore.name === name &&
        cartStore.customerId;

    console.log({canProceed});

    return (
        <div>
            <div className="mb-6">
                <Label
                    htmlFor="name"
                    className="font-semibold text-lg mb-2 inline-block"
                >
                    First and last name
                </Label>
                <div className="relative">
                    <Input
                        ref={ref}
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        className={`mb-3 text-lg py-6 block w-full disabled:bg-slate-100 ${
                            canProceed ? "bg-slate-100" : ""
                        }`}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {canProceed && (
                        <div className="absolute right-0 top-0 bottom w-16 md:w-24 flex items-center justify-center h-full bg-green-400 rounded-lg ">
                            <Check className="text-white" />
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-6">
                <Label
                    htmlFor="email"
                    className="font-semibold text-lg mb-2 inline-block"
                >
                    Email address
                </Label>
                <div className="relative">
                    <Input
                        ref={ref}
                        id={"email"}
                        type="email"
                        placeholder="Email"
                        value={email}
                        className={`mb-3 text-lg py-6 block w-full  ${
                            canProceed ? "bg-slate-100" : ""
                        }`}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {canProceed && (
                        <div className="absolute right-0 top-0 bottom w-16 md:w-24 flex items-center justify-center h-full bg-green-400 rounded-lg">
                            <Check className="text-white" />
                        </div>
                    )}
                </div>
            </div>

            {checkoutError && (
                <div className="text-red-500 p-6 bg-red-200 mb-6 rounded-lg">
                    {checkoutError}
                </div>
            )}
            {!canProceed ? (
                <Button
                    className="group disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed border-2 text-bb-brown border-bb-brown hover:border-bb-brown/80 font-semibold text-lg py-6 hover:text-bb-brown disabled:border-bb-brown/20 bg-white"
                    variant={"ghost"}
                    disabled={!email || !name || isFetching}
                    onClick={() => {
                        handleFetchCustomer({
                            email,
                            name,
                        });
                    }}
                >
                    Set pickup details{" "}
                    {!isFetching ? (
                        <ArrowRight
                            className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                            size={16}
                        />
                    ) : (
                        <svg
                            className="animate-spin ml-2 h-5 w-5 text-bb-blue"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    )}
                </Button>
            ) : (
                <>
                    <Separator className="my-8" />
                    <h2 className="font-semibold mb-3 text-xl">
                        Welcome, {cartStore.name}!
                    </h2>
                    <p className="mb-6">
                        Next step is to provide a pickup date and payment
                        preference.
                    </p>
                    <div className="sticky bottom-0 left-0 right-0 shadow-lg">
                        <Button
                            className="group disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed border-2 text-bb-brown border-bb-brown hover:border-bb-brown/80 font-semibold text-sm md:text-lg py-6 hover:text-bb-brown w-full bg-white"
                            variant="outline"
                            onClick={() => {
                                setCheckoutState("pickupDate");
                            }}
                        >
                            Provide pickup and payment details{" "}
                            <ArrowRight
                                className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                                size={16}
                            />
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
