import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hotspot = () => {
  const [images, setImages] = useState();
  const [location, setLocation] = useState({
    longitude: "",
    latitude: "",
  });
  const [formData, setFormData] = useState({
    phone: "",
    description: "",
    wasteType: "",
    address: "",
    regionId: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      phone: "",
      description: "",
      wasteType: "",
      address: "",
      regionId: "",
    });
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="text-3xl font-bold text-white mb-3 bg-indigo-600 p-3 rounded-md">
        Add Hotspot
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xl space-y-6">
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {images?.map((image, ind) => (
                <CarouselItem key={ind}>
                  <img src={image} alt="item" className="object-cover w-full h-48 rounded-md" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <label
            htmlFor="images"
            className="block bg-slate-700 text-white rounded-lg p-3 mt-3 cursor-pointer text-center"
          >
            Upload Images
          </label>
          <Input
            type="file"
            id="images"
            className="hidden"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </div>

        <div className="w-full space-y-4">
          <div>
            <label htmlFor="phone" className="text-lg font-medium text-gray-800 block">
              Phone
            </label>
            <Input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="text-lg font-medium text-gray-800 block">
              Description
            </label>
            <Input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="wasteType" className="text-lg font-medium text-gray-800 block">
              Waste Type
            </label>
            <select
              id="wasteType"
              name="wasteType"
              value={formData.wasteType}
              onChange={handleInputChange}
              className="border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
              required
            >
              <option value="">Select Waste Type</option>
              <option value="Non-hazardous">Non-hazardous</option>
              <option value="Bulky">Bulky</option>
              <option value="Hazardous">Hazardous</option>
            </select>
          </div>

          <div>
            <label htmlFor="address" className="text-lg font-medium text-gray-800 block">
              Address
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="regionId" className="text-lg font-medium text-gray-800 block">
              Region ID
            </label>
            <Input
              type="text"
              id="regionId"
              name="regionId"
              value={formData.regionId}
              onChange={handleInputChange}
              className="border-gray-300 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Hotspot;
