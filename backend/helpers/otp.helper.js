import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

const otpMessage = "Your_OTP_is";

export const createMailBody = (name,code)=>{
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
    </head>
    <body>
      <p>Hi ${name || ''},</p>
      <span>
      We are delighted to welcome you to DevGyan Pustakalay Centre.
      Please use the following code to set up your account and get started.
      </span>
      <br>
      <h2>${code}</h2>
      <br>
    </body>
  </html>
`;
}

export const sendOTP = async (to,html) => {
  try {
    
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service:'gmail',
      secure:true,
      auth:{
        user:email,
        pass:password
      }
    })

    const message = {
      from: `"DevGyan Pustakalay Centre" <${email}>`,
      to,
      subject:"OTP for Account Setup",
      html
    }

    const info = await transporter.sendMail(message);

    return {
      success: true,
      message: "Successful",
    };
  } catch (err) {
    console.log(err);
    throw new Error("Error in sending OTP");
  }
};

export const generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);
  return otp;
};

export const createMailBody_Welcome = (name,email, passsword, role)=>{
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
    </head>
    <body>
      <p>Hi ${name || ''},</p>
      <span>
        We are delighted to welcome you to DevGyan Pustakalay Centre.
        Please use the following credentials to login to DevGyan Pustakalay Centre.
        Change the password as soon as possible.
      </span>
      <br>
      <h3>Email : ${email}</h3>
      <h3>Password : ${passsword}</h3>
      <br>
    </body>
  </html>
`;
}

export const sendMail = async (to,html,subject) => {
  try {
    
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service:'gmail',
      secure:true,
      auth:{
        user:email,
        pass:password
      }
    })

    const message = {
      from: `"DevGyan Pustakalay Centre" <${email}>`,
      to,
      subject,
      html
    }

    const info = await transporter.sendMail(message);

    return {
      success: true,
      message: "Successful",
    };
  } catch (err) {
    console.log(err);
    throw new Error("Error in sending Mail");
  }
};