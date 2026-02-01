import ViewMenuButton from "./ViewMenuButton";

export default function EmptyCart() {
    return (
        <div className="text-center rounded-2xl border border-bb-brown-20 bg-white/90 p-8 shadow-sm">
            <div className="mb-6">
                <h3 className="text-center text-2xl font-semibold mb-1 text-bb-ink">
                    Your cart is empty
                </h3>
                <p className="text-bb-brown/80">Add items to get started</p>
            </div>
            <div className="flex justify-center">
                <ViewMenuButton isCart />
            </div>
        </div>
    );
}
