import Styles from "./Home.module.css";
import { Drawer } from "../Drawer/Drawer";
import useFetchPromoStore from "../../store/useFetchPromoStore";
import useForm from "../../hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const Home = () => {
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
      <h1>Home</h1>
      <p>Начальная страница</p>
      <div>
        <input
          type="radio"
          id="1"
          name="category"
          className={Styles.radioInput}
        />
        <label htmlFor="1">Все</label>

        <div>
          <h2>Акции</h2>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            className="bg-gray-100 w-[90rem] h-96"
            slidesPerView={1}
            navigation
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
      </div>
    </>
  );
};

export default Home;
