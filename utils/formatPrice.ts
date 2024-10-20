const formatPrice = (amount: number) => {
    // console.log({amount});
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(amount / 100);
};

export default formatPrice;
