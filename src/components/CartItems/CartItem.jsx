const CartItem = (props) => {
  const { id, image, title, price, click } = props;
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
        <div className="bg-white py-1 rounded-md border-2 border-gray-400">
          <button className="mx-2 pr-2 border-r-2 border-gray-400">+</button>
          <span>1</span>
          <button className="mx-2 pl-2 border-l-2 border-gray-400">-</button>
        </div>
        <button className="bg-white px-2 py-2" onClick={() => click()}>
          Убрать
        </button>
      </div>
    </div>
  );
};

export default CartItem;
