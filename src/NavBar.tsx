import logo from "./Gambar/LogoIqbal.png";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      <nav className="w-full h-full relative py-3 bg-[#ffffff] border-2">
        {/* Flex Container */}
        <div className="flex items-center justify-between">
          <div className="w-full flex">
            <div>
              <Link to="/">
                <div id="logo">
                  <img className="w-[311px]" src={logo} alt="" />
                </div>
              </Link>
            </div>
            <div className="flex gap-2 ml-auto pt-2 pr-5">
              <div>
                <Link to="/">
                  <div className={`${isActive("/") ? "border-red-500 bg-[#B80F0A] text-white" : "border-transparent"} border-2 hover:bg-[#B80F0A] hover:text-white px-5 py-2 rounded-[10px]`}>
                    <p className="font-[500]">Beranda</p>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/formstunting">
                  <div className={`${isActive("/formstunting") ? "border-red-500 bg-[#B80F0A] text-white" : "border-transparent"} border-2 hover:bg-[#B80F0A] hover:text-white px-5 py-2 rounded-[10px]`}>
                    <p className="font-[500]">Stunting</p>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/formdiabetes">
                  <div className={`${isActive("/formdiabetes") ? "border-red-500 bg-[#B80F0A] text-white" : "border-transparent"} border-2 hover:bg-[#B80F0A] hover:text-white px-5 py-2 rounded-[10px]`}>
                    <p className="font-[500]">Diabetes</p>
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/formbmi">
                  <div className={`${isActive("/formbmi") ? "border-red-500 bg-[#B80F0A] text-white" : "border-transparent"} border-2 hover:bg-[#B80F0A] hover:text-white px-5 py-2 rounded-[10px]`}>
                    <p className="font-[500]">Hitung BMI</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
