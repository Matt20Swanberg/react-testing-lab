import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AccountContainer from "../../components/AccountContainer";

describe("Display Transactions", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("displays transactions on startup", async () => {
    const mockTransactions = [
      {
        id: 1,
        date: "2024-01-01",
        description: "Paycheck",
        category: "Income",
        amount: 1000,
      },
      {
        id: 2,
        date: "2024-01-02",
        description: "Coffee",
        category: "Food",
        amount: -4.5,
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      })
    );

    render(<AccountContainer />);

    expect(await screen.findByText("Paycheck")).toBeInTheDocument();
    expect(screen.getByText("Coffee")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Food")).toBeInTheDocument();
  });
});