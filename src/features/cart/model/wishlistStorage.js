export const wishlistStorage = {
  getItems: () => {
    const items = JSON.parse(localStorage.getItem("wishlist-storage") || "[]");
    return Array.isArray(items) ? items : [];
  },
  setItems: (items) =>
    localStorage.setItem("wishlist-storage", JSON.stringify(items)),
  addItem: (item) => {
    const items = wishlistStorage.getItems();
    const existingItemIndex = items.findIndex((i) => i._id === item._id);
    if (existingItemIndex !== -1) {
      items[existingItemIndex].quantity += item.quantity;
    } else {
      items.push(item);
    }
    wishlistStorage.setItems(items);
  },
  removeItem: (_id) => {
    const items = wishlistStorage.getItems();
    const updatedItems = items.filter((item) => item._id !== _id);
    wishlistStorage.setItems(updatedItems);
  },
  updateItemQuantity: (_id, quantity) => {
    const items = wishlistStorage.getItems();
    const itemIndex = items.findIndex((item) => item._id === _id);
    if (itemIndex !== -1) {
      items[itemIndex].quantity = quantity;
      wishlistStorage.setItems(items);
    }
  },
  clearWishlist: () => {
    localStorage.removeItem("wishlist-storage");
  },
};
