import React, { useRef, useState } from 'react'

const useCounter = () => {
    let [count,setCount] = useState(0);
    let oldSqure = useRef(0);
    function handleCount(type) {
        if(type === '+') {
           setCount( ++count)
        }
        if(type === '-') {
           setCount( --count)
        }

    }

    function  countSquare() {
        if(count%5===0) {
           oldSqure.current = count * count;
            return count * count;
            
        }else{
            return oldSqure.current
        }
    }
  return {
    count,
    setCount,
    handleCount,
    countSquare
  }
}

export default useCounter