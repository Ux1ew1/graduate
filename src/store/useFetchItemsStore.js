import { create } from "zustand";

// стор для затягивания данных из бд.

const useFetchItemsStore = create((set) => ({
  /**
   * Асинхронная функция для получения списка товаров и обновления состояния.
   */

  fetchItems: async () => {
    try {
      const response = await fetch("http://localhost:3000/menu");

      if (!response.ok) throw new Error("Failed to fetch! Try again.");

      set({ items: await response.json() });
    } catch (error) {
      set({ error: error.message });
    }
  },

  /**
   * Асинхронная функция для добавления нового товара в список.
   * Делает POST-запрос к указанному URL с данными нового товара и обновляет состояние списка товаров.
   * @param {Object} newItem - Объект с данными нового товара.
   */

  addItem: async (newItem) => {
    try {
      const response = await fetch("http://localhost:3000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response?.status}`);

      const data = await response.json();

      console.log("Added item:", data);

      set((state) => ({
        items: [...state.items, data],
      }));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },

  /**
   * Обновляет товар по id.
   *
   * @param {number} id - id товара, который необходимо обновить.
   * @param {Object} updatedItem - Обновленные данные товара.
   * @throws {Error} - Выбрасывает ошибку, если HTTP-запрос завершился неудачей.
   */

  editItem: async (id, updateItem) => {
    try {
      const response = await fetch(`http://localhost:3000/menu/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateItem),
      });

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response?.status}`);

      const data = await response.json();

      console.log("Update item:", data);

      set((state) => ({
        items: state?.items?.map((item) => (item?.id === id ? data : item)),
      }));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  },

  /**
   * Удаляет товар по id.
   *
   * @param {number} id - id товара, который необходимо удалить.
   * @throws {Error} - Выбрасывает ошибку, если HTTP-запрос завершился неудачей.
   */

  deleteItem: async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/menu/${id}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response?.status}`);

      console.log("Delete item:", id);

      set((state) => ({
        items: state?.items.filter((item) => item?.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },
}));

export default useFetchItemsStore;
