import Image from 'next/image'
import React from 'react'

interface Props{
  count: number;
  label: string;
  isFirst: boolean;
}
const CountCard = ({count, label, isFirst}:Props) => {
  return (
    <div className={`flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap ${isFirst?"px-0": 'sm:px-3 border-l px-2'}`}>
        <p className='text-dark400_light700 text-opacity-80 text-sm sm:text-base'>{label}</p>
        <p>{count}</p>
    </div>
  )
}

export default CountCard