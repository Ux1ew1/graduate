import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <div className="w-[90rem] mx-auto flex flex-wrap gap-12">
        <main className="w-full flex flex-wrap gap-12">
          <Outlet />
        </main>
      </div>
      <div className="flex text-center justify-center">
        <Footer />
      </div>
    </div>
  );
};
export default MainLayout;
