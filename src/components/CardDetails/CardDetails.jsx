import { useParams } from "react-router";
import useFetchItemsStore from "../../store/useFetchItemsStore";
import { useProductStore } from "../../store/useProductStore";
import { useEffect, useState } from "react";
import styles from "./CardDetails.module.css";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const CardDetails = () => {
  const { id } = useParams();

  const recipes = useFetchItemsStore((state) => state.items); // получаем товары из стора
  const fetchItems = useFetchItemsStore((state) => state.fetchItems); // затягиваем товары из бызы даныых
  const updateQuantity = useProductStore((state) => state.updateQuantity);

  // стейты для работы с алертами
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isItemName, setItemName] = useState(null);

  // функция для добавления товара в корзину
  const addCartItem = useProductStore((state) => state.addCartItem);
  // получаем корзину товаров из стора
  const cartItems = useProductStore((state) => state.cartItems);
  // функция чтобы убрать товар из корзины
  const completeItem = useProductStore((state) => state.completeItem);

  console.log(cartItems);

  const handleAddItemToCart = (item) => {
    addCartItem(item);

    setItemName(item?.name);

    setAlertOpen(true);
  };

  const handleCompleteItem = (item) => {
    completeItem(item);
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Находим товар в бд по id из адресной строки
  const product = recipes?.find((item) => item?.id === id || null);

  return (
    <div className={styles.container}>
      <Link to="/cards">
        <FaArrowLeft />
      </Link>
      <h2 className={styles.title}>{product?.name}</h2>
      <div className={styles.cardWrapper}>
        <div>
          <img
            src={`../../../public/${product?.img}`}
            alt={product?.name}
            className={styles.image}
          />
          <div>
            {cartItems.find((item) => item?.id === product?.id) ? (
              <div>
                <Button onClick={() => handleCompleteItem(product)}>
                  Убрать
                </Button>
              </div>
            ) : (
              <Button
                variant="info"
                onClick={() => handleAddItemToCart(product)}
              >
                Купить
              </Button>
            )}
          </div>
        </div>

        <div className={styles.cardDetails}>
          <div className={styles.details}>
            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>Категория:</span>
              <p className={styles.itemText}>{product?.category}</p>
            </div>
            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>Состав:</span>
              <p className={styles.itemText}>{product?.composition}</p>
            </div>

            <div className={styles.itemDetails}>
              <span className={styles.itemTitle}>Время приготовления:</span>
              <p className={styles.itemText}>{product?.cooking}</p>
            </div>
          </div>

          <div className={styles.cardDescription}>
            <h2 className={styles.detailsTitle}>Описание</h2>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
      <Alert
        title="Товар добавлен"
        subtitle="Товар был успешно добавлен в корзину"
        variant="success"
        isOpen={isAlertOpen}
        itemName={isItemName}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
};

export default CardDetails;
