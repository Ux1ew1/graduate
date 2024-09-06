import { useEffect, useState } from "react";
import useFetchItemsStore from "../../store/useFetchItemsStore";
import Input from "../Input/Input";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // текст из поля инпут
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Получаем товар из стора
  const recipes = useFetchItemsStore((state) => state.items);
  const fetchItems = useFetchItemsStore((state) => state.fetchItems);

  // Запрос для получения товаров из стора
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // функция для перерисовки данных
  useEffect(() => {
    const results = recipes?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  // console.log("searchTerm", searchTerm);
  // console.log("searchResults", searchResults);

  return (
    <div className="w-96 relative">
      <Input
        name="search"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="search"
        className="shadow-lg mb-0"
      />

      <ul className="absolute bg-white shadow-md max-w-96 w-full border border-gray-300 rounded-md flex flex-col gap-2">
        {!!searchTerm &&
          searchResults?.map((item) => {
            return (
              <a
                key={item.id}
                className="flex justify-between items-center hover:bg-gray-200"
                href="#"
              >
                <img src={item.img} alt={item.name} className="w-24" />
                <span className="text-lg">{item.name}</span>
              </a>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchBar;
