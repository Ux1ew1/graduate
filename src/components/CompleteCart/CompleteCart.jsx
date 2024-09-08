import { useProductStore } from "../../store/useProductStore";
import Button from "../Button/Button";
import CartItem from "../CartItems/CartItem";
import useForm from "../../hooks/useForm";
import styles from "./CompleteCart.module.css";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const CompleteCart = () => {
  const cartItems = useProductStore((state) => state.cartItems); // получаем товары в корзине из стора
  const completeItem = useProductStore((state) => state.completeItem); // функция чтобы убрать товары из корзины
  const totalPrice = useProductStore((state) => state.totalPrice); // Сумма стоимости товаров в корзине
  const calculateCartPrice = useProductStore(
    (state) => state.calculateCartPrice
  ); // Подсчёт суммы товаров в корзине
  const updateQuantity = useProductStore((state) => state.updateQuantity); // Степпер товаров

  const { user } = useAuth();

  const itemsCart = [];

  const { formValues, handleInput, resetForm, formErrors } = useForm({
    name: "",
    phone: "",
    email: "",
    city: "",
    street: "",
    housing: "",
    building: "",
    door: "",
    room: "",
    items: [itemsCart],
  });

  const updateUserData = () => {
    formValues.name = user?.name;
    formValues.phone = user?.phone;
    formValues.email = user?.email;
    formValues.city = user?.city;
    formValues.street = user?.street;
    formValues.housing = user?.housing;
    formValues.building = user?.building;
    formValues.door = user?.door;
    formValues.room = user?.room;
    formValues.items = itemsCart;
  };

  useEffect(() => {
    calculateCartPrice();
    updateUserData();
  }, [calculateCartPrice, updateUserData]);

  // функция прибавки в степпере
  const handleItemIncrement = (id, quantity) => {
    updateQuantity(id, quantity);

    calculateCartPrice();
  };

  // функция убавления в степпере
  const handleItemDecrement = (id, quantity) => {
    updateQuantity(id, quantity);
    calculateCartPrice();
  };

  // функция убирает товар из корзины
  const handleCompleteItem = (item) => {
    completeItem(item);

    calculateCartPrice();
  };

  // функция для формирования массива с название товара в корзину.
  const cartTest = (items) => {
    items.map((item) => {
      console.log(item.name);
      const itemName = item?.name;
      const itemQuantity = item?.quantity;
      const itemGenerate = { itemName, itemQuantity };

      itemsCart.push(itemGenerate);
      return itemsCart;
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("formValues", formValues);

    cartTest(cartItems);
    console.log("cartTest", itemsCart);

    const stringData = JSON.stringify(formValues);
    console.log("Заказ принят. Данные заказа:", stringData);

    console.log("Error", formErrors);

    resetForm();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.cartContainer}>
          <h2>Cart</h2>
          {!!cartItems &&
            cartItems.map((item) => (
              <CartItem
                id={item?.id}
                key={item?.id}
                image={item?.img}
                quantity={item?.quantity}
                increment={() =>
                  handleItemIncrement(item.id, item.quantity + 1)
                }
                dicrement={() =>
                  handleItemDecrement(item.id, item.quantity - 1)
                }
                title={item?.name}
                price={item?.price}
                click={() => handleCompleteItem(item)}
              />
            ))}
          <div className={styles.itemContainer}>
            <span>Стоимость корзины: {totalPrice}</span>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2>Form</h2>

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ФИО получателя
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                type="text"
                onChange={handleInput}
                placeholder="Ваше имя"
                defaultValue={user?.name || formValues?.name}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Номер телефона
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="phone"
                type="phone"
                onChange={handleInput}
                placeholder="+79990001122"
                defaultValue={user?.phone || formValues?.phone}
                pattern="^(\+7)\d{10}$"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Электронная почта
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                onChange={handleInput}
                placeholder="Email"
                defaultValue={user?.email || formValues?.email}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Город
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="city"
                type="text"
                onChange={handleInput}
                placeholder="Название города"
                defaultValue={user?.city || formValues?.city}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Улица
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="street"
                type="text"
                onChange={handleInput}
                placeholder="Название улицы"
                defaultValue={user?.street || formValues?.street}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Дом
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="building"
                type="text"
                onChange={handleInput}
                placeholder="Номер дома"
                defaultValue={user?.building || formValues?.building}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Корпус/Строение
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="housing"
                type="text"
                onChange={handleInput}
                placeholder="Корпус или строение"
                defaultValue={user?.housing || formValues?.housing}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Подъезд
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="door"
                type="text"
                onChange={handleInput}
                placeholder="Номер подъезда"
                defaultValue={user?.door || formValues?.door}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Квартира
              </label>
              <input
                className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="room"
                type="text"
                onChange={handleInput}
                placeholder="Номер квартиры"
                defaultValue={user?.room || formValues?.room}
              />
            </div>

            <Button variant="info" type="submit">
              Сделать заказ
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default CompleteCart;
