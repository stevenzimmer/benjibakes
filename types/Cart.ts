export type AddCartType = {
    title: string;
    image?: string;
    id: string;
    quantity?: number | 1;
    cost: number | null;
    price_nickname?: string;
    price_id: string;
    number?: string;
};

export type CartState = {
    clearStore: () => void;
    cart: AddCartType[];
    addProduct: (item: AddCartType) => void;
    removeProduct: (item: AddCartType) => void;
    clearCart: () => void;
    paymentIntent: string;
    setPaymentIntent: (val: string) => void;
    clientSecret: string;
    setClientSecret: (val: string) => void;
    pickupDate: string;
    setPickupDate: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    paymentDetails: string;
    setPaymentDetails: (val: string) => void;
    name: string;
    setName: (val: string) => void;
    customerId: string;
    setCustomerId: (val: string) => void;
    checkoutLineItems: AddCartType[];
    setCheckoutLineItems: (val: AddCartType[]) => void;
};

export type Price = {
    id: string;
    cost: number;
    number: string;
};
