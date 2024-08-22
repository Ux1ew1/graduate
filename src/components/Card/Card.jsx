import "./card.css";

/**
 * Компонент Card для отображения карточки товара.
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} props.id - Уникальный идентификатор карточки.
 * @param {string} props.image - URL изображения товара.
 * @param {string} props.title - Заголовок товара.
 * @param {string} props.description - Описание товара.
 * @param {number} props.price - Цена товара.
 * @param {function} props.click - Функция, вызываемая при клике на кнопку "Buy now".
 * @returns {JSX.Element} - JSX элемент, представляющий карточку товара.
 */

const Card = (props) => {
  const { id, image, title, description, price, click } = props;

  return (
    <div
      key={id ?? "undefined"}
      data-id={id ?? "undefined"}
      className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs w-full"
    >
      <img src={image} alt="Mountain" className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {title ?? "undefined"}
        </h2>
        <p className="text-gray-700 leading-tight mb-4">
          {description ?? "undefined"}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-800 font-semibold">
              Цена: {price ?? "undefined"} рублей
            </span>
          </div>
          <button
            // onClick={() => id && click(id)}
            onClick={() => click()}
            className="w-24 py-2 bg-blue-400 text-slate-100 rounded-lg"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;
