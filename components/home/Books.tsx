import Image from 'next/image'
import React from 'react'

const books = [
    {
        name: "Mastery",
        image: "/mastery.jpg",
        author: "Robert Greene"
    },
    {
        name: "Execution",
        image: "/execution.jpg",
        author: "Lawrence bossidy & Ram Charan"
    },
    {
        name: "Unlock It",
        image: "/unlockit.jpeg",
        author: "Dan Lok"
    },
    {
        name: "The Almanank of Raval Ravikant",
        image: "/naval.webp",
        author: "Eric Jorgenson"
    }
]

const Books = () => {
  return (
      <div className='container min-h-[90vh]'>
          <h1 className='text-center text-3xl font-extrabold mb-20'>Unlock great ideas from books <br /> <span className='border-b border-dotted border-rs-yellow'>With Rockstaddy style</span></h1>
          <div className="grid grid-cols-1 lg:grid-cols-4">
              {books.map((book, index) => (
                  <div className="">
                      <Image src={book.image} height={100} width={100} className='object-cover' alt={book.name} />
                  </div>
              ))}
          </div>
    </div>
  )
}

export default Books