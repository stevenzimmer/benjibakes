const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(amount / 100);
};

export default formatPrice;
