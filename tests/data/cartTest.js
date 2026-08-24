import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
      <select class="js-quantity-selector-${productId}">
        <option value="1" selected>1</option>
      </select>
    `;
  });

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();
    addToCart({ dataset: { productId } });
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    spyOn(localStorage, "setItem");
    loadFromStorage();

    addToCart({ dataset: { productId } });

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(1);
  });
});
