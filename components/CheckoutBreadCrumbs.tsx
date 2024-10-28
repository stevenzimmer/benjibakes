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

    const canProceedToCustomerDetails = cartStore.cart.length > 0;
    const canProceedToOrderDetails = cartStore.email && cartStore.name;

    const canProceedToCheckout =
        canProceedToCustomerDetails &&
        canProceedToOrderDetails &&
        cartStore.pickupDate;

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
                            checkoutState === "customerDetails"
                                ? "font-semibold text-neutral-950"
                                : ""
                        } ${
                            canProceedToCustomerDetails
                                ? "cursor-pointer"
                                : "cursor-not-allowed text-neutral-300 hover:text-neutral-300"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (canProceedToCustomerDetails) {
                                setCheckoutState("customerDetails");
                            }
                        }}
                    >
                        Customer Details
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbLink
                        className={`${
                            checkoutState === "orderDetails"
                                ? "font-semibold text-neutral-950"
                                : ""
                        } ${
                            canProceedToOrderDetails
                                ? "cursor-pointer"
                                : "cursor-not-allowed text-neutral-300 hover:text-neutral-300"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (canProceedToOrderDetails) {
                                setCheckoutState("orderDetails");
                            }
                        }}
                    >
                        Order Details
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className={`${
                            checkoutState === "checkout" ||
                            checkoutState === "confirmOrder"
                                ? "font-semibold text-neutral-950"
                                : "cursor-pointer"
                        } ${
                            canProceedToCheckout && canProceedToOrderDetails
                                ? ""
                                : "text-neutral-300 cursor-not-allowed hover:text-neutral-300"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            if (
                                canProceedToCheckout &&
                                canProceedToOrderDetails
                            ) {
                                setCheckoutState(
                                    cartStore.paymentDetails === "pay-now"
                                        ? "checkout"
                                        : "confirmOrder"
                                );
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
