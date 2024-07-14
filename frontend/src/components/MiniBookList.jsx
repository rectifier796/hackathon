import React from 'react'
import MiniCard from './MiniCard'

const MiniBookList = ({
    title,books
}) => {

    if(!books.length) return;
  return (
    <div className='flex flex-col'>
      <div className='text-2xl mb-5'>{title}</div>
     
     <div className='flex flex-col gap-4 w-full'>
        {
            books?.map((book,key) => <MiniCard key={key} book={book}/>)
        }
     </div>
    </div>
  )
}

export default MiniBookList
