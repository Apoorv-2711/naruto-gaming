import Image from 'next/image'
import React from 'react'

type Props = {}

function Genres({}: Props) {
  return (
    <div className="xl:w-1/4 w-full px-4 bg-red-200 h-fit">
    <h3 className="text-2xl  font-bold mt-12 mb-4 ml-4 text-red-500">
      Genres
    </h3>
    <div className="flex flex-wrap justify-start  px-auto p-6 pb-8">
      <Image
        alt="New Release 1"
        className=" rounded-md mr-4 mb-4"
        height="300"
        src={
          "https://img.flawlessfiles.com/_r/300x400/100/44/69/44692f2730007281f994525649fc9bd6/44692f2730007281f994525649fc9bd6.jpg"
        }
        style={{
          aspectRatio: "200/300",
          objectFit: "cover",
        }}
        width="200"
      />
    </div>
  </div>
  )
}

export default Genres