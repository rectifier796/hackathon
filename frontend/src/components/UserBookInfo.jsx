
import { Input } from './ui/input'
import { Button } from './ui/button'
import BookList from './BookList'
import { useEffect, useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";

const UserBookInfo = ({books}) => {

    
    console.log(books)
    const [search,setSearch] = useState('');
    const [filteredResults,setFilteredResults] = useState(books)

        
    useEffect(() => {
        handleSearch()
    },[books])

    const handleSearch = () => {
        console.log(search)
        if(search.trim === "") return;

        console.log(books)

        const filteredBooks = books.filter((book) => {

            if(book?.title.toLowerCase().indexOf(search.toLowerCase()) != -1) return true;
            // if(book?.isbn.toLowerCase().indexOf(search.toLowerCase()) != -1) return true;
            return false;
        })

        console.log(filteredBooks)

        if(filteredBooks.length == 0) setFilteredResults(books)
        setFilteredResults(filteredBooks)
    }

    const clearSearch = () => {
        setSearch("");
        setFilteredResults(books)
    }
  return (
    <div className=' flex-grow flex flex-col p-5'>
      
      <div className="text-2xl font-bold">Search Books</div>
      <div className="border-2 border-black mb-5" />

      <div className='flex gap-2 mb-10'>
        <Input placeholder="Odoo Development"
            onChange = {(e) => setSearch(e.target.value)}
            className="text-sm outline-none border-none focus-visible:ring-0 
                focus-visible:ring-offset-0 bg-gray-100 rounded-none"
                value={search}
        />
        <span className=' flex justify-center items-center cursor-pointer'
        onClick={clearSearch}
        ><MdOutlineCancel/></span>
        <Button onClick={handleSearch}>
            Search
        </Button>
      </div>

      <div className="text-2xl font-bold">My Books</div>
      <div className="border-2 border-black mb-5" />

        <BookList books={filteredResults} />
    </div>
  )
}

export default UserBookInfo
