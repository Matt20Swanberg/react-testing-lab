import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

import AccountContainer from "../../components/AccountContainer";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("Add Transactions", () => {
    it("adds a new transaction to the frontend and calls POST", async () => {
        const startingTransactions = [];

        const newTransaction = {
            id: 1,
            date: "2024-01-03",
            description: "Groceries",
            category: "Food",
            amount: "45.67",
        };

        global.fetch = vi
            .fn()
            .mockResolvedValueOnce({
                json: () => Promise.resolve(startingTransactions),
            })
            .mockResolvedValueOnce({
                json: () => Promise.resolve(newTransaction),
            });

        render(<AccountContainer />);

        fireEvent.change(screen.getByPlaceholderText("Description"), {
            target: { value: "Groceries" },
        });

        fireEvent.change(screen.getByPlaceholderText("Category"), {
            target: { value: "Food" },
        });

        fireEvent.change(screen.getByPlaceholderText("Amount"), {
            target: { value: "45.67" },
        });

        const dateInput = document.querySelector('input[name="date"]');

        fireEvent.change(dateInput, {
            target: { value: "2024-01-03" },
        });

        fireEvent.click(screen.getByText("Add Transaction"));

        expect(await screen.findByText("Groceries")).toBeInTheDocument();
        expect(screen.getByText("Food")).toBeInTheDocument();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                "http://localhost:6001/transactions",
                expect.objectContaining({
                    method: "POST",
                })
            );
        });
    });
});