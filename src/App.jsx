import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import "./styles/_main.scss";
import ShoppingCartContext from "./components/ShoppingCartContext";

export default function App() {
    const [cart, setCart] = useState([]);

    return (
        <ShoppingCartContext.Provider value={{ cart, setCart }}>
            <div className="app">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </ShoppingCartContext.Provider>
    );
}
