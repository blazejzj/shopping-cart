import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorPage from "../components/ErrorPage";
import { MemoryRouter } from "react-router-dom";

describe("ErrorPage component", () => {
    it("renders error message and link to home", () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        const errorHeading = screen.getByText(/Something bad happened/i);
        expect(errorHeading).toBeInTheDocument();

        const link = screen.getByRole("link", {
            name: /Click here to return home/i,
        });
        expect(link).toBeInTheDocument();
        expect(link.getAttribute("href")).toBe("/");
    });
});
