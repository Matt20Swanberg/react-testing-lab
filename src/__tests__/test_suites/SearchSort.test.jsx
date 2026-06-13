import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import AccountContainer from "../../components/AccountContainer";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe("Search Transactions", () => {
    it("filters transactions when the user types in the search input", async () => {
        const mockTransactions = [
            {
                id: 1,
                date: "2024-01-01",
                description: "Groceries",
                category: "Food",
                amount: "45.67",
            },
            {
                id: 2,
                date: "2024-01-02",
                description: "Paycheck",
                category: "Income",
                amount: "1000",
            },
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockTransactions),
            })
        );

        render(<AccountContainer />);

        expect(await screen.findByText("Groceries")).toBeInTheDocument();
        expect(screen.getByText("Paycheck")).toBeInTheDocument();

        fireEvent.change(
            screen.getByPlaceholderText("Search your Recent Transactions"),
            {
                target: { value: "pay" },
            }
        );

        expect(screen.queryByText("Groceries")).not.toBeInTheDocument();
        expect(screen.getByText("Paycheck")).toBeInTheDocument();
    });
    it("sorts transactions by description", async () => {
        const mockTransactions = [
            {
                id: 1,
                date: "2024-01-01",
                description: "Zoo Tickets",
                category: "Entertainment",
                amount: "45.67",
            },
            {
                id: 2,
                date: "2024-01-02",
                description: "Apple Store",
                category: "Shopping",
                amount: "1000",
            },
        ];

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockTransactions),
            })
        );

        render(<AccountContainer />);

        expect(await screen.findByText("Zoo Tickets")).toBeInTheDocument();
        expect(screen.getByText("Apple Store")).toBeInTheDocument();

        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "description" },
        });

        const rows = screen.getAllByRole("row");

        expect(rows[1]).toHaveTextContent("Apple Store");
        expect(rows[2]).toHaveTextContent("Zoo Tickets");
    });
});