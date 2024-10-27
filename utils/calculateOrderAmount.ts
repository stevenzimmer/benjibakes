type Item = {
    name: string;
    description: string;
    cost: number;
    image: string;
    quantity: number;
};

export const calculateOrderAmount = (items: Item[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.cost! * item.quantity!;
    }, 0);
    return totalPrice;
};
