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

const Registration = () => {


  const [error,setError] = useState('');
  const {userFormDetail,setUserFormDetail} = useAuth();
  const [formDetails, setFormDetails] = useState(userFormDetail || {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    console.log(formDetails);


    setUserFormDetail(formDetails)

    const field = new FormData();
    
    field.append('name',formDetails.name);
    field.append('email',formDetails.email);
    field.append('password',formDetails.password);
    field.append('phone',formDetails.phone);
    field.append('address',formDetails.address);
    field.append('pincode',formDetails.pincode);
    console.log(field)


    const response = await fetch('http://localhost:5001/api/auth/register',{
      method:"POST",
      credentials:"include",
      body:field,
    })

    console.log(response)

    if(response.ok) navigate('/verification')
  };

  const handleFormChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen flex w-screen overflow-hidden">
      <WelcomeContainer type="registration"/>
      <Card className="flex-grow text-[#36C2CE] m-0 border-none rounded-none transition-all duration-200 ease-in-out">
        <CardHeader className="flex flex-col items-center w-full">
          <CardTitle className="text-2xl">Swachh</CardTitle>
          {error.length ? (
            <CardDescription className="text-xs text-red-700">
              {error}
            </CardDescription>
          ) : (
            <CardDescription className="text-xs">
              Register to create an account
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2 pb-2 items-center text-[#36C2CE] text-bold text-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">

              <Input
                id="name"
                placeholder="Enter name"
                className="text-sm outline-none w-[400px] h-[50px] border-none focus-visible:ring-0 
                focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                name="name"
                value={formDetails.name}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="email"
                placeholder="Enter email"
                className="text-sm outline-none w-[400px] h-[50px] border-none focus-visible:ring-0
                 focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                name="email"
                value={formDetails.email}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                className=" text-sm outline-none w-[400px] h-[50px] border-none focus-visible:ring-0 
                focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                name="password"
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="phone"
                placeholder="Enter phone number"
                className="text-sm outline-none w-[400px] h-[50px] border-none focus-visible:ring-0 
                focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                name="phone"
                value={formDetails.phone}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="address"
                placeholder="Enter address"
                className=" text-sm outline-none w-[400px] h-[50px] border-none focus-visible:ring-0 
                focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                onChange={(e) => handleFormChange(e)}
                value={formDetails.address}
                name="address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                id="pincode"
                placeholder="Enter pincode"
                className="text-sm outline-none w-[400px] h-[50px] border-none focus-visible:ring-0 
                focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                onChange={(e) => handleFormChange(e)}
                value={formDetails.pincode}
                name="pincode"
              />
            </div>
            <div className="flex gap-2">
              <Button className="bg-[#36C2CE] w-[200px] hover:bg-slate-800 mt-10 rounded-xl" type="submit"
              onClick={handleSubmit}
              >
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
