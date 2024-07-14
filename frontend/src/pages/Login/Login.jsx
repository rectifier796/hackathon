import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import WelcomeContainer from "@/components/WelcomeContainer";
import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");

  const { userFormDetail, setUserFormDetail } = useAuth();
  const [formDetails, setFormDetails] = useState(
    userFormDetail || {
      email: "",
      password: "",
    }
  );
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const field = new FormData();
    field.append("email", formDetails.email);
    field.append("password", formDetails.password);
    console.log(formDetails);
    // logging user
    // use setError for any error
    // setError('Not connected to server')
    // navigate("/user-dashboard");

    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      credentials: "include",
      body: field,
    });

    const data = await response.json()

    console.log(data)

    if (data.success) {
      if (response.status == "201") navigate("/verification");
      else {
        console.log('logged in')
        navigate("/user-dashboard");
        setUserFormDetail({});
      }
    }
  };
  const handleFormChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen flex w-screen overflow-hidden">
      <Card className="flex-grow text-[#36C2CE] m-0 border-none rounded-none transition-all duration-200 ease-in-out">
        <CardHeader className="flex flex-col items-center w-full">
          <CardTitle className="text-2xl">Swachh</CardTitle>
          {error.length ? (
            <CardDescription className="text-red-700">{error}</CardDescription>
          ) : (
            <CardDescription>Login to access dashboards</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-2 pb-2 items-center text-[#36C2CE] text-bold text-lg"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-3">
              <Input
                id="email"
                placeholder="Enter email"
                name="email"
                className="text-sm outline-none w-[400px] h-[50px] border-none focus-visible:ring-0 
                focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                value={formDetails.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                className="text-sm outline-none w-[400px] h-[50px] border-none focus-visible:ring-0 
                focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                name="password"
                onChange={handleFormChange}
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-[#36C2CE] w-[200px] hover:bg-slate-800 mt-10 rounded-xl"
                type="button"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <WelcomeContainer type="login" />
    </div>
  );
};

export default Login;
