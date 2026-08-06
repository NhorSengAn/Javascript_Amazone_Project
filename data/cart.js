export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addToCatt(button) {
  const { productId } = button.dataset;

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySector = document.querySelector(
    `.js-quantity-selector-${productId}`,
  );

  const quantity = Number(quantitySector.value);
  if (matchingItem) {
    matchingItem.quantity += quantity; // update quantity on that object
  } else {
    cart.push({
      productId,
      quantity,
    });
  }
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
}
