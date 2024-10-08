import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="w-[90rem] mx-auto flex flex-wrap gap-12">
        <main className="w-full flex flex-wrap gap-12">
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default MainLayout;
