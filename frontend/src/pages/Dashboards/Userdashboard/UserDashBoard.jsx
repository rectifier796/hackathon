import Header from "@/components/Header"
import UserBookInfo from "@/components/UserBookInfo"
import UserProfile from "@/components/UserProfile"
import { faker } from "@faker-js/faker"
import { useEffect, useState } from "react"


const UserDashBoard = () => {

    const [books,setBooks] = useState([])

    useEffect(() => {

      // const booksInfo = [...Array(5)].map(() => ({
      //   id:faker.string.uuid(),
      //   name:faker.commerce.productName(),
      //   image:faker.image.url(),
      //   isbn:faker.commerce.isbn(),
      //   about:faker.commerce.productDescription(),
      //   author:faker.person.fullName(),
      //   publisher:faker.company.name(),
      //   noOfremainingDays:(faker.number.int() % 7) + 1
      // }))

      const fetchBooks = async () => {

        const response = await fetch('http://localhost:5001/api/book/issue-details',{
          credentials:"include",
          method:"GET"
        });
        const data = await response.json();
        const bookIds = data.data.map(book => book.bookId)
        
        // const books = bookIds.map(async(id) => {

        //   const response = await fetch('http://localhost:5001/api/book/get-book-by-id',{
        //     credentials:"include",
        //     method:"GET",
        //   });

        //   const data = await response.json()

        //   return data.data
        // })
        console.log(bookIds)
        setBooks(bookIds)
      }

      fetchBooks();




      // setBooks(booksInfo)
    },[])

  return (
    <div className="h-screen w-full">
      
      <Header />

      <div className="flex w-full h-full">
      <UserBookInfo books={books}/>
      <UserProfile />
      </div>
    </div>
  )
}

export default UserDashBoard
