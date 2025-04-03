import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../components/HomePage";

describe("HomePage component", () => {
    it("welcoming page exists and displays", () => {
        render(
            <MemoryRouter>
                <Header />
                <HomePage />
            </MemoryRouter>
        );

        const header = screen.getByRole("heading", {
            name: /Welcome To Shop.*U/i,
        });
        expect(header).toBeInTheDocument();
    });

    it("image displays with correct width and height", () => {
        render(
            <MemoryRouter>
                <Header />
                <HomePage />
            </MemoryRouter>
        );

        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();

        expect(image).toHaveAttribute(
            "src",
            expect.stringContaining("mainPage.svg")
        );

        // width and height
        expect(image).toHaveAttribute("width", "400");
        expect(image).toHaveAttribute("height", "400");
    });
});
