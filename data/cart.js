export const cart = [];
export function addToCatt(button) {
  const { productId } = button.dataset;

  let matchingItem;
  cart.forEach((cartitem) => {
    if (productId === cartitem.productId) {
      matchingItem = cartitem;
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
