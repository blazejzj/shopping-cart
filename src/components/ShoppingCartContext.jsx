import React, { createContext } from "react";

const ShoppingCartContext = createContext({
    cart: [],
    setCart: () => {},
});

export default ShoppingCartContext;
