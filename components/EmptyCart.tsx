import ViewMenuButton from "./ViewMenuButton";

export default function EmptyCart() {
    return (
        <div className="text-center">
            <div className="mb-6">
                <h3 className="text-center text-2xl font-semibold mb-1">
                    Your cart is empty
                </h3>
                <p>Add items to get started</p>
            </div>
            <div className="flex justify-center">
                <ViewMenuButton isCart />
            </div>
        </div>
    );
}
