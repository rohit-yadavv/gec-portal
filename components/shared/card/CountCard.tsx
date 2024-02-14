import Image from 'next/image'
import React from 'react'

interface Props{
  count: number;
  label: string;
  isFirst: boolean;
}
const CountCard = ({count, label, isFirst}:Props) => {
  return (
    <div className={`gap-1 ${isFirst?"": 'sm:px-3 sm:border-l'}`}> 
        <p className='text-dark400_light700 text-opacity-80 text-sm sm:text-base'>{label} - {count}</p>
        {/* <p>{count}</p> */}
    </div>
  )
}

export default CountCard