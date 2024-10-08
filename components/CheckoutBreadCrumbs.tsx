import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";
import {useCartStore} from "@/store";

export default function CheckoutBreadCrumbs() {
    const {setCheckoutState, checkoutState} = useContext(ThemeContext);

    const cartStore = useCartStore();
    const canProceedToCheckout = cartStore.pickupDate && cartStore.email;
    return (
        <Breadcrumb className="mb-6 p-6 bg-slate-100 rounded-lg">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className={`${
                            checkoutState === "cart"
                                ? "font-semibold text-neutral-950"
                                : "cursor-pointer"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCheckoutState("cart");
                        }}
                    >
                        Shopping Cart
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink
                        className={`${
                            checkoutState === "pickupDate"
                                ? "font-semibold text-neutral-950"
                                : "cursor-pointer"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            setCheckoutState("pickupDate");
                        }}
                    >
                        Customer Details
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className={`${
                            checkoutState === "checkout"
                                ? "font-semibold text-neutral-950"
                                : "cursor-pointer"
                        } ${
                            canProceedToCheckout
                                ? ""
                                : "text-neutral-300 cursor-not-allowed"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (canProceedToCheckout) {
                                setCheckoutState("checkout");
                            }
                        }}
                    >
                        Checkout
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
