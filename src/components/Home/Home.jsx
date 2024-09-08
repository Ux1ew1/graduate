import Styles from "./Home.module.css";
import { Drawer } from "../Drawer/Drawer";
import useFetchPromoStore from "../../store/useFetchPromoStore";
import useForm from "../../hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card/Card";
import menu from "../../../db.json";
import { useProductStore } from "../../store/useProductStore";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

const dbItems = menu.menu;

console.log(dbItems[1].id);

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const data = useFetchPromoStore((state) => state.items);
  const fetchItems = useFetchPromoStore((state) => state.fetchItems);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Стейт для показа уведовления
  const [isShowAlert, setShowAlert] = useState(false);

  // Стейт для показа детальной информации в Drawer
  const [selectedValue, setSelectedValue] = useState(null);

  // CRUD операции из стора
  const { items, fetchItem, addItem, editItem, deleteItem } =
    useFetchPromoStore();

  // функции из хука useForm
  const { formValues, handleInput, resetForm } = useForm({
    title: "",
    url: "",
  });

  const { user } = useAuth();

  const addCartItem = useProductStore((state) => state.addCartItem); // получаем из стора функию для добавления товаров в корзину

  // функция добавляет товар в корзину и показываем уведомление
  const handleAddItemToCart = (item) => {
    addCartItem(item);
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCardClick = (id) => {
    console.log(id);
    navigate(`/cards/${id}`);
  };

  // Функция для редактирования item
  const handleEditItem = () => {
    if (selectedValue) {
      editItem(selectedValue?.id, formValues);
      console.log(formValues);
      console.log(selectedValue);
      setEditPromo(false);
    }
  };

  // Функция для удаления item
  const handleDeleteItem = () => {
    if (selectedValue) {
      deleteItem(selectedValue?.id);

      setEditPromo(false);

      setSelectedValue(null);
    }
  };

  // Функиця для показа дополнительной информации по товару
  const handleRowDoubleClick = (rowData) => {
    setSelectedValue(rowData);

    setEditPromo(true);
    console.log(rowData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    addItem(formValues);

    setEditPromo(false);

    setShowAlert(true);

    resetForm();
  };

  const [showEditPromo, setEditPromo] = useState(false); //Стейт для показа дровера

  // Функция для показа дровера
  const showEditPromoModal = () => {
    setEditPromo(true);
  };
  // Функция для закрытия дровера
  const hideEditPromoModal = () => {
    setEditPromo(false);
  };

  return (
    <>
      <div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Акции</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            className="bg-gray-100 w-[90rem] h-96"
            slidesPerView={1}
            navigation
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {data?.map((item) => (
              <SwiperSlide className="w-[90rem] h-96" key={item?.title}>
                <div className="relative">
                  {user?.role === "admin" ? (
                    <button
                      type="button"
                      onClick={() => handleRowDoubleClick(item)}
                      className="absolute px-4 py-1 bg-white rounded-lg top-2 left-2 z-10"
                    >
                      Edit
                    </button>
                  ) : null}
                  <img src={item?.url} alt={item?.title} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Drawer
          isOpen={showEditPromo}
          onClose={hideEditPromoModal}
          title="Промоакции"
        >
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col overflow-y-auto">
              <div
                className="w-96 h-48 bg-gray-200 mb-6"
                key={selectedValue?.id}
              >
                <img src={selectedValue?.url} alt={selectedValue?.title} />
                <Input
                  name="url"
                  type="text"
                  onInput={handleInput}
                  placeholder={selectedValue?.url}
                />

                <div className="flex gap-2">
                  <Button onClick={handleEditItem} variant="info">
                    Сохранить
                  </Button>
                  <Button onClick={handleDeleteItem} variant="warning">
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Drawer>
        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-4">Популярные позиции</h2>
          <div className="flex justify-between">
            <Card
              key={dbItems[1]?.id}
              id={dbItems[1]?.id}
              image={dbItems[1]?.img}
              title={dbItems[1]?.name}
              description={dbItems[1]?.description}
              price={dbItems[1]?.price}
              click={() => handleAddItemToCart(dbItems)}
              onCardClick={() => handleCardClick(dbItems[1].id)}
            />
            <Card
              key={dbItems[2]?.id}
              id={dbItems[2]?.id}
              image={dbItems[2]?.img}
              title={dbItems[2]?.name}
              description={dbItems[2]?.description}
              price={dbItems[2]?.price}
              click={() => handleAddItemToCart(dbItems)}
              onCardClick={() => handleCardClick(dbItems[2].id)}
            />
            <Card
              key={dbItems[3]?.id}
              id={dbItems[3]?.id}
              image={dbItems[3]?.img}
              title={dbItems[3]?.name}
              description={dbItems[3]?.description}
              price={dbItems[3]?.price}
              click={() => handleAddItemToCart(dbItems)}
              onCardClick={() => handleCardClick(dbItems[3].id)}
            />
            <Card
              key={dbItems[4]?.id}
              id={dbItems[4]?.id}
              image={dbItems[4]?.img}
              title={dbItems[4]?.name}
              description={dbItems[4]?.description}
              price={dbItems[4]?.price}
              click={() => handleAddItemToCart(dbItems)}
              onCardClick={() => handleCardClick(dbItems[4].id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
