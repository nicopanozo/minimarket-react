import { describe, it, expect } from "vitest";
import { cartReducer, addItem, removeItem } from "../cartSlice";
import { initialState } from "../cartSlice";

describe("addItem", () => {
  it("should initiate with initalState values.", () => {
    const firstState = cartReducer(initialState, {type: "CartState"})
    expect(firstState).toEqual(initialState);
  })

  it("Should add an item into items array and update total quantity and total price.", () => {
    const sampleCartItem = {
      id: crypto.randomUUID(),
      name: "Nintedo switch",
      price: 135,
      quantity: 2,
      
    }

    const newItem = cartReducer(initialState, addItem(sampleCartItem))
    expect(newItem.items.length).toBe(1);
    expect(newItem.items[0]).toEqual(sampleCartItem);
    expect(newItem.totalQuantity).toBe(2);
    expect(newItem.totalPrice).toBe(270);
  })
});

describe("removeItem", () => {
  it("should remove an item from the items array", () => {
    function getMockCartState() {
      return {
        items: [
          { id: "a", name: "Nintendo switch", price: 135, quantity: 2 },
          { id: "b", name: "MacbookPro", price: 1567, quantity: 1 },
          { id: "c", name: "Corsair hs80 Wireless", price: 175, quantity: 4 },
        ],
        totalQuantity: 7,
        totalPrice: 2537,
      };
    }
    const customInitialState = getMockCartState();
    const customNewState = {
      items: [customInitialState.items[0], customInitialState.items[2]],
      totalQuantity: 6,
      totalPrice: 970,
    };

  const newState = cartReducer(customInitialState, removeItem("b"));
  expect(newState).toEqual(customNewState);
  expect(newState.totalQuantity).toBe(6);
  expect(newState.totalPrice).toBe(970)
  });
} 
);