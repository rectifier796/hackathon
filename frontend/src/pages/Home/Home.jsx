import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import {faker} from "@faker-js/faker";
import MiniBookList from "@/components/MiniBookList";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const [results, setResults] = useState([]);

  const [newArriavls,setNewArrivals] = useState([]);
  const [trending,setTrending] = useState([])


  useEffect(() => {

    const products_new = [...Array(5)].map(() => ({
      id:faker.string.uuid(),
      name:faker.commerce.productName(),
      image:faker.image.url(),
      isbn:faker.commerce.isbn(),
      about:faker.commerce.productDescription(),
      author:faker.person.fullName(),
      publisher:faker.company.name()
    }))

    setNewArrivals(products_new)
    const products_trend = [...Array(5)].map(() => ({
      id:faker.string.uuid(),
      name:faker.commerce.productName(),
      image:faker.image.url(),
      isbn:faker.commerce.isbn(),
      about:faker.commerce.productDescription(),
      author:faker.person.fullName(),
      publisher:faker.company.name()
    }))
    setTrending(products_trend)
  },[])

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;

    setSearches((prevSearches) => [searchQuery, ...prevSearches]);
    setResults([`Result for "${searchQuery}"`]);
    setSearchQuery("");
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className="flex flex-col items-center h-screen">
      <Header />
      <div className="text-3xl font-bold text-slate-900 mb-5">
        Search Book available in Library
      </div>
      <div className="flex items-center w-full max-w-lg space-x-3 mb-5">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 flex-grow shadow-sm sm:text-sm border rounded-md"
          placeholder="Enter Pincode"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 w-4/5 mb-5">
        <MiniBookList title="New Arrivals" books={newArriavls}/>
        <MiniBookList title="Trending" books={trending}/>
      </div>
      
    </div>
  );
};

export default Home;
