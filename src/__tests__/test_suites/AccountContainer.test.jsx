import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AccountContainer from "./AccountContainer";

describe("AccountContainer", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("displays transactions on startup", async () => {
    const mockTransactions = [
      {
        id: 1,
        date: "2019-12-01",
        description: "Paycheck from Bob's Burgers",
        category: "Income",
        amount: 1000,
      },
      {
        id: 2,
        date: "2019-12-02",
        description: "Movie tickets",
        category: "Entertainment",
        amount: -20,
      },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockTransactions,
    });

    render(<AccountContainer />);

    expect(await screen.findByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    expect(screen.getByText("Movie tickets")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Entertainment")).toBeInTheDocument();
  });
});