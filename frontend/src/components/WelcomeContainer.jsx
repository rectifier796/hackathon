import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const WelcomeContainer = ({ type }) => {
  const navigate = useNavigate();
  const toGoPage = () => {
    if (type === "login") {
      navigate("/registration");
    } else navigate("/login");
  };
  return (
    <div className="flex justify-center items-center bg-[#36C2CE] w-3/7">
      <div className=" flex flex-col items-center p-2 gap-2 w-full">
        <div className="text-white font-bold text-2xl">
          {type === "login" ? "Welcome Back!" : "Hello There!"}
        </div>
        <div className="text-white text-center md:w-2/3">
          We welcome you here in our application. Please authenticate!
        </div>
        <Button
          onClick={toGoPage}
          className="rounded-lg p-2 uppercase bg-[#478CCF] border-white 
        border-2 w-[200px] hover:bg-[#0F67B1]
        "
        >
          {type === "login" ? "Register" : "login"}
        </Button>
      </div>
    </div>
  );
};

export default WelcomeContainer;
