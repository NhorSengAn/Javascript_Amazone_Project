import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliverDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliverDays: 2,
    priceCents: 499,
  },
  {
    id: "3",
    deliverDays: 3,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (String(option.id) === String(deliveryOptionId)) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

export function validDliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });

  return found;
}
