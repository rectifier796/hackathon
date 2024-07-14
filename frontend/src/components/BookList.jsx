
import BookCard from './BookCard';

const BookList = ({books}) => {

    
  return (
    <div className='flex flex-col gap-4 overflow-auto'>
      {
        books?.map((book,key) => <BookCard key={key} book={book}/>)
      }
    </div>
  )
}

export default BookList
