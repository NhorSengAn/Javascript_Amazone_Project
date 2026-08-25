import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";

  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
      <select class="js-quantity-selector-${productId}">
        <option value="1" selected>1</option>
      </select>
    `;
  });
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("adds an  existing product to the cart", () => {
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
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ]),
    );
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart({ dataset: { productId } });

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(1);
  });
});

describe("test suits : removeFromCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("removes a product from the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();

    removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([]),
    );
  });

  it("does nothing if product it not in the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    removeFromCart("does-not-exits");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]),
    );
  });
});
describe("test suites : updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("updates the deliver option", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("3");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "3",
        },
      ]),
    );
  });

  it("does nothing if the product is not in the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    updateDeliveryOption("does-not-exits", "3");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("does nothing if the deliveryoption does not exits", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    updateDeliveryOption(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "does-not-exits",
    );
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
