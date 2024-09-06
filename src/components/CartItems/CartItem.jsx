import Stepper from "../Stepper/Stepper";

const CartItem = (props) => {
  const { id, image, title, price, click, quantity, increment, dicrement } =
    props;
  return (
    <div
      key={id}
      className="flex justify-between bg-slate-100 px-4 py-2 text-lg"
    >
      <div className="flex items-center gap-6">
        <img className="w-36 rounded-lg" src={image} alt={title} />
        <h2>{title}</h2>
      </div>
      <div className="flex items-center gap-6">
        <span>Цена: {price} рублей</span>
        <Stepper
          minValue="1"
          increment={increment}
          dicrement={dicrement}
          quantity={quantity}
        />
        <button className="bg-white px-2 py-2" onClick={() => click()}>
          Убрать
        </button>
      </div>
    </div>
  );
};

export default CartItem;
