import Card from "../Card/Card";
import { useEffect, useState } from "react";
import Alert from "../Alert/Alert";
import { useProductStore } from "../../store/useProductStore";
import useFetchItemsStore from "../../store/useFetchItemsStore";
import { useNavigate } from "react-router";

const Cards = () => {
  const navigate = useNavigate();
  const recipes = useFetchItemsStore((state) => state.items); // получаем товары из стора
  const fetchItems = useFetchItemsStore((state) => state.fetchItems); // затягиваем товары из бызы даныых
  const addCartItem = useProductStore((state) => state.addCartItem); // получаем из стора функию для добавления товаров в корзину

  const [isAlertOpen, setAlertOpen] = useState(false); // стейт для показа и скрытия уведомления
  const [isItemName, setItemName] = useState(null); // стейт для получения названия товара и передачи его в компонент уведомление

  // функция добавляет товар в корзину и показываем уведомление
  const handleAddItemToCart = (item) => {
    addCartItem(item);

    setItemName(item?.name);
    
    setAlertOpen(true);
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCardClick = (id) => {
    console.log(id);
    navigate(`/cards/${id}`);
  };

  console.log(recipes);

  return (
    <>
      {!!recipes &&
        recipes.map((product) => (
          <Card
            key={product?.id}
            id={product?.id}
            image={product?.img}
            title={product?.name}
            description={product?.description}
            price={product?.price}
            click={() => handleAddItemToCart(product)}
            onCardClick={() => handleCardClick(product.id)}
          />
        ))}

      <Alert
        title="Добавление товара."
        subtitle="Товар был довлен в корзину."
        variant="success"
        isOpen={isAlertOpen}
        itemName={isItemName}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
};

export default Cards;
