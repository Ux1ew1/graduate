import { useState } from "react";
import { useProductStore } from "../../store/useProductStore";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { NavLink } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Input from "../Input/Input";
import Cart from "../Cart/Cart";
import Styles from "./Header.module.css";
import Selector from "../Selector/Selector";
import SelectorItem from "../Selector/SelectorItem";
import SearchBar from "../SearchBar/SearchBar";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Cards", path: "/cards" },
  // { name: "Cart", path: "/cart" },
  { name: "Admin", path: "/admin" },
];

const Header = () => {
  // const [showCart, setShowCart] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const { user, onRegister, onLogin, onLogout } = useAuth();

  const { formValues, formErrors, handleInput, resetForm } = useForm({
    login: "",
    password: "",
  });

  const [personalData, setPersonalData] = useState(false);

  const [showSelector, setShowSelector] = useState(false);

  const calculateCartPrice = useProductStore(
    (state) => state.calculateCartPrice
  );

  const cartItems = useProductStore((state) => state.cartItems);

  // сабмит формы логина
  const handleLoginForm = (event) => {
    event.preventDefault();

    onLogin(formValues);

    setShowLoginModal(false);

    resetForm();
  };

  // сабмит формы регистрации
  const handleRegistrationForm = (event) => {
    event.preventDefault();

    onRegister(formValues);

    setShowRegistrationModal(false);

    resetForm();
  };

  // функция для показа корзины товаров
  const showCartFunction = () => {
    calculateCartPrice();

    setShowCart(true);

    console.log(!!showCart);
  };

  // функция для закрытия корзины товаров
  const closeCartFunction = () => {
    setShowCart(false);
  };

  // Функция для показа логина
  const showLoginModalFunction = () => {
    setShowLoginModal(true);
    console.log(!!showLoginModal);
  };

  // Функция для показа регистрации
  const showRegistrationModalFunction = () => {
    setShowRegistrationModal(true);
    console.log(!!showRegistrationModal);
  };

  // функция для показа модалки логина
  const closeLoginModal = () => {
    setShowLoginModal(false);
    resetForm();
  };

  // функция для закрытия модалки регистрации
  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
    resetForm();
  };

  // функция для перехода на следующий этап регистрации
  const nextStep = () => {
    setPersonalData(true);
    console.log(personalData);
  };

  // функция для перехода к предыдущему этапу регистрации
  const backStep = () => {
    setPersonalData(false);
    console.log(personalData);
  };

  // функция для показа селектора
  const handleShowSelector = () => {
    setShowSelector(true);
  };

  // функция для скрытия селектора
  const handleCloseSelector = () => {
    setShowSelector(false);
  };

  const cartItemsQuantity = () => {
    let itemsCart = 0;
    cartItems.map((item) => {
      itemsCart = itemsCart + item.quantity;
    });
    return itemsCart;
  };

  return (
    <>
      <div className="w-[90rem] mx-auto px-4 py-6 mb-9 border-b flex gap-12 relative items-center justify-between">
        <div className="flex gap-12 items-center">
          {navItems?.map((item) => {
            if (item?.name === "Admin" && (!user || user?.role !== "admin")) {
              return null;
            }
            return (
              <NavLink to={item?.path} key={item?.path}>
                {item?.name}
              </NavLink>
            );
          })}
          <SearchBar />
        </div>
        <div className="flex gap-6 items-center">
          <NavLink to="complete" key="complete" className="relative">
            {cartItems.length > 0 && (
              <div className="absolute w-4 h-4 rounded-full bg-blue-400 -top-2 -right-2 flex items-center justify-center text-white text-xs">
                {cartItemsQuantity()}
              </div>
            )}

            <FiShoppingCart />
          </NavLink>

          <div className="flex gap-2">
            {!user ? (
              <>
                <button
                  className="px-2 py-2 border-2 border-blue-400"
                  onClick={() => showRegistrationModalFunction()}
                >
                  Registration
                </button>
                <button
                  className="px-2 py-2 border-2 border-blue-400"
                  onClick={() => showLoginModalFunction()}
                >
                  Log in
                </button>
              </>
            ) : (
              <div className="flex gap-2 items-center border border-black p-1 relative">
                <button
                  onClick={() => handleShowSelector()}
                  className="flex gap-2 items-center"
                >
                  <IoIosArrowDown
                    className={
                      showSelector
                        ? "rotate-180 transition-all outline-none"
                        : "transition-all outline-none"
                    }
                  />
                  {user?.login}
                </button>

                {showSelector && (
                  <Selector
                    isOpen={showSelector}
                    onClose={handleCloseSelector}
                    className="absolute top-10 left-0"
                  >
                    <SelectorItem>Настройки</SelectorItem>
                    <SelectorItem onClick={onLogout}>Выйти</SelectorItem>
                  </Selector>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showLoginModal && (
        <Modal
          title="Login form"
          isOpen={showLoginModal}
          onClose={closeLoginModal}
        >
          <form onSubmit={handleLoginForm}>
            <Input
              label="Login"
              name="login"
              type="text"
              value={formValues?.login}
              onInput={handleInput}
              placeholder="Enter login"
              error={formErrors?.login}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formValues?.password}
              onInput={handleInput}
              placeholder="Enter password"
              error={formErrors?.password}
            />

            <button type="submit">Submit</button>
          </form>
        </Modal>
      )}
      {showRegistrationModal && (
        <Modal
          title="Registration form"
          isOpen={showRegistrationModal}
          onClose={closeRegistrationModal}
        >
          <button className="mb-2" onClick={() => backStep()}>
            <FaArrowLeft />
          </button>
          <form
            className={Styles.formWrapper}
            onSubmit={handleRegistrationForm}
          >
            <div className={personalData ? Styles.translate : Styles.wrapper}>
              <div className={Styles.step1}>
                <Input
                  label="Login"
                  name="login"
                  type="text"
                  value={formValues?.login}
                  onInput={handleInput}
                  placeholder="Enter login"
                  error={formErrors?.login}
                />
                <Input
                  label="name"
                  name="name"
                  type="text"
                  value={formValues?.name}
                  onInput={handleInput}
                  placeholder="Enter ФИО"
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formValues?.password}
                  onInput={handleInput}
                  placeholder="Enter password"
                  error={formErrors?.password}
                />
              </div>

              <div className={Styles.step2}>
                <Input
                  label="phone"
                  name="phone"
                  type="phone"
                  value={formValues?.phone}
                  onInput={handleInput}
                  placeholder="Enter phone"
                  error={formErrors?.phone}
                />

                <Input
                  label="email"
                  name="email"
                  type="email"
                  value={formValues?.email}
                  onInput={handleInput}
                  placeholder="Enter email"
                  error={formErrors?.email}
                />

                <Input
                  label="city"
                  name="city"
                  type="text"
                  value={formValues?.city}
                  onInput={handleInput}
                  placeholder="Enter city"
                  error={formErrors?.city}
                />

                <Input
                  label="street"
                  name="street"
                  type="text"
                  value={formValues?.street}
                  onInput={handleInput}
                  placeholder="Enter street"
                  error={formErrors?.street}
                />

                <Input
                  label="building"
                  name="building"
                  type="text"
                  value={formValues?.building}
                  onInput={handleInput}
                  placeholder="Enter home"
                  error={formErrors?.building}
                />

                <Input
                  label="housing"
                  name="housing"
                  type="text"
                  value={formValues?.housing}
                  onInput={handleInput}
                  placeholder="Enter номер дома"
                  error={formErrors?.housing}
                />

                <Input
                  label="door"
                  name="door"
                  type="text"
                  value={formValues?.door}
                  onInput={handleInput}
                  placeholder="Enter номер подъезда"
                  error={formErrors?.door}
                />

                <Input
                  label="room"
                  name="room"
                  type="text"
                  value={formValues?.room}
                  onInput={handleInput}
                  placeholder="Enter номер квартиры"
                  error={formErrors?.room}
                />
              </div>
            </div>
            {!!personalData && <button type="submit">Submit</button>}
          </form>

          {!personalData ? (
            <button type="button" onClick={() => nextStep()}>
              Далее
            </button>
          ) : null}
        </Modal>
      )}
    </>
  );
};

export default Header;
