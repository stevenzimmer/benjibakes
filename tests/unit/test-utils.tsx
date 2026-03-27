import React, { useContext } from "react";
import { render } from "@testing-library/react";
import ThemeContext from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import { useCartStore } from "@/store";

const initialCartState = useCartStore.getState();

export function resetCartStore() {
  useCartStore.setState(initialCartState, true);
  useCartStore.persist.clearStorage();
  window.localStorage.removeItem("cart-store");
}

export function seedCartStore(
  partialState: Partial<ReturnType<typeof useCartStore.getState>>,
) {
  resetCartStore();
  useCartStore.setState({
    ...useCartStore.getState(),
    ...partialState,
  });
}

export function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

export function renderWithThemeAndProbe(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      {ui}
      <ThemeStateProbe />
    </ThemeProvider>,
  );
}

function ThemeStateProbe() {
  const { checkoutError, checkoutState } = useContext(ThemeContext);

  return (
    <>
      <div data-testid="checkout-state">{checkoutState}</div>
      <div data-testid="checkout-error">{checkoutError}</div>
    </>
  );
}
