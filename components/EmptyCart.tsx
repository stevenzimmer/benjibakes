import ViewMenuButton from "./ViewMenuButton";

export default function EmptyCart() {
    return (
        <>
            <p className="text-center text-xl font-semibold mb-6">
                Cart is empty
            </p>
            <div className="flex justify-center">
                <ViewMenuButton />
            </div>
        </>
    );
}
