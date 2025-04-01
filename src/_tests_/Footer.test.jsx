import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { MemoryRouter } from "react-router-dom";

describe("Footer component", () => {
    it("renders clickable logo redirecting to home", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const footerLogoTitle = screen.getByRole("heading", {
            name: /Shop.*U/i,
        });
        expect(footerLogoTitle).toBeInTheDocument();

        const footerLogoLink = screen.getByRole("link", { name: /Shop.*U/i });
        expect(footerLogoLink).toBeInTheDocument();
        expect(footerLogoLink.getAttribute("href")).toBe("/");
    });

    it("informational bullet points generate and the amount is right", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );
        const liElements = screen.getAllByRole("listitem");
        expect(liElements).toHaveLength(12);
    });

    it("github link renders and redirects to correct profile", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        const githubName = screen.getByText(/blazejzj/i);
        expect(githubName).toBeInTheDocument();

        const githubNameLink = screen.getByRole("link", { name: /blazejzj/i });
        expect(githubNameLink).toBeInTheDocument();

        expect(githubNameLink.getAttribute("href")).toBe(
            "https://github.com/blazejzj"
        );
    });
});
