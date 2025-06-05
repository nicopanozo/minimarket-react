import { render, screen } from "@testing-library/react";
import OrderTable from "../OrderTable";

// Simular localStorage antes del render
beforeEach(() => {
  const fakeOrders = [
    {
      id: "order1",
      email: "user@example.com",
      total: 42.5,
      timestamp: new Date("2025-06-01T12:00:00").toISOString(),
      items: [
        { name: "Producto A", quantity: 2 },
        { name: "Producto B", quantity: 1 },
      ],
    },
  ];
  localStorage.setItem("orders", JSON.stringify(fakeOrders));
});

afterEach(() => {
  localStorage.clear();
});

describe("OrderTable", () => {
  it("renderiza encabezados de la tabla", () => {
    render(<OrderTable />);
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/productos/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();
    expect(screen.getByText(/fecha/i)).toBeInTheDocument();
  });

  it("muestra los datos de los pedidos", () => {
    render(<OrderTable />);
    expect(screen.getByText("user@example.com")).toBeInTheDocument();
    expect(screen.getByText("Producto A x2")).toBeInTheDocument();
    expect(screen.getByText("Producto B x1")).toBeInTheDocument();
    expect(screen.getByText("$42.50")).toBeInTheDocument();
    expect(
      screen.getByText("01/06/2025", { exact: false }),
    ).toBeInTheDocument(); // Dependiendo del formato de `toLocaleString`
  });
});
