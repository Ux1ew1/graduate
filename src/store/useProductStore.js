import { create } from "zustand";
import { persist } from "zustand/middleware";

// стор с функциями для корзины товаров

export const useProductStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,

      // Функция для добавления товара в корзину
      addCartItem: (item) =>
        set((state) => {
          // функция для поиска товара в корзине по id
          const existingProduct = state.cartItems.find(
            (product) => product.id === item.id
          );
          const cart = [...state.cartItems, item];
          console.log(cart);

          if (existingProduct) {
            existingProduct.quantity += 1;

            console.log("Товар:", existingProduct);
            console.log("Количество товара:", existingProduct.quantity);

            return {
              cartItems: [...state.cartItems],
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }],
            };
          }
        }),

      // функция которая убирает товар из корзины.
      completeItem: (item) =>
        set((state) => {
          const updateCartItems = state.cartItems.filter(
            // функция которая фильтрует товары и убирает товар который был передан в функию
            (cartItem) => cartItem?.id !== item?.id
          );

          return {
            cartItems: updateCartItems,
          };
        }),

      // функция для обновления количества товара в корзине
      updateQuantity: (productId, quantity) =>
        set((state) => {
          const updateCart = state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );

          return { cartItems: updateCart };
        }),

      calculateCartPrice: () =>
        set((state) => {
          const newPrice = state.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          return { totalPrice: newPrice };
        }),
    }),

    {
      name: "cartItems", // название ключа в local storage
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

// фунция для обновления суммы товаров в корзине товаров при взаимодействии с ней
useProductStore.subscribe((state, prevState) => {
  if (state.cartItems != prevState.cartItems) {
    useProductStore.getState().calculateCartPrice();
  }
});
