export type AddCartType = {
    name: string;
    image?: string;
    id: string;
    quantity?: number | 1;
    unit_amount: number | null;
    price_nickname?: string;
    price_id: string;
    nickname?: string;
};

export type CartState = {
    cart: AddCartType[];
    addProduct: (item: AddCartType) => void;
    removeProduct: (item: AddCartType) => void;
    clearCart: () => void;
    onCheckout: string;
    paymentIntent: string;
    setPaymentIntent: (val: string) => void;
    clientSecret: string;
    setClientSecret: (val: string) => void;
    setCheckoutStatus: (val: string) => void;
    pickupDate: string;
    setPickupDate: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    customerId: string;
    setCustomerId: (val: string) => void;
};

export type Price = {
    id: string;
    unit_amount: number;
    nickname: string;
};
