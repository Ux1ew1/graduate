import Table from "../Table/Table";
import useFetchItemsStore from "../../store/useFetchItemsStore";
import useForm from "../../hooks/useForm";
import Button from "../Button/Button";
import Alert from "../Alert/Alert";
import { Drawer } from "../Drawer/Drawer";
import { useEffect, useState } from "react";

const Admin = () => {
  const data = useFetchItemsStore((state) => state.items);
  const fetchItems = useFetchItemsStore((state) => state.fetchItems);
  console.log(data);
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Стейт для показа и скрытия Drawer
  const [isShowDrawer, setShowDrawer] = useState(false);

  // Стейт для показа уведовления
  const [isShowAlert, setShowAlert] = useState(false);

  // Стейт для показа детальной информации в Drawer
  const [selectedValue, setSelectedValue] = useState(null);

  // CRUD операции из стора
  const { items, fetchItem, addItem, editItem, deleteItem } =
    useFetchItemsStore();

  // функции из хука useForm
  const { formValues, handleInput, resetForm } = useForm({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  // Функция для редактирования item
  const handleEditItem = () => {
    if (selectedValue) {
      editItem(selectedValue?.id, formValues);

      setShowDrawer(false);

      setSelectedValue(null);
    }
  };

  // Функция для удаления item
  const handleDeleteItem = () => {
    if (selectedValue) {
      deleteItem(selectedValue?.id);

      setShowDrawer(false);

      setSelectedValue(null);
    }
  };

  // Функиця для показа дополнительной информации по товару
  const handleRowDoubleClick = (rowData) => {
    setSelectedValue(rowData);
    console.log(rowData);
    setShowDrawer(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    addItem(formValues);

    setShowDrawer(false);

    setShowAlert(true);

    resetForm();
  };

  // Функция для закрытия Drawer
  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setSelectedValue(null);
  };

  return (
    <div className="w-full relative">
      <button
        onClick={() => setShowDrawer(true)}
        className="py-2 px-2 border-2 border-cyan-400 mb-2"
      >
        Добавить
      </button>

      <div className="absolute z-20 top-[-2rem] left-[-6rem] hidden">
        <div className="w-[100rem] h-[49rem] bg-slate-200 rounded-lg">
          <h3 className="border-b-2 border-gray-400 text-2xl px-4 py-2">
            Добавить позицию
          </h3>
          <div className="flex gap-60 px-10 py-10">
            <div className="w-96 h-96 block bg-white rounded-lg" id="image">
              image
            </div>
            <div id="text-wrapper">
              <h2>Название</h2>
              <h2>Описание</h2>
              <h2>Состав</h2>
              <h2>Цена</h2>
            </div>
          </div>
        </div>
      </div>
      <Table
        headers={[
          { key: "image", title: "Картинка" },
          { key: "name", title: "Название" },
          { key: "description", title: "Описание" },
          { key: "composition", title: "Состав" },
          { key: "price", title: "цена" },
        ]}
        data={data}
        onRowDoubleClick={handleRowDoubleClick}
      />

      {isShowDrawer && (
        <Drawer
          isOpen={isShowDrawer}
          onClose={handleCloseDrawer}
          title={selectedValue ? "Редактирование товара" : "Добавить товар"}
        >
          <div className="w-full max-w-xs">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="taskName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Название товара
                </label>
                <input
                  className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  defaultValue={selectedValue?.name || formValues?.name}
                  onChange={handleInput}
                  placeholder="Введите название"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="taskName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Категория товара
                </label>
                <input
                  className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="category"
                  type="text"
                  defaultValue={selectedValue?.category || formValues?.category}
                  onChange={handleInput}
                  placeholder="Введите категорию"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="taskName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Описание товара
                </label>
                <textarea
                  rows="6"
                  className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="description"
                  defaultValue={
                    selectedValue?.description || formValues?.description
                  }
                  onChange={handleInput}
                  placeholder="Введите описание"
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="taskName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Цена товара
                </label>
                <input
                  className="shadow read-only:bg-gray-200 read-only:cursor-not-allowed appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="price"
                  type="number"
                  defaultValue={selectedValue?.price || formValues?.price}
                  onChange={handleInput}
                  placeholder="Введите цену"
                />
              </div>

              {selectedValue ? (
                <div className="flex gap-2">
                  <Button variant="info" onClick={handleEditItem}>
                    Добавить
                  </Button>
                  <Button variant="warning" onClick={handleDeleteItem}>
                    Удалить
                  </Button>
                </div>
              ) : (
                <Button variant="info" type="submit">
                  Добавить
                </Button>
              )}
            </form>
          </div>
        </Drawer>
      )}
      <Alert
        title="Товар добавлен."
        subtitle="Товад был добавлен в меню."
        variant="info"
        isOpen={isShowAlert}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default Admin;
