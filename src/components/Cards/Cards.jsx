import Card from "../Card/Card";
import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";
import useFetchItemsStore from "../../store/useFetchItemsStore";

const Cards = () => {
  const recipes = useFetchItemsStore((state) => state.items);
  const fetchItems = useFetchItemsStore((state) => state.fetchItems);

  const addCartItem = useProductStore((state) => state.addCartItem);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  console.log(recipes);
  console.log(fetchItems);

  return (
    <>
      {!!recipes &&
        recipes.map((product) => (
          <Card
            key={product?.id}
            id={product?.id}
            image={product?.img}
            title={product?.title}
            description={product?.description}
            price={product?.price}
            click={() => addCartItem(product)}
          />
        ))}
    </>
  );
};

export default Cards;
