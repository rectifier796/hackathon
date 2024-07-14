import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdModeEditOutline } from "react-icons/md";
const UserProfile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fakeUser = {
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      phone: faker.phone.number(),
      email: "user@gmail.com",
      location: faker.location.city(),
      company: faker.company.name(),
      address: faker.location.streetAddress() + " " + faker.location.country(),
    };

    setUser(fakeUser);
  }, []);

  if (!user) return;
  return (
    <div className="flex flex-col w-1/4 p-5">
      <div className="text-2xl font-bold">User Profile</div>

      <div className="border-2 border-black mb-5" />

      <div className="flex flex-col">
        <div className="flex gap-2 mb-5">
          <img
            src={user.image}
            alt=""
            className="h-[50px] w-[50px] rounded-md"
          />
          <div className="flex flex-col justify-center">
            <div className="font-bold">{user.name}</div>
            <div className="text-gray-400 font-semibold">{user.company}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <IoLocationSharp className="h-[15px] w-[25px]" />
            {user.address}
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="h-[15px] w-[25px]" /> {user.phone}
          </div>
          <div className="flex items-center">
            <MdEmail className="h-[15px] w-[25px]" />
            {user.email}
          </div>
        </div>

        <div className="flex items-center mt-3 text-gray-600 mb-3 cursor-pointer">
          <MdModeEditOutline className="h-[15px] w-[25px]" /> Edit information
        </div>
        <div>
          <div className="border border-gray-200 mb-5" />
          <div className="font-bold text-xl">Your contact</div>
          <div className="border border-gray-200 mb-5" />
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-xl">{user.name}</div>
          <div>
            <div className="flex items-center">
              <FaPhoneAlt className="h-[15px] w-[25px]" /> {user.phone}
            </div>
            <div className="flex items-center">
              <MdEmail className="h-[15px] w-[25px]" />
              {user.email}
            </div>
            <div className="flex items-center">
              <IoLocationSharp className="h-[15px] w-[25px]" />
              {user.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
