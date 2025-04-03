import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShopPage from "../components/ShopPage";
import ShoppingCartContext from "../components/ShoppingCartContext";

describe("ShopPage component", () => {
    beforeEach(() => {
        vi.spyOn(globalThis, "fetch");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("title renders correctly", () => {
        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        const shopPageTitle = screen.getByRole("heading", {
            name: /Products/i,
        });
        expect(shopPageTitle).toBeInTheDocument();
    });

    it("displays an error message when the API call fails", async () => {
        fetch.mockRejectedValueOnce(new Error("API error!"));

        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        const errorMessage = await screen.findByText(
            /Couldn't fetch products at this moment.../i
        );
        expect(errorMessage).toBeInTheDocument();
    });

    it("displays the loading message while fetching data", async () => {
        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        const loadingMessage = await screen.findByText(/Loading products.../i);
        expect(loadingMessage).toBeInTheDocument();
    });

    it("api call returns empty list", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        expect(await screen.findByText(/No data fetched./i));
    });

    it("displays product details correctly when API returns items", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 0,
                    title: "testTitle",
                    price: 0,
                    image: "imageSrc",
                },
            ],
        });

        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        const productTitle = await screen.findByRole("heading", {
            name: "testTitle",
        });
        expect(productTitle).toBeInTheDocument();

        const priceText = await screen.findByText(/0 NOK/i);
        expect(priceText).toBeInTheDocument();

        const productImage = await screen.findByRole("img", {
            name: "testTitle",
        });
        expect(productImage).toBeInTheDocument();
        expect(productImage).toHaveAttribute(
            "src",
            expect.stringContaining("imageSrc")
        );
    });

    it("add a product to the shopping cart", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 0,
                    title: "testTitle",
                    price: 0,
                    image: "imageSrc",
                },
            ],
        });

        const mockSetCart = vi.fn();

        render(
            <MemoryRouter>
                <ShoppingCartContext.Provider value={{ setCart: mockSetCart }}>
                    <ShopPage />
                </ShoppingCartContext.Provider>
            </MemoryRouter>
        );

        // wait for products
        await screen.findByRole("heading", { name: "testTitle" });

        // simualte user setting an amount
        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: 1 } });

        // simulate submit "Add to Cart"
        const addToCartButton = screen.getByRole("button", {
            name: /Add to cart/i,
        });
        fireEvent.click(addToCartButton);

        // expect setCart to be called
        expect(mockSetCart).toHaveBeenCalled();
    });

    it("does not call setCart when trying to add 0 products", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 0,
                    title: "testTitle",
                    price: 0,
                    image: "imageSrc",
                },
            ],
        });

        const mockSetCart = vi.fn();

        render(
            <MemoryRouter>
                <ShoppingCartContext.Provider value={{ setCart: mockSetCart }}>
                    <ShopPage />
                </ShoppingCartContext.Provider>
            </MemoryRouter>
        );

        // wait for products
        await screen.findByRole("heading", { name: "testTitle" });

        // simualte user setting an amount
        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: 0 } });

        // simulate submit "Add to Cart"
        const addToCartButton = screen.getByRole("button", {
            name: /Add to cart/i,
        });
        fireEvent.click(addToCartButton);

        // expect setCart to be called
        expect(mockSetCart).not.toHaveBeenCalled();
    });

    it("incrementing products quantity", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 0,
                    title: "testTitle",
                    price: 0,
                    image: "imageSrc",
                },
            ],
        });

        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        // wait for products
        await screen.findByRole("heading", { name: "testTitle" });

        const productQuantityInput = screen.getByRole("spinbutton");
        expect(productQuantityInput).toHaveValue(0);

        const incrementButton = screen.getByLabelText(
            /increment-product-counter/i
        );
        fireEvent.click(incrementButton);

        expect(productQuantityInput).toHaveValue(1);
    });

    it("decrementing product quantity", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                { id: 0, title: "testTitle", price: 0, image: "imageSrc" },
            ],
        });

        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        const input = await screen.findByRole("spinbutton");
        expect(input).toHaveValue(0);

        // increment
        const incrementButton = screen.getByLabelText(
            /increment-product-counter/i
        );
        fireEvent.click(incrementButton);
        expect(input).toHaveValue(1);

        // decrement
        const decrementButton = screen.getByLabelText(
            /decrement-product-counter/i
        );
        fireEvent.click(decrementButton);
        expect(input).toHaveValue(0);

        // decrement again expect still 0 (EDGE CASE)
        fireEvent.click(decrementButton);
        expect(input).toHaveValue(0);
    });

    it("renders multiple products when API returns several items", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                { id: 0, title: "testTitle", price: 0, image: "imageSrc" },
                { id: 1, title: "testTitle2", price: 10, image: "imageSrc2" },
            ],
        });

        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        const product1 = await screen.findByRole("heading", {
            name: "testTitle",
        });
        const product2 = await screen.findByRole("heading", {
            name: "testTitle2",
        });
        expect(product1).toBeInTheDocument();
        expect(product2).toBeInTheDocument();
    });

    it("accumulates product quantity when adding the same product multiple times", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                { id: 0, title: "testTitle", price: 0, image: "imageSrc" },
            ],
        });

        const mockSetCart = vi.fn();

        render(
            <MemoryRouter>
                <ShoppingCartContext.Provider value={{ setCart: mockSetCart }}>
                    <ShopPage />
                </ShoppingCartContext.Provider>
            </MemoryRouter>
        );

        await screen.findByRole("heading", { name: "testTitle" });
        const input = screen.getByRole("spinbutton");
        const addToCartButton = screen.getByRole("button", {
            name: /Add to cart/i,
        });

        fireEvent.change(input, { target: { value: 2 } });
        expect(input).toHaveValue(2);
        fireEvent.click(addToCartButton);

        const firstCallCallback = mockSetCart.mock.calls[0][0];
        const result1 = firstCallCallback([]);
        expect(result1).toEqual([
            {
                id: 0,
                title: "testTitle",
                price: 0,
                image: "imageSrc",
                quantity: 2,
            },
        ]);

        fireEvent.change(input, { target: { value: 3 } });
        expect(input).toHaveValue(3);
        fireEvent.click(addToCartButton);

        const secondCallCallback = mockSetCart.mock.calls[1][0];
        const result2 = secondCallCallback([
            {
                id: 0,
                title: "testTitle",
                price: 0,
                image: "imageSrc",
                quantity: 2,
            },
        ]);
        expect(result2).toEqual([
            {
                id: 0,
                title: "testTitle",
                price: 0,
                image: "imageSrc",
                quantity: 5,
            },
        ]);
    });

    it("updates input value correctly when typing", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                { id: 0, title: "testTitle", price: 0, image: "imageSrc" },
            ],
        });

        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        const input = await screen.findByRole("spinbutton");
        expect(input).toHaveValue(0);

        fireEvent.change(input, { target: { value: 5 } });
        expect(input).toHaveValue(5);
    });

    it("sets input value to 0 when a non-numeric value is entered", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [
                { id: 0, title: "testTitle", price: 0, image: "imageSrc" },
            ],
        });

        render(
            <MemoryRouter>
                <ShopPage />
            </MemoryRouter>
        );

        const input = await screen.findByRole("spinbutton");
        expect(input).toHaveValue(0);

        fireEvent.change(input, { target: { value: "abc" } });
        expect(input).toHaveValue(0);
    });
});
