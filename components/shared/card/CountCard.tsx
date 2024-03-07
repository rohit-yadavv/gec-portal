 
import { CountCardProps } from '@/types/components/card'
import React from 'react'


const CountCard = ({count, label, isFirst}:CountCardProps) => {
  return (
    <div className={`gap-1 ${isFirst?"": 'sm:border-l sm:px-3'}`}> 
        <p className='text-sm text-opacity-80  sm:text-base'>{label} - {count}</p>
        {/* <p>{count}</p> */}
    </div>
  )
}

export default CountCard