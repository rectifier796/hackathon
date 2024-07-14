import React from 'react'

const MiniCard = ({book}) => {
  return (
    <div className='flex gap-4'>
      <div className='h-[150px] w-[150px]'>
        <img src={book.image} className='h-[150px] w-[150px]'/>
      </div>
      <div className='flex flex-col w-full justify-between'>
        <div className='font-bold text-blue-600 text-xl'>{book.name}</div>
        <div className='flex gap-4'>
            <div className='text-blue-400'>{book.author}</div>
            <div>{book.publisher}</div>
            <div>{2002}</div>
        </div>
      <div>
        {book.about?.substring(0,100)}
      </div>
      </div>
    </div>
  )
}

export default MiniCard
