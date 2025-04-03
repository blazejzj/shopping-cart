import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../components/HomePage";

describe("HomePage component", () => {
    it("welcoming page exists and displays", () => {
        <MemoryRouter>
            <Header />
            <HomePage />
        </MemoryRouter>;

        const header = screen.getByRole("heading", {
            name: /Welcome To Shop.*U/i,
        });
        expect(header).toBeInTheDocument();
    });
});
