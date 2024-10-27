// "use client";
// import {useCartStore} from "@/store";
// import {motion} from "framer-motion";
// import PickupDate from "./PickupDate";
// import ShoppingCart from "./ShoppingCart";

// // import {useToast} from "@/components/ui/use-toast";
// // import {PackageOpen} from "lucide-react";
// // import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
// // import {Button} from "./ui/button";
// // import Success from "@/components/Success";
// import Checkout from "./Checkout";

// import {useContext} from "react";
// import ThemeContext from "@/context/ThemeContext";
// import EmptyCart from "./EmptyCart";
// import Success from "./Success";
// import CheckoutBreadCrumbs from "./CheckoutBreadCrumbs";

// export default function Sidebar() {
//     const cartStore = useCartStore();
//     const {setShowSidebar, setShowCheckout, checkoutState} = useContext(
//         ThemeContext
//     );

//     // console.log({totalPrice});

//     // const {toast} = useToast();
//     console.log({checkoutState});

//     return (
//         <motion.div
//             initial={{opacity: 0}}
//             animate={{opacity: 1}}
//             exit={{opacity: 0}}
//             className="fixed w-full h-screen inset-0 bg-black/50 z-40"
//             onClick={() => {
//                 setShowSidebar(false);
//                 setShowCheckout(false);
//             }}
//         >
//             <motion.div
//                 layout
//                 onClick={(e) => e.stopPropagation()}
//                 className="bg-white absolute right-0 top-0 bottom-0 w-11/12 sm:w-9/12 md:w-2/3 lg:w-1/4 h-screen py-3 px-6 overflow-y-scroll drop-shadow-xl"
//             >
//                 <CheckoutBreadCrumbs />
//                 {checkoutState === "cart" && (
//                     <>
//                         {cartStore.cart.length > 0 ? (
//                             <ShoppingCart />
//                         ) : (
//                             <EmptyCart />
//                         )}
//                     </>
//                 )}
//                 {checkoutState === "pickupDate" && <PickupDate />}
//                 {checkoutState === "checkout" && <Checkout />}
//                 {checkoutState === "confirmOrder" && <div>didsdfsdfasdf</div>}
//                 {checkoutState === "success" && <Success />}
//             </motion.div>
//         </motion.div>
//     );
// }
