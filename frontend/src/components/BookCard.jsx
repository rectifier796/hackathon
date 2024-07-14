import React from 'react'

const BookCard = ({book}) => {
  return (
    <div className='flex p-2 gap-4 w-4/5'>
      <div>
        <img src={book.smallThumbnail} alt="" className='h-[100px] w-[150px]' />
      </div>
      <div className='flex flex-col flex-grow w-4/5'>
        <div>{book.title}</div>
        <div>{book.descrition}</div>
        <div className='px-2 bg-orange-400 border-2 border-orange-600 rounded-lg
        text-white w-[150px] flex justify-center items-center
        '>{3} Days Remains</div>
      </div>
    </div>
  )
}

export default BookCard
