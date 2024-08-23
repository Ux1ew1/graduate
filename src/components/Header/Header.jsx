import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import Input from "../Input/Input";
import Cart from "../Cart/Cart";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Cards", path: "/cards" },
  // { name: "Cart", path: "/cart" },
  { name: "Admin", path: "/admin" },
];

const Header = () => {
  const [showCart, setShowCart] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const { user, onRegister, onLogin, onLogout } = useAuth();

  const { formValues, formErrors, handleInput, resetForm } = useForm({
    login: "",
    password: "",
  });

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
    setShowCart(!showCart);
    console.log(!!showCart);
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

  const closeLoginModal = () => {
    setShowLoginModal(false);
    resetForm();
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
    resetForm();
  };

  return (
    <>
      <div className="w-[90rem] mx-auto px-4 py-6 mb-9 border-b flex gap-12 relative items-center">
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
        <button onClick={() => showCartFunction()}>Cart</button>
        {showCart ? <Cart /> : null}
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
            <button
              className="px-2 py-2 border-2 border-blue-400"
              onClick={onLogout}
            >
              Logout
            </button>
          )}
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
          <form onSubmit={handleRegistrationForm}>
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
    </>
  );
};

export default Header;
