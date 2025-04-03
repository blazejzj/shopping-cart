import React, { useState } from "react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import HomePage from "../components/HomePage";
import ShopPage from "../components/ShopPage";
import { MemoryRouter } from "react-router-dom";
import ShoppingCartContext from "../components/ShoppingCartContext";

const MockShoppingCartProvider = ({ children, initialCart = [] }) => {
    const [cart, setCart] = useState(initialCart);
    return (
        <ShoppingCartContext.Provider value={{ cart, setCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

describe("Header component", () => {
    it("logo renders and is possible to press redirecting to home", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
        const logoTitle = screen.getByRole("heading", {
            name: /Shop.*U/i,
        });
        expect(logoTitle).toBeInTheDocument();

        const logoTitleLink = screen.getByRole("link", { name: /Shop.*U/i });
        expect(logoTitleLink).toBeInTheDocument();
        expect(logoTitleLink.getAttribute("href")).toBe("/");
    });

    it("home page has signature current page styling when on page", () => {
        // HomePage has / path
        render(
            <MemoryRouter>
                <Header />
                <HomePage />
            </MemoryRouter>
        );

        const navHomePageElement = screen.getByRole("link", { name: /Home/i });
        expect(navHomePageElement).toBeInTheDocument();
        expect(navHomePageElement).toHaveClass(
            "currentPage default-link-element"
        );
    });

    it("shop page has signature current page styling when on page", async () => {
        // ShopPage has /shop path
        render(
            <MemoryRouter initialEntries={["/shop"]}>
                <Header />
                <ShopPage />
            </MemoryRouter>
        );

        const navShopPageElement = screen.getByRole("link", {
            name: /Our Shop/i,
        });

        expect(navShopPageElement).toBeInTheDocument();
        expect(navShopPageElement).toHaveClass("currentPage");
    });

    it("shopping cart icon cart badge updates with the amount of items inside the cart", async () => {
        render(
            <MemoryRouter>
                <MockShoppingCartProvider initialCart={[{ quantity: 3 }]}>
                    <Header />
                </MockShoppingCartProvider>
            </MemoryRouter>
        );
        const cartBadge = screen.getByText("3");
        expect(cartBadge).toBeInTheDocument();
    });

    it("shopping cart button shows and hides the active shopping cart state upon press", async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const shoppingCartButton = screen.getByRole("button", {
            name: /shopping-cart-button/i,
        });
        expect(shoppingCartButton).toBeInTheDocument();

        const cartOverlay = screen.getByRole("region", {
            name: /cartOverlay/i,
        });

        expect(cartOverlay).toBeInTheDocument();
        expect(cartOverlay).not.toHaveClass("visible");

        await user.click(shoppingCartButton);

        expect(cartOverlay).toHaveClass("visible");

        await user.click(shoppingCartButton);

        expect(cartOverlay).not.toHaveClass("visible");
    });

    it("products render in shopping cart when added", async () => {
        const user = userEvent.setup();

        let cart = [];

        const Wrapper = ({ children }) => {
            const [localCart, setLocalCart] = useState(cart);
            cart = localCart;
            return (
                <MemoryRouter>
                    <ShoppingCartContext.Provider
                        value={{ cart: localCart, setCart: setLocalCart }}
                    >
                        {children}
                    </ShoppingCartContext.Provider>
                </MemoryRouter>
            );
        };

        render(<Header />, { wrapper: Wrapper });

        await user.click(
            screen.getByRole("button", { name: /shopping-cart-button/i })
        );

        expect(
            await screen.findByText(/Your cart is empty./i)
        ).toBeInTheDocument();

        cart.push({
            id: 1,
            title: "Test Product",
            quantity: 2,
            image: "dummy.jpg",
            price: 10,
        });

        await user.click(
            screen.getByRole("button", { name: /shopping-cart-button/i })
        );
        await user.click(
            screen.getByRole("button", { name: /shopping-cart-button/i })
        );

        expect(screen.queryByText(/Your cart is empty./i)).toBeNull();
        expect(await screen.findByText(/Test Product/i)).toBeInTheDocument();
        expect(screen.getByText(/Quantity: 2/i)).toBeInTheDocument();
    });

    it("renders products with correct layout in shopping cart", async () => {
        const product = {
            id: 1,
            title: "Test Product",
            quantity: 2,
            image: "dummy.jpg",
            price: 10,
        };

        const { container } = render(
            <MemoryRouter>
                <MockShoppingCartProvider initialCart={[product]}>
                    <Header />
                </MockShoppingCartProvider>
            </MemoryRouter>
        );

        const shoppingCartButton = screen.getByRole("button", {
            name: /shopping-cart-button/i,
        });
        await userEvent.click(shoppingCartButton);

        const cartItems = container.querySelectorAll(".cart-item");
        expect(cartItems).toHaveLength(1);
        const cartItem = cartItems[0];

        const imageElement = cartItem.querySelector("img");
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute("src", product.image);
        expect(imageElement).toHaveAttribute("alt", product.title);

        const detailsElement = cartItem.querySelector(".cart-item-details");
        expect(detailsElement).toBeInTheDocument();
        expect(detailsElement).toHaveTextContent(product.title);
        expect(detailsElement).toHaveTextContent(
            `Quantity: ${product.quantity}`
        );
    });
});
