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
});