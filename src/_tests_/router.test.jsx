import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ShopPage from "../components/ShopPage";
import ErrorPage from "../components/ErrorPage";
import HomePage from "../components/HomePage";
import App from "../App";

describe("Router component defining all routes within the site", () => {
    it("renders HomePage at root route", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route index element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </MemoryRouter>
        );

        const homePageTitle = screen.getByRole("heading", {
            name: /Welcome To Shop.*U/i,
        });
        expect(homePageTitle).toBeInTheDocument();
    });

    it("renders ShopPage at shop route", () => {
        render(
            <MemoryRouter initialEntries={["/shop"]}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route index element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </MemoryRouter>
        );

        const shopPageTitle = screen.getByRole("heading", {
            name: /Products/i,
        });
        expect(shopPageTitle).toBeInTheDocument();
    });

    it("renders ErrorPage for unknown route", () => {
        render(
            <MemoryRouter initialEntries={["/unknownRoute"]}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route index element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </MemoryRouter>
        );

        const errorPageTitle = screen.getByRole("heading", {
            name: /Dang! Something bad happened!*/i,
        });
        expect(errorPageTitle).toBeInTheDocument();
    });
});
