import { useCallback, useEffect, useRef } from "react";
import { useProductStore } from "../../store/useProductStore";
import CartItem from "../CartItems/CartItem";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";

const Cart = (props) => {
  const { onClose, isOpen } = props;

  const cartItems = useProductStore((state) => state.cartItems); // получаем товары в корзине из стора
  const completeItem = useProductStore((state) => state.completeItem); // функция чтобы убрать товары из корзины
  const totalPrice = useProductStore((state) => state.totalPrice); // Сумма стоимости товаров в корзине
  const calculateCartPrice = useProductStore(
    (state) => state.calculateCartPrice
  ); // Подсчёт суммы товаров в корзине
  const updateQuantity = useProductStore((state) => state.updateQuantity); // Степпер товаров

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

  const cartRef = useRef(null);

  // функция для закрытия корзины
  const closeCart = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  // функция для закрытия корзины кликом за её пределами
  const handleClick = useCallback(
    (event) => {
      if (cartRef?.current && !cartRef?.current.contains(event?.target)) {
        closeCart();
      }
    },
    [cartRef, closeCart]
  );

  // функция для закрытия корзины при нажатии Escape
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Добавляем/убираем прослушки с корзины
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, handleClick, handleKeyPress]);

  console.log("Список товаров", cartItems);
  return (
    <div
      ref={cartRef}
      className="w-[60rem] h-[22rem] bg-slate-400 absolute top-24 left-48 flex flex-col gap-2 overflow-hidden overflow-y-auto z-10"
    >
      <div className="flex gap-6">
        <h1>Cart</h1>
        <span>Total: {cartItems?.length}</span>
        <span>Price: {totalPrice}</span>
      </div>
      <Button variant="info" className="w-40">
        <NavLink to="complete" key="complete" className="w-full">
          Заказ
        </NavLink>
      </Button>

      {!!cartItems &&
        cartItems.map((item) => (
          <CartItem
            id={item?.id}
            key={item?.id}
            image={item?.img}
            quantity={item?.quantity}
            increment={() => handleItemIncrement(item.id, item.quantity + 1)}
            dicrement={() => handleItemDecrement(item.id, item.quantity - 1)}
            title={item?.name}
            price={item?.price}
            click={() => handleCompleteItem(item)}
          />
        ))}
    </div>
  );
};
export default Cart;
