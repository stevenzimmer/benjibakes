import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {useContext} from "react";
import ThemeContext from "@/context/ThemeContext";

export default function CheckoutBreadCrumbs() {
    const {setCheckoutState} = useContext(ThemeContext);

    return (
        <Breadcrumb className="mb-6 p-6 bg-slate-200">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className="cursor-pointer"
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
                        className="cursor-pointer"
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
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            setCheckoutState("checkout");
                        }}
                    >
                        Checkout
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
