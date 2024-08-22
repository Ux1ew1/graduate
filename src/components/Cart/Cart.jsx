import { useProductStore } from "../../store/useProductStore";
import CartItem from "../CartItems/CartItem";

const Cart = () => {
  const cartItems = useProductStore((state) => state.cartItems); // получаем товары в корзине из стора
  const completeItem = useProductStore((state) => state.completeItem); // функция чтобы убрать товары из корзины
  const totalPrice = useProductStore((state) => state.totalPrice);

  console.log("Список товаров", cartItems);
  return (
    <div className="w-[60rem] h-[22rem] bg-slate-400 absolute top-24 left-48 flex flex-col gap-2 overflow-hidden overflow-y-auto">
      <div className="flex gap-6">
        <h1>Cart</h1>
        <span>Total: {cartItems?.length}</span>
        <span>Price: {totalPrice}</span>
      </div>

      {!!cartItems &&
        cartItems.map((item) => (
          <CartItem
            id={item?.id}
            key={item?.id}
            image={item?.img}
            title={item?.title}
            price={item?.price}
            click={() => completeItem(item)}
          />
        ))}
    </div>
  );
};
export default Cart;
