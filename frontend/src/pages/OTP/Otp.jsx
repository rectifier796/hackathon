import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const {userFormDetail,setUserFormDetail} = useAuth();
  const handleOtp = (e) => {
    setOtp(e);
    if(e.length == 6) handleSubmit();
  };

  const handleSubmit = async() => {
    
    const field = new FormData();

    field.append('email',userFormDetail.email);
    field.append('otp',otp);

    const response = await fetch('http://localhost:5001/api/auth/validate',{
      method:"POST",
      credentials:"include",
      body:field
    })

    console.log(response)
    if(response.ok){ 
      navigate('/user-dashboard')
      setUserFormDetail({});
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">

      <div className="text-[#36C2CE]">
        Enter Otp sent to your registered email.
      </div>
      <InputOTP maxLength={6} onChange={handleOtp}>
        <InputOTPGroup>
          <InputOTPSlot index={0} className="h-[50px] bg-blue-400"/>
          <InputOTPSlot index={1} className="h-[50px] bg-blue-400"/>
          <InputOTPSlot index={2} className="h-[50px] bg-blue-400"/>
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} className="h-[50px] bg-blue-400"/>
          <InputOTPSlot index={4} className="h-[50px] bg-blue-400"/>
          <InputOTPSlot index={5} className="h-[50px] bg-blue-400"/>
        </InputOTPGroup>
      </InputOTP>

      <div onClick={()=>navigate(-1)} className="cursor-pointer text-blue-400">
        Go Back to previous page
      </div>
    </div>
  );
};

export default Otp;
