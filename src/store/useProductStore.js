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
          const updateCartItems = [...state.cartItems, item]; // диструктурируем корзину и добавляем в конец новый товар.
          const newTotalPrice = updateCartItems.reduce(
            // функция для подсчта стоимости всех товаров в корзине
            (total, item) => total + +item.price,
            0
          );
          console.log(state.cartItems);
          console.log(item.price);
          return { cartItems: updateCartItems, totalPrice: newTotalPrice }; // возвращаем корзину с новыми товарами и стоимостью всех товаров.
        }),

      // функция которая убирает товар из корзины.
      completeItem: (item) =>
        set((state) => {
          const updateCartItems = state.cartItems.filter(
            // функция которая фильтрует товары и убирает товар который был передан в функию
            (cartItem) => cartItem !== item
          );

          const newTotalPrice = updateCartItems.reduce(
            // функция для подсчёта стоимости товаров
            (total, item) => total + +item.price,
            0
          );
          return { cartItems: updateCartItems, totalPrice: newTotalPrice };
        }),

      // функция для подсчёта общей суммы товаров в корзине
      calculateTotalPrice: () => {
        const state = get(); // получаем state
        const newTotalPrice = state.cartItems.reduce(
          // функция подсчитывает стоимость товаров
          (total, item) => total + +item.price,
          0
        );
        return { totalPrice: newTotalPrice };
      },
    }),
    {
      name: "cartItems", // название ключа в local storage
    }
  )
);

// фунция для обновления суммы товаров в корзине товаров при взаимодействии с ней
useProductStore.subscribe((state, prevState) => {
  if (state.cartItems != prevState.cartItems) {
    useProductStore.getState().calculateTotalPrice();
  }
});
