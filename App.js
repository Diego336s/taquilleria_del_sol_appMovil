import react from "react";

import AppNavegacion from "./Src/Navegation/AppNavegacion";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51SSPXkCZ6VhRGBYOqP9H5yqTgnFoi4gVYtY2KmvB6zihPQJtOhmTqUoHL2mrPGGoD9fU9rTLloXy86WPqhqwolah00h469D1XJ">
      <AppNavegacion />
    </StripeProvider>
  )
}

