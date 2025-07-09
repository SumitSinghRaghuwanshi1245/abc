export const cartStorage = {
  getItems: () => {
    const items = JSON.parse(localStorage.getItem("cart-storage") || "[]");
    return Array.isArray(items) ? items : [];
  },

  setItems: (items) => {
    localStorage.setItem("cart-storage", JSON.stringify(items));
  },

  addItem: (item) => {
    const items = cartStorage.getItems();
    const existingItemIndex = items.findIndex((i) =>
      i._id === item._id && JSON.stringify(i.configuration) === JSON.stringify(item.configuration)
    );

    if (existingItemIndex !== -1) {
      items[existingItemIndex].quantity += item.quantity;
    } else {
      items.push(item);
    }

    cartStorage.setItems(items);
  },

  removeItem: (id) => {
    const items = cartStorage.getItems();
    const updatedItems = items.filter((item) => item._id !== id);
    cartStorage.setItems(updatedItems);
  },

  updateItemQuantity: (id, quantity) => {
    const items = cartStorage.getItems();
    const itemIndex = items.findIndex((item) => item._id === id);
    if (itemIndex !== -1) {
      items[itemIndex].quantity = quantity;
      cartStorage.setItems(items);
    }
  },
};
