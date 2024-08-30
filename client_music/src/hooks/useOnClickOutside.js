/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
const useOnClickOutside = (ref, handl) => {
  useEffect(() => {
    let handlcheck = (event) => {
      if (ref === null) return      
      handl(event.target,true)
    }
    document.addEventListener('mousedown', handlcheck)
    return () => {
      document.removeEventListener('mousedown', handlcheck)
    }
  }, [ref, handl])
}
export default useOnClickOutside