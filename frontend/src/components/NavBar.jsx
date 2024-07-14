import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { navBarConstants } from "@/constants/NavbarConstants";

const NavBar = () => {

  const location = useLocation()
  const pathname = location.pathname.split('/').pop();
  console.log(pathname)

  return (
    <div
      className="h-screen bg-slate-900 text-white w-[300px]
    flex flex-col items-center p-5 justify-between
    "
    >
      <div className="text-3xl font-bold mb-32">Swachh</div>
      <div className="text-xl font-semibold flex flex-col gap-2 w-full flex-grow">
        {navBarConstants.user.map((ele, index) => (
          <Link
            key={index}
            className={`hover:bg-slate-700 w-full h-[50px] text-center flex justify-center
         items-center rounded-lg cursor-pointer ${pathname == ele.label ? 'bg-slate-700' : ''} `}
         to={ele.link}
          >
            {ele.name}
          </Link>
        ))}
      </div>

      <div className="text-xl flex flex-col">
        <div className="">Username</div>
        <Button className="bg-slate-700 hover:bg-slate-800">Logout</Button>
      </div>
    </div>
  );
};

export default NavBar;
